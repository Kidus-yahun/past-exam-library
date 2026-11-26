import os
import json
import io
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
import pypdf

db_path = 'data/db.json'
with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

base_cdn = 'https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main'
base_raw = 'https://raw.githubusercontent.com/soliyana-dev/past-exam-library/main'

def get_candidates(file_url):
    rel = file_url.lstrip('/')
    variants = [rel]
    if 'Citizen ship' in rel:
        variants.append(rel.replace('Citizen ship', 'Citizenship'))
    elif 'Citizenship' in rel:
        variants.append(rel.replace('Citizenship', 'Citizen ship'))
    if 'HP.pdf' in rel:
        variants.append(rel.replace('HP.pdf', 'Hp.pdf'))
    elif 'Hp.pdf' in rel:
        variants.append(rel.replace('Hp.pdf', 'HP.pdf'))
    if 'Pretest' in rel:
        variants.append(rel.replace('Pretest', 'pretest'))
    elif 'pretest' in rel:
        variants.append(rel.replace('pretest', 'Pretest'))
    
    urls = []
    for v in variants:
        encoded = urllib.parse.quote(v)
        urls.append(f"{base_cdn}/{encoded}")
        urls.append(f"{base_raw}/{encoded}")
    return urls

def fetch_single_exam(exam):
    eid = exam.get('id')
    file_url = exam.get('fileUrl', '')
    if not file_url.startswith('/exams/'):
        return None
        
    local_path = file_url.lstrip('/')
    
    # Check if already authentic scanned paper
    is_authentic = False
    if os.path.exists(local_path):
        try:
            r = pypdf.PdfReader(local_path)
            imgs = sum(len(p.images) for p in r.pages)
            if imgs > 0:
                is_authentic = True
        except:
            is_authentic = False
            
    # Protect exam_22 (which has the fresh user photo + answer sheet)
    if is_authentic and eid == 'exam_22':
        return {'id': eid, 'status': 'already_authentic', 'size': os.path.getsize(local_path)}
        
    # If already authentic (e.g. Grade 9 scans rebuilt from D:\past ppr), keep it!
    if is_authentic:
        return {'id': eid, 'status': 'already_authentic', 'size': os.path.getsize(local_path)}
        
    # Need to download authentic scan
    candidates = get_candidates(file_url)
    for u in candidates:
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status == 200:
                    data = resp.read()
                    reader = pypdf.PdfReader(io.BytesIO(data))
                    imgs = sum(len(p.images) for p in reader.pages)
                    if imgs > 0:
                        os.makedirs(os.path.dirname(local_path), exist_ok=True)
                        with open(local_path, 'wb') as fp:
                            fp.write(data)
                        return {
                            'id': eid,
                            'status': 'restored',
                            'size': len(data),
                            'pages': len(reader.pages),
                            'images': imgs,
                            'title': exam.get('title')
                        }
        except:
            continue
            
    return {'id': eid, 'status': 'failed', 'fileUrl': file_url}

exams = db.get('exams', [])
print(f"Starting parallel restoration for {len(exams)} exams...", flush=True)

results = {}
with ThreadPoolExecutor(max_workers=12) as executor:
    futures = {executor.submit(fetch_single_exam, e): e for e in exams}
    for future in as_completed(futures):
        res = future.result()
        if res:
            eid = res['id']
            results[eid] = res
            status = res['status']
            if status == 'restored':
                print(f"✔ Restored [{eid}] {res.get('title')}: {res['size']/1024:.1f} KB ({res['pages']} pgs, {res['images']} imgs)", flush=True)
            elif status == 'failed':
                print(f"✖ Failed [{eid}] {res.get('fileUrl')}", flush=True)

# Update database
restored_count = 0
already_count = 0
failed_count = 0

for e in exams:
    eid = e.get('id')
    res = results.get(eid)
    if res:
        if res['status'] == 'restored':
            restored_count += 1
            e['fileSize'] = res['size']
            e['pages'] = res['pages']
        elif res['status'] == 'already_authentic':
            already_count += 1
            e['fileSize'] = res['size']
        elif res['status'] == 'failed':
            failed_count += 1

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print("\n==========================================", flush=True)
print(f"Fast Parallel Restoration Complete!", flush=True)
print(f"Successfully Restored: {restored_count}", flush=True)
print(f"Already Authentic:     {already_count}", flush=True)
print(f"Failed / Missing:      {failed_count}", flush=True)
print("==========================================", flush=True)

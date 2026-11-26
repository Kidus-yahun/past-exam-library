import os
import json
import urllib.request
import urllib.parse
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

def download_verified_scan(urls):
    for u in urls:
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=12) as resp:
                if resp.status == 200:
                    data = resp.read()
                    # verify with pypdf
                    import io
                    reader = pypdf.PdfReader(io.BytesIO(data))
                    imgs = sum(len(p.images) for p in reader.pages)
                    if imgs > 0:
                        return data, len(reader.pages), imgs
        except Exception as e:
            continue
    return None, 0, 0

# Scan all exams
exams = db.get('exams', [])
restored_count = 0
already_authentic = 0
failed_count = 0

print(f"Starting restoration audit for {len(exams)} total exams...")

for e in exams:
    eid = e.get('id')
    file_url = e.get('fileUrl', '')
    if not file_url.startswith('/exams/'):
        continue
    
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
            
    # Don't touch Grade 10 Math Mid 1 (which we built from user's photo) or existing authentic scans
    if is_authentic and eid == 'exam_22':
        already_authentic += 1
        continue
    
    # If not authentic, or missing, try downloading original scan
    if not is_authentic or not os.path.exists(local_path):
        candidates = get_candidates(file_url)
        data, num_pages, num_imgs = download_verified_scan(candidates)
        if data:
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, 'wb') as fp:
                fp.write(data)
            sz = len(data)
            e['fileSize'] = sz
            e['pages'] = num_pages
            restored_count += 1
            print(f"✔ Restored [{eid}] {e.get('title')}: {sz/1024:.1f} KB, {num_pages} pages, {num_imgs} scanned images")
        else:
            if not is_authentic:
                failed_count += 1
                print(f"✖ Could not find authentic scan for [{eid}] {file_url}")
    else:
        already_authentic += 1

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print(f"\n==========================================")
print(f"Restoration Complete!")
print(f"Successfully Restored: {restored_count}")
print(f"Already Authentic:     {already_authentic}")
print(f"No Remote Scan:        {failed_count}")
print(f"==========================================")

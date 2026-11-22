import os
import json
import numpy as np
from PIL import Image, ImageEnhance

# 1. Rotated files list (need 90 deg clockwise rotation)
rotated_files = {
    '5771561943129854531_119.jpg',
    '5771561943129854532_119.jpg',
    '5771561943129854533_119.jpg',
    '5771561943129854534_119.jpg',
    '5771561943129854535_119.jpg',
    '5771561943129854536_119.jpg',
    '5771561943129854537_119.jpg'
}

def find_paper_box(im):
    w, h = im.size
    gray = im.convert('L')
    arr = np.array(gray)
    
    # Core central brightness
    core = arr[int(h*0.35):int(h*0.65), int(w*0.25):int(w*0.75)]
    paper_median = float(np.median(core))
    thresh = max(130.0, paper_median - 35.0)
    
    # Vertical profile in central band
    center_band = arr[:, int(w*0.25):int(w*0.75)]
    v_means = np.mean(center_band, axis=1)
    v_smooth = np.convolve(v_means, np.ones(50)/50, mode='same')
    
    # Top
    top_candidates = np.where(v_smooth[:int(h*0.5)] > thresh)[0]
    top = top_candidates[0] if len(top_candidates) > 0 else int(h * 0.15)
        
    # Bottom
    bottom_candidates = np.where(v_smooth[int(h*0.5):] < thresh)[0]
    bottom = int(h*0.5) + bottom_candidates[0] if len(bottom_candidates) > 0 else int(h * 0.88)
        
    # Horizontal profile
    safe_top = min(top + 80, int(h*0.4))
    safe_bottom = max(bottom - 80, int(h*0.6))
    h_band = arr[safe_top:safe_bottom, :]
    h_means = np.mean(h_band, axis=0)
    h_smooth = np.convolve(h_means, np.ones(30)/30, mode='same')
    
    left_candidates = np.where(h_smooth[:int(w*0.3)] > thresh)[0]
    left = left_candidates[0] if len(left_candidates) > 0 else int(w * 0.05)
        
    right_candidates = np.where(h_smooth[int(w*0.7):] < thresh)[0]
    right = int(w*0.7) + right_candidates[0] if len(right_candidates) > 0 else int(w * 0.96)
        
    # Clamp inside image with neat margins
    top = max(0, int(top - 15))
    bottom = min(h, int(bottom + 20))
    left = max(0, int(left - 10))
    right = min(w, int(right + 10))
    
    return left, top, right, bottom

src_folder = r'D:\past ppr'
cache_dir = 'scanned_cropped_pages'
os.makedirs(cache_dir, exist_ok=True)

all_files = sorted(os.listdir(src_folder))
print(f"Total source images: {len(all_files)}")

# Crop and enhance each page
for fname in all_files:
    if not fname.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    out_path = os.path.join(cache_dir, fname)
    if os.path.exists(out_path):
        continue
    
    im = Image.open(os.path.join(src_folder, fname))
    if fname in rotated_files:
        im = im.rotate(270, expand=True)
        
    left, top, right, bottom = find_paper_box(im)
    cropped = im.crop((left, top, right, bottom))
    
    # Contrast and brightness enhancement
    enh = ImageEnhance.Contrast(cropped).enhance(1.22)
    enh = ImageEnhance.Brightness(enh).enhance(1.04)
    enh.save(out_path, quality=92, optimize=True)

print("Cropped pages ready.")

# Define strictly 2nd Mid, Final, and 2nd Semester exams
exams_config = [
    # =========================================================================
    # 1. SEMESTER 1 FINALS (All 10 Subjects)
    # =========================================================================
    {
        "title": "Grade 9 Economics Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "Economics",
        "year": "2024",
        "files": ["5771561943129854493_119.jpg", "5771561943129854494_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/Economics.pdf"
    },
    {
        "title": "Grade 9 Mathematics Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "Mathematics",
        "year": "2024",
        "files": ["5771561943129854500_119.jpg", "5771561943129854502_119.jpg", "5771561943129854538_119.jpg", "5771561943129854539_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/Mathematics.pdf"
    },
    {
        "title": "Grade 9 Information Technology Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "IT",
        "year": "2024",
        "files": ["5771561943129854503_119.jpg", "5771561943129854504_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/IT.pdf"
    },
    {
        "title": "Grade 9 Health & Physical Education Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "HP",
        "year": "2024",
        "files": ["5771561943129854505_119.jpg", "5771561943129854506_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/HP.pdf"
    },
    {
        "title": "Grade 9 Physics Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "Physics",
        "year": "2024",
        "files": ["5771561943129854550_119.jpg", "5771561943129854551_119.jpg", "5771561943129854552_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/Physics.pdf"
    },
    {
        "title": "Grade 9 Biology Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "Biology",
        "year": "2024",
        "files": ["5771561943129854553_119.jpg", "5771561943129854554_119.jpg", "5771561943129854555_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/Biology.pdf"
    },
    {
        "title": "Grade 9 Citizenship Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "Citizenship",
        "year": "2024",
        "files": ["5771561943129854556_119.jpg", "5771561943129854557_119.jpg", "5771561943129854558_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/Citizen ship.pdf"
    },
    {
        "title": "Grade 9 History Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "History",
        "year": "2024",
        "files": ["5771561943129854559_119.jpg", "5771561943129854560_119.jpg", "5771561943129854564_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/History.pdf"
    },
    {
        "title": "Grade 9 Chemistry Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "Chemistry",
        "year": "2024",
        "files": ["5771561943129854573_119.jpg", "5771561943129854591_119.jpg", "5771561943129854592_119.jpg", "5771561943129854593_119.jpg", "5771561943129854595_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/Chemistry.pdf"
    },
    {
        "title": "Grade 9 Geography Semester 1 Final Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Final",
        "subject": "Geography",
        "year": "2024",
        "files": ["5771561943129854609_119.jpg", "5771561943129854610_119.jpg", "5771561943129854611_119.jpg", "5771561943129854612_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Final/Geography.pdf"
    },

    # =========================================================================
    # 2. SEMESTER 1 2ND MID (Mid 2 / Test Two - All 10 Subjects)
    # =========================================================================
    {
        "title": "Grade 9 Economics Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "Economics",
        "year": "2024",
        "files": ["5771561943129854508_119.jpg", "5771561943129854510_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/Economics.pdf"
    },
    {
        "title": "Grade 9 Biology Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "Biology",
        "year": "2024",
        "files": ["5771561943129854513_119.jpg", "5771561943129854515_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/Biology.pdf"
    },
    {
        "title": "Grade 9 Chemistry Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "Chemistry",
        "year": "2024",
        "files": ["5771561943129854516_119.jpg", "5771561943129854517_119.jpg", "5771561943129854536_119.jpg", "5771561943129854537_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/Chemistry.pdf"
    },
    {
        "title": "Grade 9 Physics Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "Physics",
        "year": "2024",
        "files": ["5771561943129854518_119.jpg", "5771561943129854519_119.jpg", "5771561943129854533_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/Physics.pdf"
    },
    {
        "title": "Grade 9 Information Technology Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "IT",
        "year": "2024",
        "files": ["5771561943129854520_119.jpg", "5771561943129854521_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/IT.pdf"
    },
    {
        "title": "Grade 9 Citizenship Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "Citizenship",
        "year": "2024",
        "files": ["5771561943129854522_119.jpg", "5771561943129854523_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/Citizen ship.pdf"
    },
    {
        "title": "Grade 9 History Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "History",
        "year": "2024",
        "files": ["5771561943129854524_119.jpg", "5771561943129854526_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/History.pdf"
    },
    {
        "title": "Grade 9 Geography Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "Geography",
        "year": "2024",
        "files": ["5771561943129854528_119.jpg", "5771561943129854530_119.jpg", "5771561943129854531_119.jpg", "5771561943129854532_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/Geography.pdf"
    },
    {
        "title": "Grade 9 Mathematics Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "Mathematics",
        "year": "2024",
        "files": ["5771561943129854604_119.jpg", "5771561943129854606_119.jpg", "5771561943129854608_119.jpg", "5771561943129854534_119.jpg", "5771561943129854535_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/Mathematics.pdf"
    },
    {
        "title": "Grade 9 English Semester 1 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester1",
        "examType": "Mid2",
        "subject": "English",
        "year": "2024",
        "files": ["5771561943129854596_119.jpg", "5771561943129854599_119.jpg", "5771561943129854600_119.jpg", "5771561943129854602_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester1/Mid2/English.pdf"
    },

    # =========================================================================
    # 3. 2ND SEMESTER (Semester 2)
    # =========================================================================
    {
        "title": "Grade 9 English Semester 2 2nd Mid Examination",
        "grade": "Grade9",
        "semester": "Semester2",
        "examType": "Mid2",
        "subject": "English",
        "year": "2024",
        "files": ["5771561943129854566_119.jpg", "5771561943129854568_119.jpg", "5771561943129854569_119.jpg", "5771561943129854570_119.jpg", "5771561943129854571_119.jpg", "5771561943129854572_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester2/Mid2/English.pdf"
    },
    {
        "title": "Grade 9 Geography Semester 2 Examination",
        "grade": "Grade9",
        "semester": "Semester2",
        "examType": "Final",
        "subject": "Geography",
        "year": "2024",
        "files": ["5771561943129854540_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester2/Final/Geography.pdf"
    },
    {
        "title": "Grade 9 Biology Semester 2 Examination",
        "grade": "Grade9",
        "semester": "Semester2",
        "examType": "Final",
        "subject": "Biology",
        "year": "2024",
        "files": ["5771561943129854549_119.jpg"],
        "pdf_rel": "exams/Grade9/Semester2/Final/Biology.pdf"
    }
]

# Verify total files count
total_pages = sum(len(c["files"]) for c in exams_config)
print(f"Total files in configuration: {total_pages} (Expected 69)")

# Generate PDFs
for cfg in exams_config:
    pdf_path = cfg["pdf_rel"]
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    page_imgs = [Image.open(os.path.join(cache_dir, f)).convert('RGB') for f in cfg["files"]]
    page_imgs[0].save(pdf_path, save_all=True, append_images=page_imgs[1:], resolution=150.0, quality=88)
    file_size = os.path.getsize(pdf_path)
    cfg["fileSize"] = file_size
    print(f"Generated {pdf_path} ({len(page_imgs)} pages, {file_size / 1024:.1f} KB)")

# Clean up db.json: retain non-Grade 9 and standard Grade 9 Mid1, and add our 23 new scanned exams
with open('data/db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

# Keep all non-Grade 9 exams, and keep original Grade 9 Mid1 exams (exam_124 through exam_135)
retained_exams = []
for e in db.get('exams', []):
    if e.get('grade') != 'Grade9':
        retained_exams.append(e)
    elif e.get('grade') == 'Grade9' and e.get('semester') == 'Semester1' and e.get('examType') == 'Mid1':
        retained_exams.append(e)

max_id = 0
for e in retained_exams:
    eid = e.get('id', '')
    if eid.startswith('exam_'):
        try:
            num = int(eid.replace('exam_', ''))
            if num > max_id:
                max_id = num
        except:
            pass

print(f"Base max exam id: exam_{max_id}")

for cfg in exams_config:
    max_id += 1
    new_exam = {
        "id": f"exam_{max_id}",
        "title": cfg['title'],
        "grade": cfg['grade'],
        "semester": cfg['semester'],
        "examType": cfg['examType'],
        "subject": cfg['subject'],
        "year": cfg['year'],
        "fileUrl": f"/{cfg['pdf_rel'].replace(os.sep, '/')}",
        "fileName": os.path.basename(cfg['pdf_rel']),
        "fileSize": cfg['fileSize'],
        "uploadedBy": "academic-portal",
        "createdAt": "2026-11-22T19:45:00.000Z"
    }
    retained_exams.append(new_exam)

db['exams'] = retained_exams

with open('data/db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print(f"Database successfully updated. Total exams in db: {len(retained_exams)}")

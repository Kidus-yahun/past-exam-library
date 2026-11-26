import os
import json
import cv2
import numpy as np
from PIL import Image

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

def process_scanned_page(img_bgr, is_rotated=False):
    if is_rotated:
        img_bgr = cv2.rotate(img_bgr, cv2.ROTATE_90_CLOCKWISE)
        
    h, w = img_bgr.shape[:2]
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY) if len(img_bgr.shape) == 3 else img_bgr
    
    # 1. Page crop estimation
    core = gray[int(h*0.35):int(h*0.65), int(w*0.25):int(w*0.75)]
    paper_median = float(np.median(core))
    thresh = max(115.0, paper_median - 40.0)
    
    center_band = gray[:, int(w*0.25):int(w*0.75)]
    v_means = np.mean(center_band, axis=1)
    v_smooth = np.convolve(v_means, np.ones(50)/50, mode='same')
    top_cands = np.where(v_smooth[:int(h*0.5)] > thresh)[0]
    top = top_cands[0] if len(top_cands) > 0 else int(h * 0.08)
    bot_cands = np.where(v_smooth[int(h*0.5):] < thresh)[0]
    bottom = int(h*0.5) + bot_cands[0] if len(bot_cands) > 0 else int(h * 0.92)
    
    safe_top = min(top + 80, int(h*0.4))
    safe_bot = max(bottom - 80, int(h*0.6))
    h_band = gray[safe_top:safe_bot, :]
    h_means = np.mean(h_band, axis=0)
    h_smooth = np.convolve(h_means, np.ones(30)/30, mode='same')
    
    left_cands = np.where(h_smooth[:int(w*0.3)] > thresh)[0]
    left = left_cands[0] if len(left_cands) > 0 else int(w * 0.04)
    right_cands = np.where(h_smooth[int(w*0.7):] < thresh)[0]
    right = int(w*0.7) + right_cands[0] if len(right_cands) > 0 else int(w * 0.96)
    
    # Safe margins so no question text or numbers are ever cut off
    top = max(0, int(top - 15))
    bottom = min(h, int(bottom + 20))
    left = max(0, int(left - 10))
    right = min(w, int(right + 10))
    
    cropped = gray[top:bottom, left:right]
    ch, cw = cropped.shape
    
    # 2. Illumination background estimation
    k_dim = max(31, (cw // 28) | 1)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (k_dim, k_dim))
    bg = cv2.morphologyEx(cropped, cv2.MORPH_CLOSE, kernel)
    
    # Background division to eliminate all shadows and non-uniform lighting
    division = np.float32(cropped) / (np.float32(bg) + 1e-5) * 255.0
    division = np.clip(division, 0.0, 255.0)
    
    # 3. Dynamic contrast stretching (clean white background, deep dark text)
    p_dark = np.percentile(division, 1.8)
    p_bright = np.percentile(division, 95.0)
    black_pt = max(20.0, p_dark - 12.0)
    white_pt = min(252.0, max(215.0, p_bright - 4.0))
    
    scanned = np.clip((division - black_pt) * (255.0 / (white_pt - black_pt)), 0.0, 255.0).astype(np.uint8)
    
    # Clean outer boundary slivers
    scanned[0:5, :] = 255
    scanned[-5:, :] = 255
    scanned[:, 0:5] = 255
    scanned[:, -5:] = 255
    
    # 4. Crisp edge sharpening (Unsharp Mask)
    blur = cv2.GaussianBlur(scanned, (0, 0), 1.2)
    sharpened = cv2.addWeighted(scanned, 1.35, blur, -0.35, 0)
    final = np.clip(sharpened, 0, 255).astype(np.uint8)
    
    return final

def smart_crop_unnecessary_top(img):
    h, w = img.shape
    center = img[:, int(w*0.2):int(w*0.8)]
    row_means = np.mean(center, axis=1)
    dark_frac = np.mean(center < 200, axis=1)
    is_white = (row_means > 238) & (dark_frac < 0.015)
    
    # If top 50px is already clean white paper (> 85% white), no crop needed
    if np.mean(is_white[:50]) > 0.85:
        return img
        
    search_limit = int(h * 0.45)
    # Check if image starts with dark desk / cords / shadows
    starts_dark = np.min(row_means[:100]) < 180 or np.max(dark_frac[:100]) > 0.35
    if starts_dark:
        for y in range(40, search_limit):
            if np.all(is_white[y:y+35]):
                cut_y = y + 8
                cropped = img[cut_y:, :]
                cropped[0:5, :] = 255
                return cropped
                
    # Check for notebook / scrap paper followed by exam paper margin
    runs = []
    in_w = False
    start = 0
    for y in range(30, search_limit):
        if is_white[y]:
            if not in_w:
                in_w = True
                start = y
        else:
            if in_w:
                in_w = False
                if y - start >= 40:
                    runs.append((start, y, y - start))
    if in_w and search_limit - start >= 40:
        runs.append((start, search_limit, search_limit - start))
        
    for r in runs:
        start_y, end_y, length = r
        above = center[:start_y]
        has_above = np.mean(above < 200) > 0.020 or np.mean(above) < 235 or np.max(np.mean(above < 150, axis=1)) > 0.05
        below = center[end_y:min(h, end_y+100)]
        has_below = np.max(np.mean(below < 150, axis=1)) > 0.10
        if has_above and has_below:
            cut_y = start_y + 8
            cropped = img[cut_y:, :]
            cropped[0:5, :] = 255
            return cropped
            
    return img

src_folder = r'D:\past ppr'
cache_dir = 'scanned_cropped_pages'
os.makedirs(cache_dir, exist_ok=True)

all_files = sorted(os.listdir(src_folder))
print(f"Total source images: {len(all_files)}")

# Crop, shadow-remove, and enhance each page into clean scanned document
for fname in all_files:
    if not fname.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    out_path = os.path.join(cache_dir, fname)
    
    img_bgr = cv2.imread(os.path.join(src_folder, fname))
    if img_bgr is None:
        continue
    
    is_rot = fname in rotated_files
    scanned = process_scanned_page(img_bgr, is_rot)
    scanned = smart_crop_unnecessary_top(scanned)
    
    # Save as high-quality scanned page
    cv2.imwrite(out_path, scanned, [cv2.IMWRITE_JPEG_QUALITY, 93])

print("All cropped and enhanced clean scanned pages ready.\n")
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

# Generate clean scanned PDFs
for cfg in exams_config:
    pdf_path = cfg["pdf_rel"]
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    page_imgs = [Image.open(os.path.join(cache_dir, f)).convert('RGB') for f in cfg["files"]]
    page_imgs[0].save(pdf_path, save_all=True, append_images=page_imgs[1:], resolution=150.0, quality=90)
    file_size = os.path.getsize(pdf_path)
    cfg["fileSize"] = file_size
    print(f"✔ Generated clean scan PDF: {pdf_path} ({len(page_imgs)} pages, {file_size / 1024:.1f} KB)")

# Update file sizes in db.json for these 23 scanned exams
with open('data/db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

updated_count = 0
for cfg in exams_config:
    rel_url = f"/{cfg['pdf_rel'].replace(os.sep, '/')}"
    for e in db.get('exams', []):
        if e.get('fileUrl') == rel_url:
            e['fileSize'] = cfg['fileSize']
            updated_count += 1
            break

with open('data/db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print(f"Database successfully updated. {updated_count} exam file sizes refreshed.")

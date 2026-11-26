import os
import cv2
import numpy as np
from PIL import Image

UPLOAD_FILES = [
    r'C:/Users/Easy Tech/.gemini/antigravity/brain/9df38f08-475d-4203-9572-fda01b9c40da/.user_uploaded/media_1795629570372_78d18c23.jpg',
    r'C:/Users/Easy Tech/.gemini/antigravity/brain/9df38f08-475d-4203-9572-fda01b9c40da/.user_uploaded/media_1795629570379_b73cc504.jpg',
    r'C:/Users/Easy Tech/.gemini/antigravity/brain/9df38f08-475d-4203-9572-fda01b9c40da/.user_uploaded/media_1795629570390_a66dc2fb.jpg',
    r'C:/Users/Easy Tech/.gemini/antigravity/brain/9df38f08-475d-4203-9572-fda01b9c40da/.user_uploaded/media_1795629570398_a1f0784b.jpg',
    r'C:/Users/Easy Tech/.gemini/antigravity/brain/9df38f08-475d-4203-9572-fda01b9c40da/.user_uploaded/media_1795629570404_909d05f0.jpg'
]

OUT_DIR = 'scanned_cropped_pages'
os.makedirs(OUT_DIR, exist_ok=True)

def enhance_scan(crop_img):
    lab = cv2.cvtColor(crop_img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    
    # Background illumination estimation
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (35, 35))
    bg = cv2.morphologyEx(l, cv2.MORPH_DILATE, kernel)
    bg = cv2.GaussianBlur(bg, (35, 35), 0)
    
    # Divide / subtract background for pure white paper
    diff = 255 - cv2.subtract(bg, l)
    norm_l = cv2.normalize(diff, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)
    
    res_lab = cv2.merge([norm_l, a, b])
    enhanced = cv2.cvtColor(res_lab, cv2.COLOR_LAB2BGR)
    
    # Mild contrast boost for crystal-clear readability
    enhanced = cv2.convertScaleAbs(enhanced, alpha=1.12, beta=-8)
    return enhanced

# 1. Page 1: Questions 1 to 15
im1 = cv2.imread(UPLOAD_FILES[0])
crop1 = im1[35:965, 12:im1.shape[1]-12]
p1 = enhance_scan(crop1)
cv2.imwrite(os.path.join(OUT_DIR, 'g12_bio_p1.jpg'), p1)

# 2. Page 2: Questions 16 to 30
im2 = cv2.imread(UPLOAD_FILES[1])
crop2 = im2[50:930, 12:im2.shape[1]-12]
p2 = enhance_scan(crop2)
cv2.imwrite(os.path.join(OUT_DIR, 'g12_bio_p2.jpg'), p2)

# 3. Page 3: Questions 31 to 41
im3 = cv2.imread(UPLOAD_FILES[2])
crop3 = im3[55:935, 12:im3.shape[1]-12]
p3 = enhance_scan(crop3)
cv2.imwrite(os.path.join(OUT_DIR, 'g12_bio_p3.jpg'), p3)

# 4. Page 4: Questions 42 to 52
im4 = cv2.imread(UPLOAD_FILES[3])
crop4 = im4[40:770, 12:im4.shape[1]-12]
p4 = enhance_scan(crop4)
cv2.imwrite(os.path.join(OUT_DIR, 'g12_bio_p4.jpg'), p4)

# 5. Page 5: Official Answer Sheet
im5 = cv2.imread(UPLOAD_FILES[4])
crop5 = im5[35:620, 12:im5.shape[1]-12]
p5 = enhance_scan(crop5)
cv2.imwrite(os.path.join(OUT_DIR, 'g12_bio_p5.jpg'), p5)

print('Clean crops saved!')

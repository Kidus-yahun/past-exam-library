import os
from PIL import Image

OUT_PDF = os.path.join('exams', 'Grade12', 'pretest', 'Biology_Part2.pdf')
SCANNED_DIR = 'scanned_cropped_pages'

# Canvas dimensions (Standard A4 at crisp mobile resolution)
A4_W, A4_H = 1400, 1980

pages_info = [
    ('g12_bio_p1.jpg', 60),
    ('g12_bio_p2.jpg', 60),
    ('g12_bio_p3.jpg', 60),
    ('g12_bio_p4.jpg', 60),
    ('g12_bio_p5.jpg', 60)
]

a4_pages = []

for filename, top_pad in pages_info:
    path = os.path.join(SCANNED_DIR, filename)
    img = Image.open(path)
    
    # Calculate fit
    target_w = 1260
    scale = target_w / img.width
    target_h = int(img.height * scale)
    
    # If height exceeds available A4 height, scale by height instead
    max_avail_h = A4_H - 120
    if target_h > max_avail_h:
        scale = max_avail_h / img.height
        target_h = max_avail_h
        target_w = int(img.width * scale)
        
    resized = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    canvas = Image.new('RGB', (A4_W, A4_H), (255, 255, 255))
    offset_x = (A4_W - target_w) // 2
    offset_y = top_pad
    canvas.paste(resized, (offset_x, offset_y))
    
    a4_pages.append(canvas)

# Save to multi-page PDF
a4_pages[0].save(
    OUT_PDF,
    format='PDF',
    save_all=True,
    append_images=a4_pages[1:],
    resolution=150.0,
    quality=82
)

file_size = os.path.getsize(OUT_PDF)
print(f"Generated {OUT_PDF} ({len(a4_pages)} pages, {file_size / (1024*1024):.2f} MB)")

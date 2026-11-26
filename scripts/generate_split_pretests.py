import os
import io
import time
from PIL import Image
import pypdf

PRETEST_DIR = os.path.join('exams', 'Grade12', 'pretest')

SPLITS = [
    {
        'subject': 'Biology',
        'file': 'Biology.pdf',
        'part1_pages': 13, # 0..12
        'part2_pages': 12, # 13..24 (total 25)
    },
    {
        'subject': 'Chemistry',
        'file': 'Chemistry.pdf',
        'part1_pages': 13, # 0..12
        'part2_pages': 13, # 13..25 (total 26)
    },
    {
        'subject': 'English',
        'file': 'English.pdf',
        'part1_pages': 15, # 0..14
        'part2_pages': 14, # 15..28 (total 29)
    },
    {
        'subject': 'Mathematics',
        'file': 'Mathematics.pdf',
        'part1_pages': 6,  # 0..5
        'part2_pages': 6,  # 6..11 (total 12)
    },
    {
        'subject': 'Physics',
        'file': 'Physics.pdf',
        'part1_pages': 20, # 0..19
        'part2_pages': 20, # 20..39 (total 40)
    }
]

def optimize_image_for_mobile(img_data, max_w=1500, quality=78):
    img = Image.open(io.BytesIO(img_data))
    if img.mode != 'RGB':
        img = img.convert('RGB')
    w, h = img.size
    if w > max_w:
        new_w = max_w
        new_h = int(h * (max_w / w))
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=quality, optimize=True)
    buf.seek(0)
    return Image.open(buf)

def generate_split_pretests():
    t_start = time.time()
    generated_info = []

    for item in SPLITS:
        subject = item['subject']
        src_path = os.path.join(PRETEST_DIR, item['file'])
        if not os.path.exists(src_path):
            print(f"File not found: {src_path}")
            continue

        print(f"\nProcessing {subject} from {src_path}...")
        reader = pypdf.PdfReader(src_path)
        total_pages = len(reader.pages)
        part1_count = item['part1_pages']

        part1_imgs = []
        part2_imgs = []

        for idx, page in enumerate(reader.pages):
            if not page.images:
                continue
            raw_data = page.images[0].data
            opt_img = optimize_image_for_mobile(raw_data)
            if idx < part1_count:
                part1_imgs.append(opt_img)
            else:
                part2_imgs.append(opt_img)

        # Save Part 1
        part1_path = os.path.join(PRETEST_DIR, f"{subject}_Part1.pdf")
        if part1_imgs:
            part1_imgs[0].save(
                part1_path,
                format='PDF',
                save_all=True,
                append_images=part1_imgs[1:]
            )
            size1 = os.path.getsize(part1_path)
            print(f" -> Generated {part1_path} ({len(part1_imgs)} pages, {size1 / (1024*1024):.2f} MB)")
            generated_info.append((f"{subject}_Part1.pdf", len(part1_imgs), size1))

        # Save Part 2
        part2_path = os.path.join(PRETEST_DIR, f"{subject}_Part2.pdf")
        if part2_imgs:
            part2_imgs[0].save(
                part2_path,
                format='PDF',
                save_all=True,
                append_images=part2_imgs[1:]
            )
            size2 = os.path.getsize(part2_path)
            print(f" -> Generated {part2_path} ({len(part2_imgs)} pages, {size2 / (1024*1024):.2f} MB)")
            generated_info.append((f"{subject}_Part2.pdf", len(part2_imgs), size2))

    print(f"\nAll split pretests successfully generated in {time.time() - t_start:.2f}s!")
    return generated_info

if __name__ == '__main__':
    generate_split_pretests()

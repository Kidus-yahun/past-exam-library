import urllib.request
import pypdf
import os
import sys

def download_and_extract(url, exam_id):
    out_dir = os.path.join('temp_pages', exam_id)
    os.makedirs(out_dir, exist_ok=True)
    pdf_path = os.path.join(out_dir, 'paper.pdf')
    print(f"[{exam_id}] Downloading {url}...")
    try:
        urllib.request.urlretrieve(url, pdf_path)
    except Exception as e:
        print(f"[{exam_id}] Download failed: {e}")
        return
    
    try:
        reader = pypdf.PdfReader(pdf_path)
        print(f"[{exam_id}] Total pages: {len(reader.pages)}")
        img_idx = 0
        for i, page in enumerate(reader.pages):
            for j, img in enumerate(page.images):
                img_path = os.path.join(out_dir, f"page_{i+1}_img_{j}.jpg")
                with open(img_path, 'wb') as fp:
                    fp.write(img.data)
                print(f"  Wrote {img_path} ({len(img.data)} bytes)")
                img_idx += 1
        print(f"[{exam_id}] Extracted {img_idx} images.")
    except Exception as e:
        print(f"[{exam_id}] PDF parse failed: {e}")

if __name__ == '__main__':
    exams = [
        # Grade 10
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade10/Semester1/Final/Biology.pdf", "g10_bio_final"),
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade10/Semester1/Final/English.pdf", "g10_eng_final"),
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade10/Semester1/Final/Physics.pdf", "g10_phys_final"),
        # Grade 11
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade11/Semester1/Final/Chemistry.pdf", "g11_chem_final"),
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade11/Semester1/Final/English.pdf", "g11_eng_final"),
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade11/Semester1/Final/Biology.pdf", "g11_bio_final"),
        # Grade 12
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade12/Semester1/Final/Chemistry.pdf", "g12_chem_final"),
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade12/Semester1/Final/Physics.pdf", "g12_phys_final"),
        ("https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main/exams/Grade12/Model/Biology.pdf", "g12_bio_model"),
    ]
    for url, eid in exams:
        download_and_extract(url, eid)

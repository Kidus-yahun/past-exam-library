# scripts/generate_pwa_icons.py
import os
from PIL import Image

os.makedirs('icons', exist_ok=True)

# Master concept image path
SOURCE_MASTER = r'C:\Users\Easy Tech\.gemini\antigravity\brain\11114d9f-f6d9-43c2-a61d-90c020c9e3b0\past_exam_library_icon_1795359714015.jpg'

def generate_icons():
    if not os.path.exists(SOURCE_MASTER):
        print(f"Master source image not found at {SOURCE_MASTER}")
        return

    img = Image.open(SOURCE_MASTER).convert('RGB')
    print(f"Loaded master artwork ({img.size[0]}x{img.size[1]})")

    # Resize with Lanczos filtering
    icon_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
    icon_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    icon_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
    icon_96  = img.resize((96, 96), Image.Resampling.LANCZOS)

    # Save icons
    icon_512.save('icons/icon-512.png', 'PNG', optimize=True)
    icon_192.save('icons/icon-192.png', 'PNG', optimize=True)
    icon_512.save('icons/icon-maskable-512.png', 'PNG', optimize=True)
    icon_192.save('icons/icon-maskable-192.png', 'PNG', optimize=True)
    icon_180.save('icons/apple-touch-icon.png', 'PNG', optimize=True)
    icon_96.save('icons/favicon-96x96.png', 'PNG', optimize=True)

    print("All aesthetic PWA icons generated and optimized successfully!")

if __name__ == '__main__':
    generate_icons()

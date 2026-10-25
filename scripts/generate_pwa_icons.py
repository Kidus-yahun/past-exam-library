# scripts/generate_pwa_icons.py
import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs('icons', exist_ok=True)

def create_pwa_icon(size, is_maskable=False):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background gradient or circle/squircle
    center = size / 2.0
    radius = (size * 0.44) if not is_maskable else (size * 0.48)

    # Draw rounded rectangle / circle background
    # Gradient simulation from top-left (#1e1b4b) to bottom-right (#4338ca)
    bg_margin = int(size * 0.04) if not is_maskable else 0
    corner_radius = int(size * 0.22) if not is_maskable else 0

    # Draw gradient fill
    for y in range(size):
        ratio = y / float(size)
        r = int(17 * (1 - ratio) + 67 * ratio)
        g = int(24 * (1 - ratio) + 56 * ratio)
        b = int(68 * (1 - ratio) + 202 * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Mask for rounded corners if not maskable
    if not is_maskable:
        mask = Image.new('L', (size, size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([bg_margin, bg_margin, size - bg_margin, size - bg_margin], radius=corner_radius, fill=255)
        # Apply mask
        img.putalpha(mask)

    draw = ImageDraw.Draw(img)

    # Outer decorative glow ring
    ring_box = [center - radius * 0.85, center - radius * 0.85, center + radius * 0.85, center + radius * 0.85]
    draw.ellipse(ring_box, outline=(165, 180, 252, 60), width=max(2, int(size * 0.012)))

    # Draw Stylized Open Book & Star Emblem
    # Book spine and pages
    scale = size / 512.0
    cx, cy = center, center * 0.95

    # Book left page
    left_page = [
        (cx - 15 * scale, cy + 60 * scale),
        (cx - 110 * scale, cy + 35 * scale),
        (cx - 110 * scale, cy - 65 * scale),
        (cx - 15 * scale, cy - 40 * scale),
    ]
    draw.polygon(left_page, fill=(248, 250, 252, 240), outline=(199, 210, 254, 255))

    # Book right page
    right_page = [
        (cx + 15 * scale, cy + 60 * scale),
        (cx + 110 * scale, cy + 35 * scale),
        (cx + 110 * scale, cy - 65 * scale),
        (cx + 15 * scale, cy - 40 * scale),
    ]
    draw.polygon(right_page, fill=(241, 245, 249, 255), outline=(199, 210, 254, 255))

    # Book spine center
    spine = [
        (cx - 15 * scale, cy + 60 * scale),
        (cx, cy + 70 * scale),
        (cx + 15 * scale, cy + 60 * scale),
        (cx, cy - 40 * scale)
    ]
    draw.polygon(spine, fill=(99, 102, 241, 255))

    # Page text lines (left page)
    for ly in [-20, 0, 20]:
        draw.line([
            (cx - 95 * scale, cy + (ly + 35) * scale * 0.4),
            (cx - 30 * scale, cy + (ly + 35) * scale * 0.4 + 10 * scale)
        ], fill=(148, 163, 184, 180), width=max(1, int(4 * scale)))

    # Page text lines (right page)
    for ly in [-20, 0, 20]:
        draw.line([
            (cx + 30 * scale, cy + (ly + 35) * scale * 0.4 + 10 * scale),
            (cx + 95 * scale, cy + (ly + 35) * scale * 0.4)
        ], fill=(148, 163, 184, 180), width=max(1, int(4 * scale)))

    # Star / Torch of Wisdom above the book
    star_cy = cy - 80 * scale
    star_points = []
    outer_r = 28 * scale
    inner_r = 12 * scale
    for i in range(10):
        angle = i * math.pi / 5 - math.pi / 2
        r = outer_r if (i % 2 == 0) else inner_r
        star_points.append((cx + r * math.cos(angle), star_cy + r * math.sin(angle)))
    draw.polygon(star_points, fill=(251, 191, 36, 255))

    # Bottom ribbon label or badge
    # "P" emblem in small circle
    badge_cy = cy + 115 * scale
    badge_r = 32 * scale
    draw.ellipse([cx - badge_r, badge_cy - badge_r, cx + badge_r, badge_cy + badge_r], fill=(79, 70, 229, 255), outline=(224, 231, 255, 200), width=max(2, int(3 * scale)))

    # Draw "P" letter
    p_x, p_y = cx - 9 * scale, badge_cy - 18 * scale
    draw.line([(p_x, p_y), (p_x, p_y + 36 * scale)], fill=(255, 255, 255, 255), width=max(2, int(6 * scale)))
    draw.arc([p_x - 4 * scale, p_y, p_x + 22 * scale, p_y + 22 * scale], 270, 90, fill=(255, 255, 255, 255), width=max(2, int(6 * scale)))
    draw.line([(p_x, p_y), (p_x + 8 * scale, p_y)], fill=(255, 255, 255, 255), width=max(2, int(6 * scale)))
    draw.line([(p_x, p_y + 22 * scale), (p_x + 8 * scale, p_y + 22 * scale)], fill=(255, 255, 255, 255), width=max(2, int(6 * scale)))

    return img

# Generate all icons
create_pwa_icon(192, False).save('icons/icon-192.png', 'PNG')
create_pwa_icon(512, False).save('icons/icon-512.png', 'PNG')
create_pwa_icon(192, True).save('icons/icon-maskable-192.png', 'PNG')
create_pwa_icon(512, True).save('icons/icon-maskable-512.png', 'PNG')
create_pwa_icon(96, False).save('icons/favicon-96x96.png', 'PNG')
create_pwa_icon(180, False).save('icons/apple-touch-icon.png', 'PNG')

print('Generated all PWA icons successfully!')

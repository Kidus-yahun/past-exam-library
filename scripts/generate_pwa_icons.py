# scripts/generate_pwa_icons.py
import os
import math
from PIL import Image, ImageDraw

os.makedirs('icons', exist_ok=True)

def render_master_icon(size=2048):
    """
    Renders high-resolution 2048x2048 master icon with 100% full-bleed background,
    ensuring zero transparent corners or borders so mobile launchers (Android circle,
    Samsung squircle, iOS) never wrap the icon in a white plate or bubble.
    All key emblem elements stay strictly within the W3C 80% safe zone.
    """
    img = Image.new('RGB', (size, size))
    draw = ImageDraw.Draw(img)

    # 1. Full-bleed rich gradient: deep midnight navy (#0a0e1a) to royal electric indigo (#272365 to #3730a3)
    for y in range(size):
        ratio = y / float(size)
        r = int(10 * (1 - ratio) + 38 * ratio)
        g = int(14 * (1 - ratio) + 48 * ratio)
        b = int(28 * (1 - ratio) + 140 * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b))

    # Center coordinates & responsive scale
    center = size / 2.0
    scale = (size / 512.0) * 0.90
    cx, cy = center, center * 0.96

    # 2. Ambient Glow behind the book and star
    glow_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_img)
    glow_r = int(140 * scale)
    glow_draw.ellipse([cx - glow_r, cy - glow_r - 20 * scale, cx + glow_r, cy + glow_r - 20 * scale], fill=(99, 102, 241, 50))
    img.paste(Image.alpha_composite(Image.new('RGBA', (size, size), (0,0,0,0)), glow_img).convert('RGB'), mask=glow_img.split()[3])
    draw = ImageDraw.Draw(img)

    # 3. Subtle circular guideline ring (at radius 0.35 * size, well inside 80% safe zone)
    ring_r = size * 0.35
    draw.ellipse([center - ring_r, center - ring_r, center + ring_r, center + ring_r], outline=(199, 210, 254, 55), width=max(2, int(3.5 * scale)))

    # 4. Stylized 3D Open Book
    # Page backings for depth
    left_shadow = [
        (cx - 14 * scale, cy + 65 * scale),
        (cx - 114 * scale, cy + 40 * scale),
        (cx - 114 * scale, cy - 62 * scale),
        (cx - 14 * scale, cy - 37 * scale),
    ]
    draw.polygon(left_shadow, fill=(30, 27, 75))

    right_shadow = [
        (cx + 14 * scale, cy + 65 * scale),
        (cx + 114 * scale, cy + 40 * scale),
        (cx + 114 * scale, cy - 62 * scale),
        (cx + 14 * scale, cy - 37 * scale),
    ]
    draw.polygon(right_shadow, fill=(30, 27, 75))

    # Left Page
    left_page = [
        (cx - 14 * scale, cy + 60 * scale),
        (cx - 110 * scale, cy + 35 * scale),
        (cx - 110 * scale, cy - 65 * scale),
        (cx - 14 * scale, cy - 40 * scale),
    ]
    draw.polygon(left_page, fill=(248, 250, 252), outline=(199, 210, 254), width=max(1, int(3 * scale)))

    # Right Page
    right_page = [
        (cx + 14 * scale, cy + 60 * scale),
        (cx + 110 * scale, cy + 35 * scale),
        (cx + 110 * scale, cy - 65 * scale),
        (cx + 14 * scale, cy - 40 * scale),
    ]
    draw.polygon(right_page, fill=(241, 245, 249), outline=(199, 210, 254), width=max(1, int(3 * scale)))

    # Spine Ribbon
    spine = [
        (cx - 14 * scale, cy + 60 * scale),
        (cx, cy + 72 * scale),
        (cx + 14 * scale, cy + 60 * scale),
        (cx, cy - 40 * scale)
    ]
    draw.polygon(spine, fill=(99, 102, 241))

    # Page lines
    for ly in [-22, -2, 18]:
        draw.line([
            (cx - 96 * scale, cy + (ly + 35) * scale * 0.42),
            (cx - 28 * scale, cy + (ly + 35) * scale * 0.42 + 10 * scale)
        ], fill=(148, 163, 184), width=max(1, int(4.5 * scale)))
        draw.line([
            (cx + 28 * scale, cy + (ly + 35) * scale * 0.42 + 10 * scale),
            (cx + 96 * scale, cy + (ly + 35) * scale * 0.42)
        ], fill=(148, 163, 184), width=max(1, int(4.5 * scale)))

    # 5. Golden Star of Academic Excellence
    star_cy = cy - 82 * scale
    star_points = []
    outer_r = 30 * scale
    inner_r = 13 * scale
    for i in range(10):
        angle = i * math.pi / 5 - math.pi / 2
        r = outer_r if (i % 2 == 0) else inner_r
        star_points.append((cx + r * math.cos(angle), star_cy + r * math.sin(angle)))
    draw.polygon(star_points, fill=(251, 191, 36), outline=(245, 158, 11), width=max(1, int(2 * scale)))

    # 6. Academic Crest Badge (with 'P')
    badge_cy = cy + 116 * scale
    badge_r = 34 * scale
    draw.ellipse([cx - badge_r, badge_cy - badge_r, cx + badge_r, badge_cy + badge_r], fill=(67, 56, 202), outline=(224, 231, 255), width=max(2, int(3.5 * scale)))

    p_x, p_y = cx - 10 * scale, badge_cy - 19 * scale
    p_w = max(2, int(6.5 * scale))
    draw.line([(p_x, p_y), (p_x, p_y + 38 * scale)], fill=(255, 255, 255), width=p_w)
    draw.arc([p_x - 4 * scale, p_y, p_x + 24 * scale, p_y + 24 * scale], 270, 90, fill=(255, 255, 255), width=p_w)
    draw.line([(p_x, p_y + 3 * scale), (p_x + 10 * scale, p_y + 3 * scale)], fill=(255, 255, 255), width=p_w)
    draw.line([(p_x, p_y + 24 * scale), (p_x + 10 * scale, p_y + 24 * scale)], fill=(255, 255, 255), width=p_w)

    return img

print('Rendering 2048x2048 master icon...')
master = render_master_icon(2048)

print('Downsampling with Lanczos filter to target PWA icon sizes...')
icon_512 = master.resize((512, 512), Image.Resampling.LANCZOS)
icon_192 = master.resize((192, 192), Image.Resampling.LANCZOS)
icon_180 = master.resize((180, 180), Image.Resampling.LANCZOS)
icon_96  = master.resize((96, 96), Image.Resampling.LANCZOS)

# Save standard icons
icon_512.save('icons/icon-512.png', 'PNG', optimize=True)
icon_192.save('icons/icon-192.png', 'PNG', optimize=True)

# Save maskable icons (full bleed conforms 100% to W3C maskable standard)
icon_512.save('icons/icon-maskable-512.png', 'PNG', optimize=True)
icon_192.save('icons/icon-maskable-192.png', 'PNG', optimize=True)

# Apple touch icon & favicon
icon_180.save('icons/apple-touch-icon.png', 'PNG', optimize=True)
icon_96.save('icons/favicon-96x96.png', 'PNG', optimize=True)

print('All PWA icons generated and optimized successfully!')

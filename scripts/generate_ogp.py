#!/usr/bin/env python3
"""
OGP画像を生成するスクリプト
出力: public/images/ogp.png (1200x630)
"""
from PIL import Image, ImageDraw
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images" / "ogp.png"

W, H = 1200, 630

# カラー定義（サイトのブランドカラー）
COLOR_BG       = (26, 64, 26)    # #1a401a ダーク緑
COLOR_MID      = (45, 106, 79)   # #2D6A4F ブランド緑
COLOR_LIGHT    = (52, 128, 52)   # やや明るい緑
COLOR_WHITE    = (255, 255, 255)
COLOR_CREAM    = (250, 248, 242) # #FAF8F2
COLOR_GOLD     = (231, 168, 58)  # #E7A83A サン

img = Image.new("RGB", (W, H), COLOR_BG)
draw = ImageDraw.Draw(img)

# 背景グラデーション風（横帯）
for y in range(H):
    ratio = y / H
    r = int(COLOR_BG[0] + (COLOR_MID[0] - COLOR_BG[0]) * ratio)
    g = int(COLOR_BG[1] + (COLOR_MID[1] - COLOR_BG[1]) * ratio)
    b = int(COLOR_BG[2] + (COLOR_MID[2] - COLOR_BG[2]) * ratio)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# 左側アクセントバー
draw.rectangle([0, 0, 8, H], fill=COLOR_GOLD)

# 上部ラベル（小さい英字）
draw.rectangle([60, 60, 340, 90], fill=(*COLOR_GOLD, 180))
draw.rectangle([60, 60, 340, 90], fill=COLOR_GOLD)

# フォントはデフォルトを使用（日本語非対応だが構造として配置）
try:
    from PIL import ImageFont
    # macOS の日本語フォント
    font_paths = [
        "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]
    jp_font_paths = [
        "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc",
        "/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
    ]

    font_large = None
    font_mid = None
    font_small = None

    for fp in jp_font_paths:
        if Path(fp).exists():
            try:
                font_large = ImageFont.truetype(fp, 72)
                font_mid   = ImageFont.truetype(fp, 36)
                font_small = ImageFont.truetype(fp, 24)
                break
            except Exception:
                continue

    if font_large is None:
        font_large = ImageFont.load_default()
        font_mid   = ImageFont.load_default()
        font_small = ImageFont.load_default()

except Exception:
    font_large = ImageFont.load_default()
    font_mid   = ImageFont.load_default()
    font_small = ImageFont.load_default()

# ラベルテキスト
draw.text((70, 63), "Saga Agricultural Corporation Association", font=font_small, fill=COLOR_BG)

# メインタイトル
draw.text((60, 120), "佐賀県農業法人協会", font=font_large, fill=COLOR_WHITE)

# サブタイトル
draw.text((60, 220), "会員法人紹介サイト", font=font_mid, fill=(*COLOR_WHITE[:3], 200))
draw.text((60, 220), "会員法人紹介サイト", font=font_mid, fill=COLOR_CREAM)

# 区切り線
draw.rectangle([60, 280, 400, 284], fill=COLOR_GOLD)

# 説明文
draw.text((60, 310), "佐賀県内の農業法人のネットワーク。", font=font_small, fill=COLOR_CREAM)
draw.text((60, 345), "40法人の生産品・販路情報を掲載しています。", font=font_small, fill=COLOR_CREAM)

# 右側の装飾（稲穂イメージ: 円）
cx, cy = 950, 315
for i in range(6):
    import math
    angle = i * 60
    rad = math.radians(angle)
    x = cx + int(120 * math.cos(rad))
    y = cy + int(120 * math.sin(rad))
    draw.ellipse([x-20, y-20, x+20, y+20], fill=(*COLOR_GOLD[:3],), outline=COLOR_WHITE, width=2)
draw.ellipse([cx-30, cy-30, cx+30, cy+30], fill=COLOR_GOLD, outline=COLOR_WHITE, width=3)

# URL
draw.text((60, 570), "i8ei.github.io/sanoukai-members/", font=font_small, fill=(*COLOR_WHITE[:3],))

img.save(OUTPUT, "PNG")
print(f"生成完了: {OUTPUT}")
print(f"サイズ: {img.size}")

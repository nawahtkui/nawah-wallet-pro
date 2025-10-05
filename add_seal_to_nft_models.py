#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from PIL import Image, ImageDraw, ImageFont
import random
import string

# مسار الصور الأصلية
INPUT_DIR = "nft_images"            # مجلد النسخ الأصلية
OUTPUT_DIR = "nft_images_sealed"    # مجلد الصور بعد إضافة الختم الرقمي
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"  # يمكن تغييره لمسار خط آخر
FONT_SIZE = 30

# تأكد من وجود مجلد الإخراج
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_unique_code(prefix="A"):
    """توليد رمز فريد مكون من حرف البادئة و8 أحرف/أرقام عشوائية"""
    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    return f"{prefix}-{code}"

def seal_image(input_path, output_path, unique_code):
    """إضافة ختم نصي على الصورة"""
    image = Image.open(input_path).convert("RGBA")
    draw = ImageDraw.Draw(image)

    try:
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
    except:
        font = ImageFont.load_default()

    # تحديد مكان النص في الزاوية اليمنى السفلى
    text = unique_code
    margin = 10
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = image.width - text_width - margin
    y = image.height - text_height - margin

    # إضافة النص
    draw.text((x, y), text, fill=(255, 0, 0, 255), font=font)  # أحمر

    # حفظ الصورة الجديدة
    image.save(output_path)
    print(f"[✔] تمت إضافة الختم إلى: {os.path.basename(input_path)} → {unique_code}")

def main():
    images = sorted([f for f in os.listdir(INPUT_DIR) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
    for img_name in images:
        input_path = os.path.join(INPUT_DIR, img_name)
        output_path = os.path.join(OUTPUT_DIR, img_name)
        unique_code = generate_unique_code("A")  # الحرف A للمجموعة الحالية
        seal_image(input_path, output_path, unique_code)

if __name__ == "__main__":
    main()


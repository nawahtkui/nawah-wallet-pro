#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime
import webbrowser

# مجلد الصور المصدر
INPUT_DIR = "nft_models"
# اسم ملف المعاينة النهائي
OUTPUT_HTML = "nft_models_preview.html"
# خط للكتابة على الصور (يمكن تغييره لمسار خط متوفر في النظام)
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_SIZE = 20

def seal_image(image_path, unique_code):
    try:
        image = Image.open(image_path)
        if image.mode == "RGBA":
            image = image.convert("RGB")
        draw = ImageDraw.Draw(image)
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
        text = f"#{unique_code}"
        width, height = image.size
        draw.text((10, height - FONT_SIZE - 10), text, font=font, fill=(255, 0, 0))
        sealed_path = os.path.join("output_sealed", os.path.basename(image_path))
        os.makedirs("output_sealed", exist_ok=True)
        image.save(sealed_path)
        return sealed_path
    except Exception as e:
        print(f"[!] خطأ بمعالجة {os.path.basename(image_path)}: {e}")
        return None

def main():
    images = sorted([f for f in os.listdir(INPUT_DIR) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
    os.makedirs("output_sealed", exist_ok=True)

    html_content = """
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <title>🔸 معاينة نماذج NFT المختومة 🔸</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f0f0f0; text-align:center; }
            h1 { color: #333; }
            .gallery { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
            .gallery-item { background: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 0 5px #ccc; }
            .gallery-item img { max-width: 200px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1>🔸 معاينة نماذج NFT المختومة 🔸</h1>
        <div class="gallery">
    """

    for idx, img_file in enumerate(images, 1):
        sealed_path = seal_image(os.path.join(INPUT_DIR, img_file), idx)
        if sealed_path:
            html_content += f"""
            <div class="gallery-item">
                <img src="{sealed_path}" alt="NFT {idx}">
                <p>#{idx}</p>
            </div>
            """

    html_content += """
        </div>
    </body>
    </html>
    """

    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"[✔] تم إنشاء الصفحة: {OUTPUT_HTML}  (عدد الصور: {len(images)})")
    
    # فتح الصفحة تلقائيًا
    os.system(f"termux-open {OUTPUT_HTML}")

if __name__ == "__main__":
    main()


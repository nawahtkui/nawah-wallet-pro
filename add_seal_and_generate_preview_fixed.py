#!/usr/bin/env python3
import os
import base64

# المجلد الذي يحتوي على الصور المختمة
INPUT_DIR = "nft_models_sealed"
# اسم ملف المعاينة النهائي
OUTPUT_HTML = "nft_models_preview.html"

# تأكد أن المجلد موجود
if not os.path.exists(INPUT_DIR):
    print(f"المجلد '{INPUT_DIR}' غير موجود. ضع الصور هنا أولاً.")
    exit(1)

# جمع الصور
images = sorted([f for f in os.listdir(INPUT_DIR) if f.lower().endswith((".png", ".jpg", ".jpeg"))])
if not images:
    print(f"لا توجد صور في المجلد '{INPUT_DIR}'.")
    exit(1)

# بدء بناء HTML
html_content = """<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>معاينة النماذج المختمة</title>
<style>
  body { font-family: Arial, sans-serif; background: #f0f0f0; text-align: center; }
  img { max-width: 300px; margin: 15px; border: 2px solid #333; }
</style>
</head>
<body>
<h1>معاينة النماذج المختمة</h1>
"""

for img_file in images:
    img_path = os.path.join(INPUT_DIR, img_file)
    with open(img_path, "rb") as f:
        b64_data = base64.b64encode(f.read()).decode()
    ext = img_file.split(".")[-1].lower()
    html_content += f'<div><img src="data:image/{ext};base64,{b64_data}" alt="{img_file}"><p>{img_file}</p></div>\n'

html_content += "</body>\n</html>"

# حفظ ملف HTML
with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"✅ تم إنشاء ملف المعاينة: {OUTPUT_HTML}")
print(f"📂 افتحه الآن باستخدام: termux-open {OUTPUT_HTML}")

#!/usr/bin/env python3
# generate_preview_embedded.py
# يقرأ الصور من nft_images_sealed/ ويولد nft_preview_embedded.html مع تضمين الصور كـ Base64
import os
import base64
import json
from pathlib import Path

IMAGES_DIR = "nft_images_sealed"
JSON_DIR = "enhanced_nft_metadata"
OUTPUT_HTML = "nft_preview_embedded.html"

# تحقق من وجود المجلد
if not os.path.isdir(IMAGES_DIR):
    print(f"خطأ: المجلد '{IMAGES_DIR}' غير موجود. ضع الصور المختومة هناك ثم أعد التشغيل.")
    exit(1)

images = sorted([f for f in os.listdir(IMAGES_DIR) if f.lower().endswith(('.png','.jpg','.jpeg'))])
if not images:
    print(f"لا توجد صور في المجلد '{IMAGES_DIR}'. تأكد من وضع الصور ثم أعد التشغيل.")
    exit(1)

def image_to_data_uri(path):
    ext = Path(path).suffix.lower()
    mime = "image/jpeg" if ext in [".jpg", ".jpeg"] else "image/png"
    with open(path, "rb") as fh:
        b = base64.b64encode(fh.read()).decode("ascii")
    return f"data:{mime};base64,{b}"

html = []
html.append("<!DOCTYPE html>")
html.append("<html lang='en'><head><meta charset='utf-8'><title>NFT Preview Embedded</title>")
html.append("<meta name='viewport' content='width=device-width, initial-scale=1'>")
html.append("<style>")
html.append("body{font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;margin:20px}")
html.append(".grid{display:flex;flex-wrap:wrap;gap:18px;justify-content:center}")
html.append(".card{background:#fff;border-radius:10px;padding:12px;width:320px;box-shadow:0 4px 12px rgba(0,0,0,0.08)}")
html.append(".card img{width:100%;height:auto;border-radius:6px;background:#eee}")
html.append(".meta{font-size:13px;margin-top:8px;color:#222}")
html.append(".meta ul{padding-left:18px;margin:6px 0}")
html.append("</style></head><body>")
html.append("<h1 style='text-align:center'>Nawah — NFT Preview (Embedded)</h1>")
html.append("<div class='grid'>")

for img in images:
    img_path = os.path.join(IMAGES_DIR, img)
    data_uri = image_to_data_uri(img_path)
    # محاولة قراءة metadata من ملف JSON إن وُجد (مثال: 04_variant_1.json)
    base = os.path.splitext(img)[0]
    json_path = os.path.join(JSON_DIR, f"{base}.json")
    name = img
    desc = ""
    attrs = []
    if os.path.exists(json_path):
        try:
            with open(json_path, "r", encoding="utf-8") as jf:
                d = json.load(jf)
                name = d.get("name", name)
                desc = d.get("description", "")
                attrs = d.get("attributes", [])
        except Exception as e:
            # لا نوقف التنفيذ إن فشل قراءة JSON
            desc = f"[خطأ بقراءة JSON: {e}]"

    # إذا لم توجد metadata منفصلة، نحاول استخراج رمز المجموعة/Unique code من اسم الملف إن وُجد
    group = "?"
    unique = base
    if "-" in base:
        parts = base.split("-",1)
        group = parts[0]
        unique = parts[1]
    else:
        # أمثلة أخرى: A_01_ABC123.jpg أو 01_inverted_jenny.jpg
        if "_" in base:
            parts = base.split("_")
            if parts[0].isalpha() and len(parts[0])==1:
                group = parts[0]

    card_html = []
    card_html.append("<div class='card'>")
    card_html.append(f"<img src='{data_uri}' alt='{name}'>")
    card_html.append("<div class='meta'>")
    card_html.append(f"<h3 style='margin:6px 0 2px'>{name}</h3>")
    if desc:
        card_html.append(f"<div style='color:#444;font-size:13px'>{desc}</div>")
    # attributes from JSON
    if attrs:
        card_html.append("<ul>")
        for a in attrs:
            t = a.get("trait_type","?")
            v = a.get("value","?")
            card_html.append(f"<li><strong>{t}:</strong> {v}</li>")
        card_html.append("</ul>")
    else:
        # fallback: show inferred group/unique
        card_html.append("<ul>")
        card_html.append(f"<li><strong>Group:</strong> {group}</li>")
        card_html.append(f"<li><strong>Unique:</strong> {unique}</li>")
        card_html.append("</ul>")
    card_html.append("</div>")  # .meta
    card_html.append("</div>")  # .card

    html.append("\n".join(card_html))

html.append("</div>")  # .grid
html.append("</body></html>")

with open(OUTPUT_HTML, "w", encoding="utf-8") as out:
    out.write("\n".join(html))

print(f"[✔] Created: {OUTPUT_HTML}  — contains {len(images)} images")

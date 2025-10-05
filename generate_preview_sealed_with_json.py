import os
import json

# مجلد الصور
IMAGES_DIR = "nft_images_sealed"
# اسم ملف HTML الناتج
OUTPUT_HTML = "nft_preview_sealed_full.html"

# بيانات JSON لكل صورة (تقدر تضيف المزيد حسب الحاجة)
nft_metadata = {
    "01_inverted_jenny.jpg": {
        "name": "Inverted Jenny Stamp",
        "description": "Upside-down airplane, legendary misprint.",
        "attributes": [
            {"trait_type": "Year", "value": "1918"},
            {"trait_type": "Type", "value": "Airmail Misprint"},
            {"trait_type": "Country", "value": "USA"},
            {"trait_type": "Rarity", "value": "Legendary"}
        ]
    },
    "02_abraham_lincoln.jpg": {
        "name": "Abraham Lincoln Stamp",
        "description": "Rare 1867 stamp with Lincoln.",
        "attributes": [
            {"trait_type": "Year", "value": "1867"},
            {"trait_type": "Figure", "value": "Abraham Lincoln"},
            {"trait_type": "Country", "value": "USA"},
            {"trait_type": "Rarity", "value": "Extremely Rare"}
        ]
    },
    "03_benjamin_franklin.jpg": {
        "name": "Benjamin Franklin Stamp",
        "description": "Rare 1867 stamp featuring Benjamin Franklin.",
        "attributes": [
            {"trait_type": "Year", "value": "1867"},
            {"trait_type": "Figure", "value": "Benjamin Franklin"},
            {"trait_type": "Country", "value": "USA"},
            {"trait_type": "Rarity", "value": "Extremely Rare"}
        ]
    }
}

# اجلب الصور من المجلد
images = sorted([f for f in os.listdir(IMAGES_DIR) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])

# انشئ HTML
html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NFT Preview Sealed</title>
<style>
body { font-family: Arial, sans-serif; background: #f4f4f4; }
.nft { margin: 20px; padding: 20px; background: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
.nft img { max-width: 300px; display: block; margin-bottom: 10px; }
</style>
</head>
<body>
<h1>NFT Preview (Sealed)</h1>
"""

for img in images:
    meta = nft_metadata.get(img, {})
    name = meta.get("name", img)
    description = meta.get("description", "")
    attributes = meta.get("attributes", [])
    html_content += f'<div class="nft">\n'
    html_content += f'<img src="{IMAGES_DIR}/{img}" alt="{name}">\n'
    html_content += f'<h2>{name}</h2>\n'
    html_content += f'<p>{description}</p>\n'
    html_content += f'<ul>\n'
    for attr in attributes:
        html_content += f'<li>{attr["trait_type"]}: {attr["value"]}</li>\n'
    html_content += f'</ul>\n'
    html_content += f'</div>\n'

html_content += "</body>\n</html>"

# احفظ HTML
with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"[✔] تم إنشاء صفحة المعاينة: {OUTPUT_HTML}")


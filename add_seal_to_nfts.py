from PIL import Image, ImageDraw, ImageFont
import os
import hashlib

# المجلدات
input_folder = "nft_images"
output_folder = "nft_images_sealed"
os.makedirs(output_folder, exist_ok=True)

# إعدادات الخط
font_path = "/system/fonts/DroidSans.ttf"  # خط نظام أندرويد
font_size = 22
try:
    font = ImageFont.truetype(font_path, font_size)
except Exception:
    font = ImageFont.load_default()

# دالة لتوليد كود فريد بناءً على اسم الصورة
def generate_unique_code(filename):
    hash_object = hashlib.sha256(filename.encode())
    return "A-" + hash_object.hexdigest()[:8].upper()

# دالة لإضافة الختم
def seal_image(input_path, output_path, unique_code):
    image = Image.open(input_path).convert("RGBA")
    draw = ImageDraw.Draw(image)

    text = f"Nawah {unique_code}"
    margin = 20

    # حساب حجم النص بطريقة متوافقة مع جميع الإصدارات
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    except AttributeError:
        text_width, text_height = draw.textsize(text, font=font)

    x = image.width - text_width - margin
    y = image.height - text_height - margin

    # رسم خلفية شبه شفافة خلف النص
    draw.rectangle(
        [(x - 10, y - 5), (x + text_width + 10, y + text_height + 5)],
        fill=(0, 0, 0, 120)
    )

    # رسم النص الأبيض
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)

    image.save(output_path, "PNG")

# التنفيذ الرئيسي
def main():
    for filename in os.listdir(input_folder):
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)
            unique_code = generate_unique_code(filename)
            seal_image(input_path, output_path, unique_code)
            print(f"[✔] تمت إضافة الختم إلى: {filename} → {unique_code}")

if __name__ == "__main__":
    main()


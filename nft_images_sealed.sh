#!/bin/bash
# nft_images_sealed.sh
# سكربت: ضغط وتشفير مجلد صور NFT (معدل وآمن)
# مسارات ثابتة داخل مشروعك Nawah-Wallet

# --- إعداد المسارات ---
IMG_DIR="$HOME/downloads/Nawah-Wallet/nft_images"
SEALED_DIR="$HOME/downloads/Nawah-Wallet/nft_images_sealed_protected"
ARCHIVE_NAME="nft_images_$(date +%Y%m%d_%H%M%S).tar.gz"
ENCRYPTED_ARCHIVE="nft_images_sealed_$(date +%Y%m%d_%H%M%S).enc"

# --- إنشاء المجلدات إن لم تكن موجودة ---
mkdir -p "$IMG_DIR"
mkdir -p "$SEALED_DIR"

echo "📂 المجلدات:"
echo "  الصور (Input) : $IMG_DIR"
echo "  المحمي (Output): $SEALED_DIR"
echo ""

# --- خطوة (أ): فتح مجلد الصور لتعديل أو مراجعة ---
if [ -z "$(ls -A "$IMG_DIR" 2>/dev/null)" ]; then
  echo "⚠️  مجلد الصور فارغ: $IMG_DIR"
  echo "ضع الصور داخل المجلد ثم أعد تشغيل هذا السكربت."
  exit 1
fi

echo "✏️  جاري فتح مجلد الصور للتعديل (termux-open)..."
termux-open "$IMG_DIR"
echo "✅ يمكنك الآن تعديل الصور. اضغط [Enter] بعد الإنتهاء."
read -r

# --- خطوة (ب): ضغط الملفات ---
echo "🗜️  يتم ضغط الصور إلى أرشيف..."
tar -czf "$SEALED_DIR/$ARCHIVE_NAME" -C "$IMG_DIR" .
if [ $? -ne 0 ]; then
  echo "❌ فشل ضغط الصور. تأكد من وجود الملفات وإعادة المحاولة."
  exit 1
fi
echo "✅ تم إنشاء الأرشيف: $SEALED_DIR/$ARCHIVE_NAME"

# --- خطوة (ج): طلب كلمة مرور للتشفير (مخفي أثناء الإدخال) ---
echo ""
read -s -p "🔐 أدخل كلمة مرور للتشفير (ستحتاجها لفك الشفرة): " PW
echo ""
if [ -z "$PW" ]; then
  echo "❌ لم تدخل كلمة مرور. إلغاء العملية."
  rm -f "$SEALED_DIR/$ARCHIVE_NAME"
  exit 1
fi

# --- خطوة (د): تشفير الأرشيف باستخدام openssl (pbkdf2 آمن) ---
echo "🔐 جاري تشفير الأرشيف..."
openssl enc -aes-256-cbc -salt -pbkdf2 -in "$SEALED_DIR/$ARCHIVE_NAME" -out "$SEALED_DIR/$ENCRYPTED_ARCHIVE" -pass pass:"$PW"
if [ $? -ne 0 ]; then
  echo "❌ فشل التشفير عبر openssl."
  # إزالة الأرشيف غير المشفّر إن رغبت
  rm -f "$SEALED_DIR/$ARCHIVE_NAME"
  exit 1
fi

# --- خطوة (هـ): تنظيف (حذف الأرشيف غير المشفّر) ---
rm -f "$SEALED_DIR/$ARCHIVE_NAME"
echo "✅ تم التشفير والحذف الآمن للأرشيف غير المشفّر."

# --- خطوة (و): فتح مجلد النتيجة وإظهار المسار ---
echo ""
echo "📁 المجلد المحمي:"
ls -l "$SEALED_DIR"
termux-open "$SEALED_DIR"

echo ""
echo "🎉 اكتملت العملية. ملف مشفّر: $SEALED_DIR/$ENCRYPTED_ARCHIVE"
echo "❗ احتفظ بكلمة المرور التي أدخلتها لفك التشفير لاحقًا."

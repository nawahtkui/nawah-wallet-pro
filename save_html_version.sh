#!/bin/bash

# المجلد الذي يحتوي على الملفات
WORKDIR=~/downloads/Nawah-Wallet
FILENAME="nft_preview.html"

cd $WORKDIR || exit

# إيجاد آخر نسخة موجودة
LAST=$(ls nft_preview_v*.html 2>/dev/null | sort -V | tail -n 1)

if [ -z "$LAST" ]; then
  # لا يوجد نسخ، نبدأ من v1
  NEW="nft_preview_v1.html"
else
  # استخراج الرقم الأخير وزيادته
  NUM=$(echo "$LAST" | grep -oP '(?<=_v)\d+(?=\.html)')
  NEW_NUM=$((NUM+1))
  NEW="nft_preview_v${NEW_NUM}.html"
fi

# نسخ الملف الأصلي إلى النسخة الجديدة
cp "$FILENAME" "$NEW"

echo "تم إنشاء النسخة الجديدة: $NEW"

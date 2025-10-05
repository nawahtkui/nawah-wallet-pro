#!/bin/bash
set -e

INPUT_FILE=\${1:-secrets_plain.json}
OUT_FILE=\${2:-vault.enc.json}

if [ ! -f "\$INPUT_FILE" ]; then
  echo "Input file not found: \$INPUT_FILE"
  exit 1
fi

# قراءة كلمة المرور بشكل آمن (لن تظهر في التاريخ)
read -s -p "Enter MASTER PASS (will not be shown): " MASTER_PASS
echo
export MASTER_PASS

# تنفيذ التشفير
node encryptFile.js "\$INPUT_FILE" "\$OUT_FILE"

# التأكد من وجود الملف المشفر ثم حذف الأصلي
if [ -f "\$OUT_FILE" ]; then
  shred -u "\$INPUT_FILE" || rm -f "\$INPUT_FILE"
  echo "Original file shredded/removed: \$INPUT_FILE"
else
  echo "Encryption failed, original file NOT removed."
fi

# إزالة المتغير من البيئة (أمان)
unset MASTER_PASS

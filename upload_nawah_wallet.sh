#!/bin/bash

# ---- إعداد المتغيرات ----
GITHUB_USERNAME="nawahtkui"
GITHUB_REPO="Nawah-Wallet-.git"

echo "ابدأ عملية رفع مشروع Nawah Wallet إلى GitHub..."

# ---- مسح Git القديم ----
rm -rf .git
git credential-cache exit
git config --global --unset credential.helper

# ---- ضبط Credential Helper (يمكن التبديل بين cache أو store) ----
git config --global credential.helper cache
# git config --global credential.helper store

# ---- تهيئة Git ----
git init
git branch -M main

# ---- إضافة الملفات وعمل Commit ----
git add .
git commit -m "Initial commit – Nawah Wallet project structure"

# ---- ربط المستودع البعيد ----
git remote add origin https://github.com/$GITHUB_USERNAME/$GITHUB_REPO

# ---- رفع المشروع ----
git push -u origin main

echo "تم رفع المشروع بنجاح! 🎉"

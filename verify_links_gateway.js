// تثبيت الحزمة المطلوبة فقط:
// npm install node-fetch

import fs from 'fs';
import fetch from 'node-fetch';

async function main() {
  // قراءة الروابط من links.txt
  const links = fs.readFileSync('links.txt', 'utf-8')
                  .split('\n')
                  .map(l => l.trim())
                  .filter(Boolean);

  const results = [];

  for (let i = 0; i < links.length; i++) {
    const rawLink = links[i];
    // تحويل ipfs:// إلى رابط Gateway صالح
    const url = rawLink.replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/')
                       .replace(/^https?:\/\/ipfs.io\/ipfs\//, 'https://ipfs.io/ipfs/');

    try {
      const res = await fetch(url, { timeout: 10000 });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // مجرد فحص وصول المحتوى، لا حاجة لقراءة كامل الملف
      results.push({ index: i + 1, link: rawLink, status: 'OK' });
      console.log(`✅ ${i + 1} OK: ${rawLink}`);
    } catch (err) {
      results.push({ index: i + 1, link: rawLink, status: 'FAILED', error: err.message });
      console.error(`❌ ${i + 1} FAIL: ${rawLink} -> ${err.message}`);
    }
  }

  // حفظ النتائج
  fs.writeFileSync('links_verification_results.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('✅ تم الانتهاء من التحقق، النتائج محفوظة في links_verification_results.json');
}

main().catch(e => { console.error(e); process.exit(1); });

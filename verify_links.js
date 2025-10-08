// verify_links.js
// تثبيت: npm install helia @helia/verified-fetch
import fs from 'fs';
import { createHelia } from 'helia';
import { verifiedFetch } from '@helia/verified-fetch';

async function main() {
  const links = fs.readFileSync('links.txt', 'utf-8')
                  .split('\n')
                  .map(l => l.trim())
                  .filter(Boolean);

  const helia = await createHelia();
  const results = [];

  for (let i=0; i<links.length; i++) {
    const raw = links[i];
    const cid = raw.replace(/^ipfs:\/\//, '').replace(/^https?:\/\/ipfs.io\/ipfs\//, '');
    try {
      const res = await verifiedFetch(helia, cid);
      // نحاول فهم نوع المحتوى: نص أم باينري
      const text = await res.text();
      console.log(`✅ ${i+1} OK: ${raw}`);
      results.push({index:i+1, link: raw, status:'OK', sample: text.slice(0,200)});
    } catch (err) {
      console.error(`❌ ${i+1} FAIL: ${raw} -> ${err.message}`);
      results.push({index:i+1, link: raw, status:'FAILED', error: err.message});
    }
  }

  fs.writeFileSync('links_verification_results.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('Done -> links_verification_results.json');
  process.exit(0);
}

main().catch(e=>{ console.error(e); process.exit(1); });

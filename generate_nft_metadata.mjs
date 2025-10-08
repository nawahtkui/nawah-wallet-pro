import fs from 'fs';
import fetch from 'node-fetch';

// قراءة روابط IPFS
const links = fs.readFileSync('links.txt','utf-8')
                .split('\n')
                .map(l=>l.trim())
                .filter(Boolean);

const nftMetadata = [];

async function main(){
  for(let i=0;i<links.length;i++){
    const rawLink = links[i];
    const url = rawLink.replace(/^ipfs:\/\//,'https://ipfs.io/ipfs/');

    let broken = false;

    try{
      const res = await fetch(url,{timeout:10000});
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log(`✅ ${i+1} OK: ${rawLink}`);
    }catch(err){
      broken = true;
      console.error(`❌ ${i+1} FAIL: ${rawLink} -> ${err.message}`);
    }

    // توليد JSON جاهز للـ minting
    nftMetadata.push({
      id: i+1,
      image: rawLink,
      name: `NFT Piece #${i+1}`,
      description: `مشغولات نسائية فضية مميزة - قطعة رقم ${i+1}`,
      broken: broken
    });

    // حفظ الملف بعد كل رابط لضمان الأمان
    fs.writeFileSync('nft_metadata_ready.json', JSON.stringify(nftMetadata,null,2),'utf-8');
  }

  console.log('✅ تم إنشاء nft_metadata_ready.json بنجاح!');
}

main().catch(e=>{ console.error(e); process.exit(1); });

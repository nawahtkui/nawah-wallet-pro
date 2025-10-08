import fs from 'fs';

// قراءة الملف النهائي المرتب حسب rarity
const rawData = fs.readFileSync('nft_metadata_enhanced_sorted.json', 'utf-8');
const nftList = JSON.parse(rawData);

// تحويل كل قطعة للعرض داخل المحفظة
const frontendNFTs = nftList.map(nft => ({
  id: nft.id,
  name: nft.name,
  image: nft.image,
  description: nft.description,
  style: nft.attributes.style,
  weight: nft.attributes.weight,
  rarity: nft.attributes.rarity,
  badge: nft.attributes.rarity === 'مميز' ? '🌟' : nft.attributes.rarity === 'نادر' ? '✨' : ''
}));

// حفظ الملف الجاهز للعرض
fs.writeFileSync('nft_frontend.json', JSON.stringify(frontendNFTs, null, 2), 'utf-8');

console.log('✅ تم إنشاء nft_frontend.json بنجاح! جاهز للعرض داخل Nawah Wallet.');

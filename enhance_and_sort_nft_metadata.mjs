import fs from 'fs';

// قراءة الملف الحالي
const rawData = fs.readFileSync('nft_metadata_ready.json', 'utf-8');
const nftList = JSON.parse(rawData);

// دوال توليد خصائص إضافية
const styles = ['كلاسيكي', 'حديث'];
const rarities = ['عادي', 'نادر', 'مميز'];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomWeight() {
  return `${10 + Math.floor(Math.random() * 41)}g`; // بين 10 و50 غرام
}

function enhanceDescription(id, style) {
  return `قطعة فضية رائعة رقم ${id}، مستوحاة من الحرفية النسائية، تجمع بين الأناقة ${style === 'كلاسيكي' ? 'الكلاسيكية' : 'الحديثة'} والطابع الفني الفريد.`;
}

// تحسين كل قطعة مع الخصائص الإضافية
const enhancedNFTs = nftList.map(nft => {
  const style = randomElement(styles);
  const rarity = randomElement(rarities);
  return {
    ...nft,
    description: enhanceDescription(nft.id, style),
    attributes: {
      weight: randomWeight(),
      style,
      rarity
    }
  };
});

// ترتيب القطع حسب rarity: مميز → نادر → عادي
const rarityOrder = { 'مميز': 0, 'نادر': 1, 'عادي': 2 };
enhancedNFTs.sort((a, b) => rarityOrder[a.attributes.rarity] - rarityOrder[b.attributes.rarity]);

// حفظ الملف النهائي
fs.writeFileSync('nft_metadata_enhanced_sorted.json', JSON.stringify(enhancedNFTs, null, 2), 'utf-8');

console.log('✅ تم إنشاء nft_metadata_enhanced_sorted.json بنجاح! القطع مرتبة حسب rarity.');

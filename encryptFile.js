const fs = require('fs');
const sodium = require('libsodium-wrappers');

(async () => {
  await sodium.ready;

  const password = process.env.MASTER_PASS;
  if (!password) { console.error('Set MASTER_PASS env var'); process.exit(1); }

  // اقرأ الملف المراد تشفيره (تغيّر الاسم حسب حاجتك)
  const inputFile = process.argv[2] || 'secrets_plain.json';
  if (!fs.existsSync(inputFile)) {
    console.error('Input file not found:', inputFile);
    process.exit(1);
  }
  const plaintext = fs.readFileSync(inputFile);

  // توليد salt واشتقاق المفتاح
  const salt = sodium.randombytes_buf(16);
  const key = sodium.crypto_pwhash(
    32,
    password,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );

  // توليد nonce وتشفير XChaCha20-Poly1305
  const nonce = sodium.randombytes_buf(sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES);
  const ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, null, null, nonce, key);

  // حفظ الحزمة المشفرة
  const packed = {
    version: 1,
    salt: Buffer.from(salt).toString('hex'),
    nonce: Buffer.from(nonce).toString('hex'),
    ciphertext: Buffer.from(ciphertext).toString('hex'),
    originalFilename: inputFile,
    createdAt: new Date().toISOString()
  };

  const outFile = process.argv[3] || 'vault.enc.json';
  fs.writeFileSync(outFile, JSON.stringify(packed, null, 2), { mode: 0o600 });
  console.log('Encrypted file saved to', outFile);
})();

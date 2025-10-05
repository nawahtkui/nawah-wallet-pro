const fs = require('fs');
const sodium = require('libsodium-wrappers');

(async () => {
  await sodium.ready;

  const password = process.env.MASTER_PASS;
  if (!password) { console.error('Set MASTER_PASS env var'); process.exit(1); }

  const inFile = process.argv[2] || 'vault.enc.json';
  if (!fs.existsSync(inFile)) {
    console.error('Encrypted file not found:', inFile);
    process.exit(1);
  }

  const packed = JSON.parse(fs.readFileSync(inFile, 'utf8'));
  const salt = Buffer.from(packed.salt, 'hex');
  const nonce = Buffer.from(packed.nonce, 'hex');
  const ciphertext = Buffer.from(packed.ciphertext, 'hex');

  const key = sodium.crypto_pwhash(
    32,
    password,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );

  try {
    const plaintext = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, ciphertext, null, nonce, key);
    const outFile = packed.originalFilename || 'secrets_plain_restored.json';
    fs.writeFileSync(outFile, Buffer.from(plaintext), { mode: 0o600 });
    console.log('Decrypted and saved to', outFile);
  } catch (e) {
    console.error('Decryption failed: wrong password or corrupted file.');
    process.exit(1);
  }
})();

# nawah-wallet-pro (demo scaffold)

This repository is a **ready-to-edit scaffold** for Nawah Wallet UI (React + TypeScript + Tailwind).
It contains demo code and mock services so you can run the UI locally and later integrate it
with real Web3 providers (ethers.js, wagmi, viem, WalletConnect, etc) and the NWTK smart contracts.

## Quick start

1. Install dependencies:
   ```
   npm install
   ```

2. Run locally:
   ```
   npm start
   ```

3. Build & deploy to GitHub Pages (configure homepage in package.json):
   ```
   npm run deploy
   ```

## Where to integrate real wallet code

Edit `src/services/nawah-wallet.ts` and replace the stubbed methods with real calls:
- connect to provider (window.ethereum or WalletConnect)
- instantiate contract with ABI + address (ethers.js)
- send transactions and return real tx hashes

## Notes

- The project is intentionally minimal and easy to extend.
- AccountSelector currently uses dummy data; replace it with your Redux selector `getWalletsWithAccounts`
  or pass wallets as props when integrating.

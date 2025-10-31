/**
 * NawahWallet - placeholder service
 *
 * This file simulates wallet actions with dummy data.
 * Replace with real Web3/Ethers/viem calls to integrate with Testnet/Mainnet.
 *
 * Example integration points:
 * - connect to provider (window.ethereum or WalletConnect)
 * - build and send transactions (ethers.js / web3.js)
 * - interact with NWTK smart contract (ABI + contract address)
 */

export const NawahWallet = {
  sendToken: async ({ from, to, amount }: any) => {
    console.log(`[nawah-wallet] sendToken from=${from} to=${to} amount=${amount}`);
    await new Promise((r) => setTimeout(r, 1000));
    return { success: true, txHash: '0xDEMO_SEND_TX' };
  },

  stakeToken: async ({ from, amount }: any) => {
    console.log(`[nawah-wallet] stakeToken from=${from} amount=${amount}`);
    await new Promise((r) => setTimeout(r, 1000));
    return { success: true, txHash: '0xDEMO_STAKE_TX' };
  },

  getNFTs: async (address: string) => {
    return [
      { id: '1', name: 'NFT Alpha', image: 'https://via.placeholder.com/200' },
      { id: '2', name: 'NFT Beta', image: 'https://via.placeholder.com/200' },
    ];
  },

  getTransactionHistory: async (address: string) => {
    return [
      { id: 1, type: 'Send', amount: 10, status: 'Confirmed', hash: '0x1' },
      { id: 2, type: 'Stake', amount: 5, status: 'Pending', hash: '0x2' },
    ];
  }
};

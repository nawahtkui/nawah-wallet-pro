import { ethers } from "ethers";

export const TEST_TNWTK_ADDRESS = "0x1111111111111111111111111111111111111111"; // placeholder

const TEST_TNWTK_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

async function getProvider() {
  if (typeof window === "undefined") return new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
  if (!window.ethereum) throw new Error("MetaMask غير مثبت");
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider;
}

async function getSigner() {
  const provider = await getProvider();
  return provider.getSigner();
}

async function getContract(signerOrProvider?: any) {
  const provider = signerOrProvider ?? (await getSigner());
  return new ethers.Contract(TEST_TNWTK_ADDRESS, TEST_TNWTK_ABI, provider);
}

export const NawahWallet = {
  connect: async (): Promise<string> => {
    if (!window.ethereum) throw new Error("MetaMask غير مثبت");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  },

  getBalance: async (address: string) => {
    const contract = await getContract();
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    return ethers.formatUnits(balance, decimals);
  },

  sendToken: async ({ to, amount }: { to: string; amount: string }) => {
    const signer = await getSigner();
    const contract = await getContract(signer);
    const decimals = await contract.decimals();
    const parsed = ethers.parseUnits(amount, decimals);
    const tx = await contract.transfer(to, parsed);
    await tx.wait();
    return tx.hash;
  },

  getTokenInfo: async () => {
    const contract = await getContract();
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    return { name, symbol, totalSupply: totalSupply.toString() };
  },

  getNFTs: async (_address: string) => [{ id: "1", name: "NFT Alpha", image: "https://via.placeholder.com/200" }],

  getTransactionHistory: async (_address: string) => [{ id: 1, type: "نقل", amount: 10, status: "مؤكد", hash: "0x1" }]
};

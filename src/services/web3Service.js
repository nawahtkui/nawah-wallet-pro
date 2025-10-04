import Web3 from 'web3';

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

const NWTK_CONTRACT_ADDRESS = '0xYourContractAddressHere';
const NWTK_ABI = [ /* ABI الخاص بالعقد */ ];

const contract = new web3.eth.Contract(NWTK_ABI, NWTK_CONTRACT_ADDRESS);

export default {
  async getTransactionHistory() {
    try {
      const latestBlock = await web3.eth.getBlockNumber();
      const txs = [];
      for (let i = latestBlock; i > latestBlock - 10; i--) {
        const block = await web3.eth.getBlock(i, true);
        if (block && block.transactions) {
          block.transactions.forEach(tx => {
            if (tx.to && tx.to.toLowerCase() === NWTK_CONTRACT_ADDRESS.toLowerCase()) {
              txs.push(tx);
            }
          });
        }
      }
      return txs;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  async sendTransaction(from, to, amount, privateKey) {
    console.log(`Sending ${amount} NWTK from ${from} to ${to}`);
  },

  async getBalance(address) {
    try {
      const balance = await contract.methods.balanceOf(address).call();
      return web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  },
};

import React, { useState } from 'react';
import { NawahWallet } from '../services/nawah-wallet';

const StakingPanel = ({ selectedAddress }: any) => {
  const [amount, setAmount] = useState<number | ''>('');
  const [status, setStatus] = useState('');

  const handleStake = async () => {
    if (!selectedAddress || !amount) {
      setStatus('Fill all fields correctly.');
      return;
    }
    setStatus('Staking...');
    const res = await NawahWallet.stakeToken({ from: selectedAddress, amount });
    setStatus(res.success ? `Staked: ${res.txHash}` : 'Failed');
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-medium">Staking</h3>
      <input className="w-full border rounded px-3 py-2 my-2" placeholder="Amount to stake" value={String(amount)} onChange={e => setAmount(Number(e.target.value) || '')} />
      <button className="bg-green-600 text-white px-3 py-2 rounded" onClick={handleStake}>Stake</button>
      {status && <div className="text-sm text-gray-600 mt-2">{status}</div>}
    </div>
  );
};

export default StakingPanel;

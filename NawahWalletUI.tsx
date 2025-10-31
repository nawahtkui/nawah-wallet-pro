import React, { useState } from 'react';
import AccountSelector from './AccountSelector';
import SendPanel from './SendPanel';
import StakingPanel from './StakingPanel';
import NFTDashboard from './NFTDashboard';
import TransactionHistory from './TransactionHistory';

const NawahWalletUI = () => {
  const [selectedAddress, setSelectedAddress] = useState('');

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
      <h1 className="text-xl font-semibold mb-4">Nawah Wallet (Demo)</h1>

      <AccountSelector
        label="Select Account"
        modalTitle="Choose Account"
        impactedWalletAddress={selectedAddress}
        onAccountSelect={setSelectedAddress}
      />

      <div className="mt-4">
        <div className="text-sm text-gray-600">Selected: {selectedAddress || '—'}</div>
      </div>

      <SendPanel selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
      <StakingPanel selectedAddress={selectedAddress} />
      <NFTDashboard selectedAddress={selectedAddress} />
      <TransactionHistory selectedAddress={selectedAddress} />
    </div>
  );
};

export default NawahWalletUI;

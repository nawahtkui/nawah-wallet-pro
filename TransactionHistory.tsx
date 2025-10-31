import React, { useEffect, useState } from 'react';
import { NawahWallet } from '../services/nawah-wallet';

const TransactionHistory = ({ selectedAddress }: any) => {
  const [txs, setTxs] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedAddress) return;
    NawahWallet.getTransactionHistory(selectedAddress).then(setTxs);
  }, [selectedAddress]);

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-medium">Transaction History</h3>
      <div className="mt-2">
        {txs.map(tx => (
          <div key={tx.id} className="flex justify-between px-3 py-2 border rounded my-1">
            <div>{tx.type}</div>
            <div className="text-sm text-gray-600">{tx.amount} NWTK - {tx.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;

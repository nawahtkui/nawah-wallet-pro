import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NawahWallet } from '../services/nawah-wallet';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  hash: string;
}

interface TransactionHistoryProps {
  selectedAddress: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ selectedAddress }) => {
  const { t } = useTranslation();
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!selectedAddress) return;
    NawahWallet.getTransactionHistory(selectedAddress).then(setHistory);
  }, [selectedAddress]);

  if (!selectedAddress) return null;

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">{t('history')}</h2>
      <ul className="space-y-2">
        {history.map((tx) => (
          <li key={tx.id} className="p-2 bg-gray-800 rounded flex justify-between">
            <span>{tx.type}: {tx.amount}</span>
            <span className={tx.status === 'مؤكد' ? 'text-green-400' : 'text-red-400'}>
              {tx.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;

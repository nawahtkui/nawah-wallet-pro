import React, { useState } from 'react';
import { NawahWallet } from '../services/nawah-wallet';

const SendPanel = ({ selectedAddress, setSelectedAddress }: any) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    if (!selectedAddress || !recipient || !amount) {
      setStatus('Fill all fields correctly.');
      return;
    }
    setStatus('Sending...');
    const res = await NawahWallet.sendToken({ from: selectedAddress, to: recipient, amount });
    setStatus(res.success ? `Success: ${res.txHash}` : 'Failed');
  };

  return (
    <div className="mt-4">
      <h3 className="font-medium">Send NWTK</h3>
      <input className="w-full border rounded px-3 py-2 my-2" placeholder="Recipient address" value={recipient} onChange={e => setRecipient(e.target.value)} />
      <input className="w-full border rounded px-3 py-2 my-2" placeholder="Amount" value={String(amount)} onChange={e => setAmount(Number(e.target.value) || '')} />
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-3 py-2 rounded" onClick={handleSend}>Send</button>
      </div>
      {status && <div className="text-sm text-gray-600 mt-2">{status}</div>}
    </div>
  );
};

export default SendPanel;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NawahWallet } from '../services/nawah-wallet';

interface SendPanelProps {
  selectedAddress: string;
  setSelectedAddress: (addr: string) => void;
}

const SendPanel: React.FC<SendPanelProps> = ({ selectedAddress }) => {
  const { t } = useTranslation();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    if (!selectedAddress) {
      alert(t('connect_wallet'));
      return;
    }
    try {
      setStatus('pending');
      const txHash = await NawahWallet.sendToken({ to: recipient, amount });
      setStatus('success');
      alert(`${t('transaction_sent')} (Hash: ${txHash})`);
    } catch (err: any) {
      setStatus('failed');
      alert(`${t('transaction_failed')}: ${err.message || err}`);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">{t('send_token')}</h2>
      <input
        type="text"
        placeholder={t('recipient_address')}
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
      />
      <input
        type="number"
        placeholder={t('amount')}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
      />
      <button
        onClick={handleSend}
        className="btn-gold w-full py-2 rounded mt-2"
      >
        {t('send')}
      </button>
      {status && (
        <p className="mt-2 text-sm">
          {status === 'pending' && '...جاري الإرسال / Sending...'}
          {status === 'success' && '✅ تم الإرسال / Sent'}
          {status === 'failed' && '❌ فشل الإرسال / Failed'}
        </p>
      )}
    </div>
  );
};

export default SendPanel;

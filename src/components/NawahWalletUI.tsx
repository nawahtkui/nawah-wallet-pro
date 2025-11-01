import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NawahWallet } from '../services/nawah-wallet';
import AccountSelector from './AccountSelector';
import SendPanel from './SendPanel';

const NawahWalletUI: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    if (!selectedAddress) return;
    NawahWallet.getBalance(selectedAddress).then(b => setBalance(b)).catch(() => setBalance('0'));
  }, [selectedAddress]);

  const handleConnect = async () => {
    try {
      const addr = await NawahWallet.connect();
      setSelectedAddress(addr);
      setConnected(true);
    } catch (err: any) {
      alert(err.message || 'فشل الاتصال بالمحفظة');
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', newLang);
  };

  return (
    <div className="app-card p-6 rounded-lg">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--nawah-gold)' }}>{t('wallet_name')}</h1>
          <p className="text-muted">{t('wallet_subtitle')}</p>
        </div>
        <button onClick={toggleLanguage} className="btn-gold px-3 py-1 rounded text-sm">
          {i18n.language === 'ar' ? 'EN' : 'عربي'}
        </button>
      </header>

      <AccountSelector
        label={t('select_account')}
        modalTitle={t('select_account')}
        impactedWalletAddress={selectedAddress}
        onAccountSelect={(addr) => setSelectedAddress(addr)}
      />

      <SendPanel selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
    </div>
  );
};

export default NawahWalletUI;

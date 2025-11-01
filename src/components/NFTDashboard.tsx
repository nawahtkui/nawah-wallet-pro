import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NawahWallet } from '../services/nawah-wallet';

interface NFT {
  id: string;
  name: string;
  image: string;
}

interface NFTDashboardProps {
  selectedAddress: string;
}

const NFTDashboard: React.FC<NFTDashboardProps> = ({ selectedAddress }) => {
  const { t } = useTranslation();
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    if (!selectedAddress) return;
    NawahWallet.getNFTs(selectedAddress).then(setNfts);
  }, [selectedAddress]);

  if (!selectedAddress) return null;

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">{t('nfts')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nfts.map((nft) => (
          <div key={nft.id} className="bg-gray-800 rounded overflow-hidden">
            <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover" />
            <p className="p-2 text-center">{nft.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTDashboard;

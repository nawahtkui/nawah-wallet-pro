import React, { useEffect, useState } from 'react';
import { NawahWallet } from '../services/nawah-wallet';

const NFTDashboard = ({ selectedAddress }: any) => {
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedAddress) return;
    NawahWallet.getNFTs(selectedAddress).then(setNfts);
  }, [selectedAddress]);

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-medium">NFTs</h3>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {nfts.map(n => (
          <div key={n.id} className="border rounded p-2">
            <img src={n.image} alt={n.name} className="w-full h-36 object-cover rounded" />
            <div className="mt-2 font-medium">{n.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTDashboard;

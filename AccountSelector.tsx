import React, { useMemo, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

/**
 * AccountSelector (lightweight)
 *
 * This component is intentionally simplified for the demo scaffold.
 * It expects wallets data from parent via props or can be connected to Redux.
 *
 * Replace the dummy 'wallets' constant with a selector getWalletsWithAccounts when integrating.
 */

export interface Account {
  id: string;
  name: string;
  address: string;
  seedIcon?: string;
}

export interface AccountSelectorProps {
  label?: string;
  modalTitle?: string;
  impactedWalletAddress?: string;
  onAccountSelect: (address: string) => void;
  searchTerm?: string;
}

const dummyWallets = [
  {
    name: 'Nawah Main',
    accounts: [
      { id: 'a1', name: 'Main Account', address: '0xAaAa...1111', seedIcon: '' },
      { id: 'a2', name: 'Savings', address: '0xBbBb...2222', seedIcon: '' },
    ]
  },
  {
    name: 'Nawah Mobile',
    accounts: [
      { id: 'a3', name: 'Mobile Acc 1', address: '0xCcCc...3333', seedIcon: '' }
    ]
  }
];

const AccountSelector: React.FC<AccountSelectorProps> = ({
  label = 'Account',
  modalTitle = 'Choose Account',
  impactedWalletAddress,
  onAccountSelect,
  searchTerm = ''
}) => {
  const [open, setOpen] = useState(false);

  // In real integration replace with selector data
  const wallets = dummyWallets;

  const filtered = useMemo(() => {
    if (!searchTerm) return wallets;
    const term = searchTerm.toLowerCase();
    return wallets.map(w => ({
      ...w,
      accounts: w.accounts.filter((a: Account) =>
        a.name.toLowerCase().includes(term) || a.address.toLowerCase().includes(term)
      )
    })).filter(w => w.accounts.length > 0);
  }, [wallets, searchTerm]);

  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>
      <div className="w-full border rounded p-3 flex items-center justify-between cursor-pointer" onClick={() => setOpen(true)}>
        <div>{impactedWalletAddress || <span className="text-gray-400">{modalTitle}</span>}</div>
        <div>▼</div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex items-start justify-center p-4">
          <div className="bg-white w-full max-w-md rounded shadow-lg overflow-auto max-h-[80vh]">
            <div className="flex items-center justify-between p-4 border-b">
              <strong>{modalTitle}</strong>
              <button onClick={() => setOpen(false)}>Close</button>
            </div>

            <div>
              {filtered.map((w) => (
                <div key={w.name}>
                  <div className="px-4 py-2 text-sm text-gray-500">{w.name}</div>
                  {w.accounts.map((acc: Account) => (
                    <button
                      key={acc.id}
                      className={classnames('w-full text-left px-4 py-3 hover:bg-gray-50', {
                        'bg-blue-50': acc.address === impactedWalletAddress
                      })}
                      onClick={() => { onAccountSelect(acc.address); setOpen(false); }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                        <div>
                          <div className="font-medium">{acc.name}</div>
                          <div className="text-xs text-gray-500">{acc.address}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSelector;

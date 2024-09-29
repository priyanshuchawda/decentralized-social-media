import { useState, useEffect } from 'react';
import { connectWallet } from '@/utils/ethereum';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    const addr = await connectWallet();
    setAddress(addr);
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      }
    };

    checkConnection();
  }, []);

  return { address, connect };
}
import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';

const Navbar: React.FC = () => {
  const { address, connect } = useWallet();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Decentralized Social
        </Link>
        <div>
          <Link href="/profile" className="text-white mr-4">
            Profile
          </Link>
          {address ? (
            <span className="text-white">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          ) : (
            <button onClick={connect} className="bg-white text-blue-500 px-4 py-2 rounded">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
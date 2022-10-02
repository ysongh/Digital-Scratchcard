import React from 'react';
import {
  ConnectButton
} from '@rainbow-me/rainbowkit';

function Navbar() {
  return (
    <nav className="relative container mx-auto p-3">
      <div className="flex items-center justify-between">
        <div>
          <a className='mr-3' href="/">Digital Scratchcard</a>
          <a href="/">Home</a>
        </div>
        
        <div className="flex">
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
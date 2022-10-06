import React from 'react';
import { Link } from 'react-router-dom';
import {
  ConnectButton
} from '@rainbow-me/rainbowkit';

function Navbar() {
  return (
    <nav className="relative container mx-auto p-3">
      <div className="flex items-center justify-between">
        <div>
          <Link className='mr-3' to="/">Digital Scratchcard</Link>
          <Link className='mr-3' to="/">Home</Link>
          <Link to="/scratchcard">Scratch Card</Link>
        </div>
        
        <div className="flex">
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
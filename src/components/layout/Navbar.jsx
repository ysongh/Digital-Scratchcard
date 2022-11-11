import React from 'react';
import { Link } from 'react-router-dom';
import {
  ConnectButton
} from '@rainbow-me/rainbowkit';

import Logo from '../../assets/Logo.png'

function Navbar() {
  return (
    <nav className="relative bg-navbar px-2 md:px-20 py-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link className='mr-10' to="/">
              <img className='logo' src={Logo} alt="logo" />
            </Link>
            <Link className='mr-3' to="/">Home</Link>
            <Link className='mr-3' to="/add-advertisement">Add Advertisement</Link>
            <Link to="/scratchcard">Scratch Card</Link>
          </div>
          
          <div className="flex">
            <ConnectButton />
          </div>
        </div>
      </div>
    
    </nav>
  )
}

export default Navbar;
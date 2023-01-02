import React from 'react';
import Logo from '../../assets/Logo.png'

function Footer() {
  return (
    <nav className="relative bg-navbar px-2 py-7">
      <div className="container mx-auto">
        <p className="text-center">
          Copyright &copy;{new Date().getFullYear()} Digital Scratchcard
        </p>
      </div>
    
    </nav>
  )
}

export default Footer;
import React, { useState } from 'react';
import { useContractRead } from 'wagmi';

import ScratchCard from '../components/ScratchCard';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract-config';

function ScratchCards() {
  const [numbers, setNumbers] = useState([]);
  useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'fillScratchCard',
    onSuccess(data) {
      console.log('Success', data);
      setNumbers(data);
    },
    onError(error) {
      console.error('Error', error);
    },
  });

  return (
    <div className="container mx-auto bg-slate-50" style={{ height: "80vh"}}>
      <h1 className='text-3xl text-center'>Digital Scratchcard</h1>
      <div className="flex justify-content-center mx-auto mt-5" style={{ maxWidth: "800px" }}>
        <div className="w-4/12">
          <ScratchCard image={numbers[0]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={numbers[1]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={numbers[2]} />
        </div>
      </div>
      <div className="flex justify-content-center mx-auto" style={{ marginTop: '10rem', maxWidth: "800px"}}>
        <div className="w-4/12">
          <ScratchCard image={numbers[3]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={numbers[4]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={numbers[5]} />
        </div>
      </div>
      <div className="flex justify-content-center mx-auto" style={{ marginTop: '10rem', maxWidth: "800px"}}>
        <div className="w-4/12">
          <ScratchCard image={numbers[6]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={numbers[7]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={numbers[8]} />
        </div>
      </div>
    </div>
  )
}

export default ScratchCards;
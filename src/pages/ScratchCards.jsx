import React from 'react';
import { useContractRead } from 'wagmi';

import ScratchCard from '../components/ScratchCard';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract-config';

const images = [
  "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hhcGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1551907234-4f794b152738?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506463108611-88834e9f6169?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
]

function ScratchCards() {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'fillScratchCard',
    onSuccess(data) {
      console.log('Success', data)
    },
    onError(error) {
      console.error('Error', error)
    },
  });

  return (
    <div className="container mx-auto bg-slate-50" style={{ height: "80vh"}}>
      <h1 className='text-3xl text-center'>Digital Scratchcard</h1>
      <div className="flex justify-content-center mx-auto mt-5" style={{ maxWidth: "800px" }}>
        <div className="w-4/12">
          <ScratchCard image={images[0]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={images[2]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={images[1]} />
        </div>
      </div>
      <div className="flex justify-content-center mx-auto" style={{ marginTop: '10rem', maxWidth: "800px"}}>
        <div className="w-4/12">
          <ScratchCard image={images[0]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={images[2]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={images[1]} />
        </div>
      </div>
      <div className="flex justify-content-center mx-auto" style={{ marginTop: '10rem', maxWidth: "800px"}}>
        <div className="w-4/12">
          <ScratchCard image={images[0]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={images[2]} />
        </div>
        <div className="w-4/12">
          <ScratchCard image={images[1]} />
        </div>
      </div>
    </div>
  )
}

export default ScratchCards;
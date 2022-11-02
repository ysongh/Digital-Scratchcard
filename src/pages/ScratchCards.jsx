import React, { useState } from 'react';
import { useAccount, useContractEvent, useContractWrite, usePrepareContractWrite } from 'wagmi';

import ScratchCard from '../components/ScratchCard';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract-config';

function ScratchCards() {
  const { isConnected } = useAccount();

  const [numbers, setNumbers] = useState([]);
  const [isMatch, setIsMatch] = useState("");
  const [showCard, setShowCard] = useState(false);

  useContractEvent({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    eventName: 'CardResult',
    listener(node) {
      console.log(node);
      setNumbers(node[1]);
      setShowCard(true);
      if(node[2])setTimeout(setIsMatch("You Win!"), 10000);
      if(!node[2])setTimeout(setIsMatch("No Match, Try Again!"), 10000);
    },
  })

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'playGame',
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(data, isSuccess)

  return (
    <div className="container mx-auto bg-slate-50" style={{ height: "80vh"}}>
      <h1 className='text-3xl text-center mt-1'>Matches 3 images to win a piece of the prize pool</h1>
      <center>
        {isConnected && <button className='py-2 px-4 mb-1 mt-3 text-white bg-blue-600 rounded baseline hover:bg-blue-400' onClick={() => write?.()}>
          Play Scratch Card
        </button>}
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </center>
      
      <p className="text-xl text-center mt-3" >{isMatch}</p>
      {showCard && <>
        <div className="flex justify-content-center mx-auto mt-4" style={{ maxWidth: "800px" }}>
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
      </>}
    </div>
  )
}

export default ScratchCards;
import React, { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract-config';

function AddAdvertisement() {
  const { isConnected } = useAccount();

  const [url, setURL] = useState("");

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'addImage',
    args: [url],
    overrides: {
      value: ethers.utils.parseEther('0.001'),
    },
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(data, isLoading, isSuccess, write);

  return (
    <div className='relative container mx-auto'>
      <h1 className='text-2xl mt-3'>Add Your Advertisement</h1>
      <div className='mt-3' style={{ maxWidth: '600px'}}>
        <label htmlFor='url' className='block font-medium text-gray-700'>URL of the Image</label>
        <input className='w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm' id='url' onChange={(e) => setURL(e.target.value)}/>

        {isConnected && <button className='py-2 px-4 mt-3 text-white bg-blue-600 rounded baseline hover:bg-blue-400' onClick={() => write?.()}>
          Create
        </button>}
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    </div>
  )
}

export default AddAdvertisement;
import React, { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract-config';

function AddAdvertisement() {
  const { isConnected } = useAccount();

  const [url, setURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'addImage',
    args: [url],
    overrides: {
      value: ethers.utils.parseEther('0'),
    },
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(data, isLoading, isSuccess, write);

  async function handleUpload(event) {
    const image = event.target.files[0];
    console.log(image);
    setImageFile(image);
  }

  return (
    <div className='relative container mx-auto'>
      <h1 className='text-2xl mt-3'>Add Your Advertisement</h1>
      <div className='mt-3' style={{ maxWidth: '600px'}}>
        <label className="block mb-2">
          <span className="sr-only">Choose profile photo</span>
          <input type="file" id="userPhoto" onChange={handleUpload} className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
          "/>
        </label>
        <div className="shrink-0">
          {imageFile && <img className="object-cover" src={URL.createObjectURL(imageFile)} alt="Current profile photo" /> }
        </div>

        <p className='text-slate-500'>* 1 Trust EVM Tokens for 5 days of Advertisement on Scratch Card</p>
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
import React, { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage';

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract-config';
import { WEB3STORAGE_APIKEY } from '../config'
const client = new Web3Storage({ token: WEB3STORAGE_APIKEY });

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

    const cid = await client.put([image], {
      onRootCidReady: localCid => {
        console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
        console.log('> 📡 sending files to web3.storage ')
      },
      onStoredChunk: bytes => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
    })

    console.log(`https://dweb.link/ipfs/${cid}/${image.name}`);
    setURL(`https://dweb.link/ipfs/${cid}/${image.name}`);
  }

  return (
    <div className="mx-auto px-2 md:px-20">
      <h1 className='text-2xl font-semibold mt-5'>Add Your Advertisement</h1>
      <div className='mt-3' style={{ maxWidth: '600px'}}>
        <label className="block mb-2">
          <span className="sr-only">Choose profile photo</span>
          <input type="file" id="userPhoto" onChange={handleUpload} className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            file:cursor-pointer
            cursor-pointer
            hover:file:bg-violet-100
          "/>
        </label>
        <p>{url}</p>
        <div className="shrink-0">
          {imageFile && <img className='advertisement-img mt-4 mb-3' src={URL.createObjectURL(imageFile)} alt="Current profile photo" /> }
        </div>

        <p className='text-slate-500'>* 1 MATIC Token for 5 days of Advertisement on Scratch Card</p>
        {isConnected && <button className='py-2 px-4 mt-3 bg-secondarycolor rounded baseline hover:bg-secondarycolorhover disabled:opacity-50' onClick={() => write?.()} disabled={isLoading || !url}>
          Create
        </button>}
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    </div>
  )
}

export default AddAdvertisement;
import React from 'react';

function AddAdvertisement() {
  return (
    <div className='relative container mx-auto'>
      <h1 className='text-2xl mt-3'>Add Your Advertisement</h1>
      <div className='mt-3' style={{ maxWidth: '600px'}}>
        <label htmlFor='url' className='block font-medium text-gray-700'>URL of the Image</label>
        <input className='w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm' id='url' onChange={(e) => setCardURL(e.target.value)}/>

        <button className='py-2 px-4 mt-3 text-white bg-blue-600 rounded baseline hover:bg-blue-400'>
          Create
        </button>
      </div>
    </div>
  )
}

export default AddAdvertisement;
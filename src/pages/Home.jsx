import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto px-2 md:px-20">
      <div className="md:grid grid-cols-2 gap-4 p-2 md:p-0">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mt-20 mb-4">Digital Scratch Card</h1>
          <p className="text-lg md:text-xl text-grey mb-4">Free 1 play per day and match 3 to win.</p>
          <button className="py-2 px-4 mt-3 mr-3 text-white bg-primarycolor rounded baseline hover:bg-primarycolorhover" onClick={() => navigate('/scratchcard')}>
            Play Card
          </button>
          <button className="py-2 px-4 mt-3 bg-secondarycolor rounded baseline hover:bg-secondarycolorhover" onClick={() => navigate('/add-advertisement')}>
            Add Advertisement
          </button>
        </div>

        <div className="col-12 col-md-6">
          <img
            className="img-fluid"
            src="/hero-img.jpeg"
            alt="Hero" />
        </div>
      </div>
    </div>
  )
}

export default Home;
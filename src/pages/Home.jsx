import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-4xl font-bold mt-20 mb-4">Digital Scratch Card</h1>
          <p className="text-md mb-4">Free 1 play per day and match 3 to win.</p>
          <button className="py-2 px-4 mt-3 mr-3 text-white bg-blue-600 rounded baseline hover:bg-blue-400" onClick={() => navigate('/scratchcard')}>
            Play Card
          </button>
          <button className="py-2 px-4 mt-3 text-white bg-blue-600 rounded baseline hover:bg-blue-400" onClick={() => navigate('/add-advertisement')}>
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
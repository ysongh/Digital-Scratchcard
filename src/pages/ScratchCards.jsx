import React from 'react';
import ScratchCard from '../components/ScratchCard';

const images = [
  "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hhcGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1551907234-4f794b152738?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506463108611-88834e9f6169?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHNoYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
]

function ScratchCards() {
  return (
    <div className="container bg-light" style={{ height: "90vh"}}>
      <h1>Digital Scratchcard</h1>
      <div className="row justify-content-center mt-3">
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[0]} />
        </div>
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[2]} />
        </div>
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[1]} />
        </div>
      </div>
      <div className="row justify-content-center" style={{ marginTop: '10rem'}}>
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[0]} />
        </div>
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[2]} />
        </div>
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[1]} />
        </div>
      </div>
      <div className="row justify-content-center" style={{ marginTop: '10rem'}}>
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[0]} />
        </div>
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[2]} />
        </div>
        <div className="col-sm-4 col-lg-2">
          <ScratchCard image={images[1]} />
        </div>
      </div>
    </div>
  )
}

export default ScratchCards;
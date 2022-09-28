import { useState } from 'react';
import './App.css';

import ScratchCards from './pages/ScratchCards';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ScratchCards />
    </div>
  )
}

export default App;

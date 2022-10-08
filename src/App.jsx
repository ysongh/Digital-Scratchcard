import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import Navbar from './components/layout/Navbar';
import ScratchCards from './pages/ScratchCards';
import { ALCHEMY_ID } from './config';

const { chains, provider } = configureChains(
  [chain.goerli, chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {
  const [count, setCount] = useState(0)

  console.log(wagmiClient)

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route
              path="/scratchcard"
              element={
                <ScratchCards />} />
            <Route
              path="/"
              element={
                <h1>Home</h1>} />
          </Routes>
        </HashRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App;

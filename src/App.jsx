import { HashRouter, Route, Routes } from 'react-router-dom';
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
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScratchCards from './pages/ScratchCards';
import AddAdvertisement from './pages/AddAdvertisement';
import { ALCHEMY_ID } from './config';
import { TrustEVMTestnet } from './chain'

const { chains, provider } = configureChains(
  [TrustEVMTestnet, chain.goerli, chain.polygonMumbai],
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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <HashRouter>
          <Navbar />
          <div style={{ minHeight: '80vh'}}>
            <Routes>
              <Route
                path="/add-advertisement"
                element={
                  <AddAdvertisement />} />
              <Route
                path="/scratchcard"
                element={
                  <ScratchCards />} />
              <Route
                path="/"
                element={
                  <Home /> } />
            </Routes>
          </div>
          <Footer />
        </HashRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App;

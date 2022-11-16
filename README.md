# Digital Scratchcard
A digital scratch card Dapp. Once per day, users can scratch their digital scratch card for a chance to win the prize pool. Digital scratch card contains 9 random images of advertisements (3 by 3 grid). If the user matches 3 images, they win a piece of the prize pool.

Companies or small businesses can upload their advertisement which will be stored on the digital scratch card and pay EVM tokens to keep their advertisement for some time. EVM tokens will go to the prize pool.

- It uses web3.Storage to store advertisement images in IPFS. The CID of the stored image is store on the contract.
- Example use of IPFS (https://github.com/ysongh/Digital-Scratchcard/blob/SocialHour/src/pages/AddAdvertisement.jsx#L28)
- Working demo (https://digitalscratchcard.netlify.app/)

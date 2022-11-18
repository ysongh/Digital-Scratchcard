// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Scratchcard is VRFConsumerBase {
    uint public imageTotal = 0;
    string[] public images;

    uint public numberOfPlays = 0;
    mapping(address => uint) public cooldown;
    mapping (uint => PlayerCard) cardlist;

    uint immutable COOLDOWN_TIME = 3;

    event CardResult(address player, string[] imageURLs, bool isMatch);
    event RequestFulfilled(bytes32 requestId, uint256 randomness);

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomNumber;

    struct PlayerCard {
        uint id;
        mapping(string => uint) sameImageCount;
    }

    constructor()
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB // LINK Token
        )
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.0001 LINK (Varies by network)
    }

    function addImage(string memory _imageURL) external payable {
        images.push(_imageURL);
        imageTotal++;
    }

    function playGame() external{
        require(cooldown[msg.sender] < block.timestamp, "Try again later");
        cooldown[msg.sender] = block.timestamp + COOLDOWN_TIME;

        string[] memory imageURLs = fillScratchCard();
        numberOfPlays += 1;

        bool isWinner = checkForMatching(imageURLs);

        getRandomNumber();

        emit CardResult(msg.sender, imageURLs, isWinner);
    }

    function fillScratchCard() internal view returns (string[] memory) {
        string[] memory imageURLs = new string[](9);

        for(uint i = 0; i < 9; i++){
            uint _randomNumber = uint(keccak256(abi.encode(block.timestamp, block.difficulty, msg.sender, i, randomNumber))) % imageTotal;
            imageURLs[i] = images[_randomNumber];
        }

        return imageURLs;
    }

    function checkForMatching(string[] memory imageURLs) internal returns (bool) {
        PlayerCard storage currentCard = cardlist[numberOfPlays];
        currentCard.id = numberOfPlays;

        for(uint i = 0; i < 9; i++){
            currentCard.sameImageCount[imageURLs[i]] += 1;
            if(currentCard.sameImageCount[imageURLs[i]] == 3) return true;
        }

        return false;
    }

    function getPrizePool() external view returns (uint) {
        return address(this).balance;
    }

    function getAdvertisement() external view returns (string[] memory) {
        return images;
    }

     /**
     * Requests randomness
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(
        bytes32 requestId,
        uint256 randomness
    ) internal override {
        randomNumber = randomness;
        emit RequestFulfilled(requestId, randomness);
    }

    // WARMING: Remove this on production
    function withdrawETH() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}
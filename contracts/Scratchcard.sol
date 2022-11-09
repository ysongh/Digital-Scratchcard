// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Scratchcard {
    uint public imageTotal = 0;
    mapping(uint => string) public imageList;
    string[] public images;

    uint public numberOfPlays = 0;
    mapping(address => uint) public cooldown;
    mapping (uint => PlayerCard) cardlist;

    uint immutable COOLDOWN_TIME = 3;

    event CardResult(address player, string[] imageURLs, bool isMatch);

    struct PlayerCard {
        uint id;
        mapping(string => uint) sameImageCount;
    }

    function addImage(string memory _imageURL) external payable {
        imageList[imageTotal] = _imageURL;
        images.push(_imageURL);
        imageTotal++;
    }

    function playGame() external{
        require(cooldown[msg.sender] < block.timestamp, "Try again later");
        cooldown[msg.sender] = block.timestamp + COOLDOWN_TIME;

        string[] memory imageURLs = fillScratchCard();
        numberOfPlays += 1;

        bool isWinner = checkForMatching(imageURLs);

        emit CardResult(msg.sender, imageURLs, isWinner);
    }

    function fillScratchCard() internal view returns (string[] memory) {
        string[] memory imageURLs = new string[](9);

        for(uint i = 0; i < 9; i++){
            uint _randomNumber = uint(keccak256(abi.encode(block.timestamp, block.difficulty, msg.sender, i))) % imageTotal;
            imageURLs[i] = imageList[_randomNumber];
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

    // WARMING: Remove this on production
    function withdrawETH() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}
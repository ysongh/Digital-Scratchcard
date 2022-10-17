// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Scratchcard {
    uint public imageTotal = 0;
    mapping(uint => string) public imageList;

    function addImage(string memory _imageURL) external payable {
        imageList[imageTotal] = _imageURL;
        imageTotal++;
    }

    function fillScratchCard() external view returns (uint256[] memory) {
        uint256[] memory numbers = new uint256[](9);

        for(uint i = 0; i < 9; i++){
            uint256 _randomNumber = uint256(keccak256(abi.encode(block.timestamp, block.difficulty, msg.sender, i))) % imageTotal + 1;
            numbers[i] =_randomNumber;
        }

        return numbers;
    }

    function getPrizePool() external view returns (uint) {
        return address(this).balance;
    }

    // WARMING: Remove this on production
    function withdrawETH() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}
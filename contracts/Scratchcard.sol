// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Scratchcard {
    function fillScratchCard() external view returns (uint256[] memory) {
        uint256[] memory numbers = new uint256[](9);

        for(uint i = 0; i < 9; i++){
            uint256 _randomNumber = uint256(keccak256(abi.encode(block.timestamp, block.difficulty, msg.sender, i))) % 8 + 1;        // 1 - 8
            numbers[i] =_randomNumber;
        }

        return numbers;
    }
}
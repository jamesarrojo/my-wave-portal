// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SendLove {
    // initialized to 0, this variable is special because it's called a "state variable" and it's cool because it's stored permanently in contract storage
    uint256 totalHearts;

    uint256 private seed;

    event NewHeart(address indexed from, uint256 timestamp, string message);

    struct Love {
        address loveSender;
        string message;
        uint256 timestamp;
    }

    Love[] hearts;

    mapping(address => uint256) public lastSendLoveAt;

    constructor() payable {
        console.log("We have been constructed!");

        // set the initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function sendLove(string memory _message) public {
        // make sure timestamp is at least 15-minutes bigger than the last timestamp stored
        require(
            lastSendLoveAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        // update current timestamp we have for the user
        lastSendLoveAt[msg.sender] = block.timestamp;

        totalHearts += 1;
        console.log("%s has sent you a heart!", msg.sender); // This is the wallet address of the person who called the function. With this, we know who called the function, because in order to call a function in a smart contract, you need to be connected to a wallet.

        hearts.push(Love(msg.sender, _message, block.timestamp));

        // generate a new seed for the next user that sends a wave
        seed = (block.difficulty + block.timestamp + seed) % 100;

        // give 50% chance that the user wins the prize
        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewHeart(msg.sender, block.timestamp, _message);
    }

    function getAllHearts() public view returns (Love[] memory) {
        return hearts;
    }

    function getTotalHearts() public view returns (uint256) {
        return totalHearts;
    }
}

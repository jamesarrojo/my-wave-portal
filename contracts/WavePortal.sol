// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SendLove {
    // initialized to 0, this variable is special because it's called a "state variable" and it's cool because it's stored permanently in contract storage
    uint256 totalHearts;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function sendLove() public {
        totalHearts += 1;
        console.log("%s has sent you a heart!", msg.sender); // This is the wallet address of the person who called the function. With this, we know who called the function, because in order to call a function in a smart contract, you need to be connected to a wallet.
    }

    function getTotalHearts() public view returns (uint256) {
        console.log("We have %d total hearts!", totalHearts);
        return totalHearts;
    }
}

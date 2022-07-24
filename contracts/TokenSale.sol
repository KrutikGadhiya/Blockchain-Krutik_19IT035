// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./Krutik_19IT035.sol";

contract TokenSale {
    address admin;
    Krutik_19IT035 public tokenContract;
    uint256 public tokenPrice;

    constructor(Krutik_19IT035 _tokenContract, uint256 _tokenPrice) {
        // Assign an admin
        admin = msg.sender;
        // Token Contract
        tokenContract = _tokenContract;
        // Token Price
        tokenPrice = _tokenPrice;
    }
}

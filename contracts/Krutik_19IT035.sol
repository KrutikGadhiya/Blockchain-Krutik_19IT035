// SPDX-License-Identifier: MiT

pragma solidity ^0.8.10;

contract Krutik_19IT035 {
    uint256 public totalSupply;
    string public name = "Krutik_19IT035"; // token name
    string public standard = "Krutik_19IT035 v1.0"; // token standard
    string public symbol = "KG35"; // token symbol
    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // consrtuctor to initialize supply with iniialSupply
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;

        // allocate initial supply
        balanceOf[msg.sender] = _initialSupply;
    }

    // transfer function
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // Exception if account doesn't have enough
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        // transfer event
        emit Transfer(msg.sender, _to, _value);

        // Returns a boolean
        return true;
    }
}

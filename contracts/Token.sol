// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "hardhat/console.sol";

contract Token {
    string public name = "MonkeyToken";
    string public symbol = "MT";
    uint public TotalSupply = 100;
    address public owner;

    mapping(address => uint) balance;

    constructor() {
        balance[msg.sender] = TotalSupply;
        owner = msg.sender;
    }

    function transferToken(address receiver, uint amount) public {
        console.log("**Initial Sender balance", balance[msg.sender]);
        require(balance[msg.sender] >= amount, "No sufficient balance");

        console.log("**[%s -> %s] tokens: %s", msg.sender, receiver, amount);
        balance[msg.sender] -= amount;
        balance[receiver] += amount;

        console.log("**Final Sender balance", balance[msg.sender]);
    }

    function checkBalance(address account) public view returns (uint) {
        return balance[account];
    }
}

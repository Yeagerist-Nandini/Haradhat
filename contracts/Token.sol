// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/hardhat/console.sol";

contract Token{
    string public name="HardHat Token";
    string public symbol="HHT";
    uint public totalSupply=10000;
    address public owner;
    mapping(address=>uint) balance;

    constructor(){
        owner=msg.sender;
        balance[msg.sender]=totalSupply;
    }

    function transfer(address to,uint amount) public {
        console.log("**Sender balance is %s tokens",balance[msg.sender]);
        console.log(
        "**Transferring from %s to %s %s tokens",
        msg.sender,
        to,
        amount
    );

        require(balance[msg.sender]>=amount,"Not enough tokens");
        balance[msg.sender]-=amount;
        balance[to]+=amount;
    }

    function balanceOf(address account) public view returns(uint){
        return balance[account];
    }
}

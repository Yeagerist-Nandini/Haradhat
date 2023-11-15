// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Token{
    string public name="HardHat TOken";
    string public symbol="HHT";
    uint public totalSupply=1000;

    address public owner;
    mapping(address=>uint) balance;

    constructor(){
        balance[msg.sender]=totalSupply;
        owner=msg.sender;
    }

    function tranfer(address to,uint amount) external{
        require(amount<=balance[msg.sender],"Not enough Tokens");
        balance[msg.sender]-=amount;
        balance[to]+=amount;
    }

    function balanceOf(address account) public view returns(uint){
        return balance[account];
    }
}
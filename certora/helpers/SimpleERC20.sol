// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

//a symbolic erc20 for verification


contract SimpleERC20 {

    uint256 private _totalSupply;
    mapping(address => uint256) private _balance;
    mapping(address => mapping(address => uint256)) private _allowance;
    function totalSupply() public view returns (uint256) {  
        return _totalSupply;
    }
    function balanceOf(address account) public view returns (uint256) {
        return _balance[account];
    }
    function allowance(address owner, address spender)
    public view returns (uint256) {
        return _allowance[owner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _allowance[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address recipient, uint256 amount) external returns (bool) {
        _balance[msg.sender] -= amount;
        _balance[recipient] += amount;
        
        return true;
    }

    function transferFrom(address from,address recipient,uint256 amount) 
    external returns (bool) {
        if (_allowance[from][msg.sender] != type(uint256).max) {
            _allowance[from][msg.sender] -= amount;}
        _balance[from] -= amount;
        _balance[recipient] += amount;

        return true;
    }
}

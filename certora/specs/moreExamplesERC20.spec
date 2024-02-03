/***

Spec for the Certora Verification Language. 
See https://docs.certora.com for a complete guide.

run this file with ghostWithERc20s.conf:

certoraRun certora\confs\hostWithERc20s.conf 

***/

using ERC20Helper as _erc20Helper; // a variable that is the address of ERC20Helper  

using SimpleERC20 as simpleERC20;

// Declaration of erc20 functions 
methods {
    // When there is an unresolved call it will check all implementaions found in the list of contracts 
    function _.name() external => DISPATCHER(true);
    function _.symbol() external => DISPATCHER(true);
    function _.decimals() external => DISPATCHER(true);
    function _.totalSupply() external => DISPATCHER(true);
    function _.balanceOf(address) external => DISPATCHER(true);
    function _.allowance(address,address) external => DISPATCHER(true);
    function _.approve(address,uint256) external => DISPATCHER(true);
    function _.transfer(address,uint256) external => DISPATCHER(true);
    function _.transferFrom(address,address,uint256) external => DISPATCHER(true);
    
    // functions in other contracts
	function ERC20Helper.tokenBalanceOf(address token, address user) external returns (uint256) envfree;

    function simpleERC20.totalSupply() external returns (uint256) envfree;
}


/**
	@title decrease in system's erc20 balance
	@dev calls another contract 
    @dev example for filtering and checking only on methods from the main contract 
*/ 
rule decreaseInERC20(method f, address token) filtered { f-> f.contract == currentContract } {
   
    uint256 before = _erc20Helper.tokenBalanceOf(token, currentContract);

    env e;
	calldataarg arg;
    f(e, arg);

    uint256 after = _erc20Helper.tokenBalanceOf(token, currentContract);

    assert after >= before ||  false ; //fill in cases token can decrease 

} 

/**
    @title sum of erc20 balances if totalSupply 
    @dev usign a ghost variable and hooks to track changes to _balances
**/
ghost mathint simpleERC20_sumOfBalances  {
  init_state axiom simpleERC20_sumOfBalances == 0;
}

hook Sstore simpleERC20._balance[KEY address addr] uint256 newValue (uint256 oldValue) STORAGE {
    simpleERC20_sumOfBalances = simpleERC20_sumOfBalances + newValue - oldValue;
}

invariant totalSupplyIsSumOfBalances()
    to_mathint(simpleERC20.totalSupply()) == simpleERC20_sumOfBalances;
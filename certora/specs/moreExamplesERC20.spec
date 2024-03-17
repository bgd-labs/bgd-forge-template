/***

Spec for the Certora Verification Language. 
See https://docs.certora.com for a complete guide.

run this file with ghostWithERc20s.conf:

certoraRun certora\confs\ghostWithERc20s.conf 

***/

using ERC20Helper as _erc20Helper; // a variable that is the address of ERC20Helper  

using SimpleERC20 as simpleERC20;

// Declaration of erc20 functions 
methods {
    // When there is an unresolved call it will check all implementations found in the list of contracts 
    // See docs for more information on dispatcher summaries:
    // https://docs.certora.com/en/latest/docs/cvl/methods.html
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
    @notice method f must be defined in the rule signature to be recognized by the filter
*/ 
rule decreaseInERC20(method f, address token) filtered { f-> f.contract == currentContract } {
   
    uint256 before = _erc20Helper.tokenBalanceOf(token, currentContract);

    env e;
	  calldataarg arg;
    f(e, arg);

    uint256 after = _erc20Helper.tokenBalanceOf(token, currentContract);

    assert after >= before ||  false, "function decreased the contract's ERC balance";  // replace false with cases where the token can decrease 

} 

/**
    @title sum of erc20 balances is totalSupply 
    @dev using a ghost variable and hooks to track changes to _balances
    @notice to learn more about ghosts you can read the docs:
    @notice https://docs.certora.com/en/latest/docs/confluence/anatomy/ghostfunctions.html#initial-axioms-for-uninterpreted-functions
**/
ghost mathint simpleERC20_sumOfBalances  {
  init_state axiom simpleERC20_sumOfBalances == 0;
}


// to learn more about using hook in CVL you can read the docs: https://docs.certora.com/en/latest/docs/cvl/hooks.html
hook Sstore simpleERC20._balance[KEY address addr] uint256 newValue (uint256 oldValue) {
    simpleERC20_sumOfBalances = simpleERC20_sumOfBalances + newValue - oldValue;
}

invariant totalSupplyIsSumOfBalances()
    to_mathint(simpleERC20.totalSupply()) == simpleERC20_sumOfBalances;

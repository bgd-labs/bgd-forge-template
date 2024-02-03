/***

Spec for the Certora Verification Language. 
See https://docs.certora.com for a complete guide.

***/


/*
    Declaration of methods that are used in the rules. `envfree` indicates that
    the method is not dependent on the environment (`msg.value`, `msg.sender`).
    Methods that are not declared here are assumed to be dependent on the
    environment.
*/
methods {
	// function in the main contract under verification 
	function boo() external  returns (string memory) envfree;
}

/** 
	@title Find and show a path for each method.
	@dev This is a parametric rule - it checks all public/external methods of the contracts listed.
**/
rule reachability(method f)
{
	env e;
	calldataarg args;
	f(e,args); //takes into account only non reveting cases 
	satisfy true;
}

/** 
   	@title  Define and check functions that should never revert
	@dev  use f.selector to state which functions should not revert,e.g.f.selector == sig:balanceOf(address).selector 
**/  
definition nonReveritngFunction(method f) returns bool = true; 

rule noRevert(method f) filtered {f -> nonReveritngFunction(f) }
{
	env e;
	calldataarg arg;
    //consider auto filtering for non-payable functions 
	require e.msg.value == 0; 
	f@withrevert(e, arg); 
	assert !lastReverted, "method should not revert";
}


/** 
    @title Checks if a function can be frontrun 
    @dev This property is implemented as a relational property - it compares two different executions on the same state.
**/ 
rule simpleFrontRunning(method f, method g) 
	/// usually a heavy rule, use filtering to decide on which this property should hole 
	/* filtered { f-> !f.isView, g-> !g.isView } */ 
{
	env e1;
	calldataarg arg;

	storage initialStorage = lastStorage;
	f(e1, arg); 
	

	env e2;
	calldataarg arg2;
	require e2.msg.sender != e1.msg.sender;
	g(e2, arg2) at initialStorage;  //roll back to state before calling f 

	f@withrevert(e1, arg);
	bool succeeded = !lastReverted;

	assert succeeded, "should be called also if frontrunned";
}


/** 
    @title This rule finds which functions are privileged.
    @notice A function is privileged if there is only one address that can call it.
    @dev by checking which functions can be called by two different users.
*/

rule privilegedOperation(method f, address privileged)
{
	env e1;
	calldataarg arg;
	require e1.msg.sender == privileged;

	storage initialStorage = lastStorage;
	f@withrevert(e1, arg); // privileged succeeds executing candidate privileged operation.
	bool firstSucceeded = !lastReverted;

	env e2;
	calldataarg arg2;
	require e2.msg.sender != privileged;
	f@withrevert(e2, arg2) at initialStorage; // unprivileged
	bool secondSucceeded = !lastReverted;

	satisfy  (firstSucceeded && secondSucceeded), "function is not privileged";
}


/** 
    @title This rule check with ether is sent out.    
    @dev nativeBalances[u] is u.balance in solidity 
	@dev currentContract is the main contract under verification
*/
rule decreaseInSystemEth(method f) {
   
    uint256 before = nativeBalances[currentContract];

    env e;
	calldataarg arg;
    f(e, arg);

    uint256 after = nativeBalances[currentContract];

    assert after >= before ||  false ; /* fill in cases where eth can decrease */ 
}


// just an example of the structure of an invariant 
invariant dummy() 
		nativeBalances[currentContract] >= 0; 
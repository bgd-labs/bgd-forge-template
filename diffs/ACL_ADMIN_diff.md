```diff
diff --git a/src/downloads/mainnet/ACL_ADMIN/Executor/Contract.sol b/src/downloads/mainnet/ACL_ADMIN/Executor/Contract.sol
new file mode 100644
index 0000000..24b1508
--- /dev/null
+++ b/src/downloads/mainnet/ACL_ADMIN/Executor/Contract.sol
@@ -0,0 +1,1255 @@
+// SPDX-License-Identifier: agpl-3.0
+pragma solidity 0.7.5;
+pragma abicoder v2;
+
+/**
+ * @dev Wrappers over Solidity's arithmetic operations with added overflow
+ * checks.
+ *
+ * Arithmetic operations in Solidity wrap on overflow. This can easily result
+ * in bugs, because programmers usually assume that an overflow raises an
+ * error, which is the standard behavior in high level programming languages.
+ * `SafeMath` restores this intuition by reverting the transaction when an
+ * operation overflows.
+ *
+ * Using this library instead of the unchecked operations eliminates an entire
+ * class of bugs, so it's recommended to use it always.
+ */
+library SafeMath {
+  /**
+   * @dev Returns the addition of two unsigned integers, reverting on
+   * overflow.
+   *
+   * Counterpart to Solidity's `+` operator.
+   *
+   * Requirements:
+   * - Addition cannot overflow.
+   */
+  function add(uint256 a, uint256 b) internal pure returns (uint256) {
+    uint256 c = a + b;
+    require(c >= a, 'SafeMath: addition overflow');
+
+    return c;
+  }
+
+  /**
+   * @dev Returns the subtraction of two unsigned integers, reverting on
+   * overflow (when the result is negative).
+   *
+   * Counterpart to Solidity's `-` operator.
+   *
+   * Requirements:
+   * - Subtraction cannot overflow.
+   */
+  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
+    return sub(a, b, 'SafeMath: subtraction overflow');
+  }
+
+  /**
+   * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
+   * overflow (when the result is negative).
+   *
+   * Counterpart to Solidity's `-` operator.
+   *
+   * Requirements:
+   * - Subtraction cannot overflow.
+   */
+  function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
+    require(b <= a, errorMessage);
+    uint256 c = a - b;
+
+    return c;
+  }
+
+  /**
+   * @dev Returns the multiplication of two unsigned integers, reverting on
+   * overflow.
+   *
+   * Counterpart to Solidity's `*` operator.
+   *
+   * Requirements:
+   * - Multiplication cannot overflow.
+   */
+  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
+    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
+    // benefit is lost if 'b' is also tested.
+    // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
+    if (a == 0) {
+      return 0;
+    }
+
+    uint256 c = a * b;
+    require(c / a == b, 'SafeMath: multiplication overflow');
+
+    return c;
+  }
+
+  /**
+   * @dev Returns the integer division of two unsigned integers. Reverts on
+   * division by zero. The result is rounded towards zero.
+   *
+   * Counterpart to Solidity's `/` operator. Note: this function uses a
+   * `revert` opcode (which leaves remaining gas untouched) while Solidity
+   * uses an invalid opcode to revert (consuming all remaining gas).
+   *
+   * Requirements:
+   * - The divisor cannot be zero.
+   */
+  function div(uint256 a, uint256 b) internal pure returns (uint256) {
+    return div(a, b, 'SafeMath: division by zero');
+  }
+
+  /**
+   * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
+   * division by zero. The result is rounded towards zero.
+   *
+   * Counterpart to Solidity's `/` operator. Note: this function uses a
+   * `revert` opcode (which leaves remaining gas untouched) while Solidity
+   * uses an invalid opcode to revert (consuming all remaining gas).
+   *
+   * Requirements:
+   * - The divisor cannot be zero.
+   */
+  function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
+    // Solidity only automatically asserts when dividing by 0
+    require(b > 0, errorMessage);
+    uint256 c = a / b;
+    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
+
+    return c;
+  }
+
+  /**
+   * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
+   * Reverts when dividing by zero.
+   *
+   * Counterpart to Solidity's `%` operator. This function uses a `revert`
+   * opcode (which leaves remaining gas untouched) while Solidity uses an
+   * invalid opcode to revert (consuming all remaining gas).
+   *
+   * Requirements:
+   * - The divisor cannot be zero.
+   */
+  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
+    return mod(a, b, 'SafeMath: modulo by zero');
+  }
+
+  /**
+   * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
+   * Reverts with custom message when dividing by zero.
+   *
+   * Counterpart to Solidity's `%` operator. This function uses a `revert`
+   * opcode (which leaves remaining gas untouched) while Solidity uses an
+   * invalid opcode to revert (consuming all remaining gas).
+   *
+   * Requirements:
+   * - The divisor cannot be zero.
+   */
+  function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
+    require(b != 0, errorMessage);
+    return a % b;
+  }
+}
+
+interface IGovernanceStrategy {
+  /**
+   * @dev Returns the Proposition Power of a user at a specific block number.
+   * @param user Address of the user.
+   * @param blockNumber Blocknumber at which to fetch Proposition Power
+   * @return Power number
+   **/
+  function getPropositionPowerAt(address user, uint256 blockNumber) external view returns (uint256);
+
+  /**
+   * @dev Returns the total supply of Outstanding Proposition Tokens
+   * @param blockNumber Blocknumber at which to evaluate
+   * @return total supply at blockNumber
+   **/
+  function getTotalPropositionSupplyAt(uint256 blockNumber) external view returns (uint256);
+
+  /**
+   * @dev Returns the total supply of Outstanding Voting Tokens
+   * @param blockNumber Blocknumber at which to evaluate
+   * @return total supply at blockNumber
+   **/
+  function getTotalVotingSupplyAt(uint256 blockNumber) external view returns (uint256);
+
+  /**
+   * @dev Returns the Vote Power of a user at a specific block number.
+   * @param user Address of the user.
+   * @param blockNumber Blocknumber at which to fetch Vote Power
+   * @return Vote number
+   **/
+  function getVotingPowerAt(address user, uint256 blockNumber) external view returns (uint256);
+}
+
+interface IAaveGovernanceV2 {
+  enum ProposalState {
+    Pending,
+    Canceled,
+    Active,
+    Failed,
+    Succeeded,
+    Queued,
+    Expired,
+    Executed
+  }
+
+  struct Vote {
+    bool support;
+    uint248 votingPower;
+  }
+
+  struct Proposal {
+    uint256 id;
+    address creator;
+    IExecutorWithTimelock executor;
+    address[] targets;
+    uint256[] values;
+    string[] signatures;
+    bytes[] calldatas;
+    bool[] withDelegatecalls;
+    uint256 startBlock;
+    uint256 endBlock;
+    uint256 executionTime;
+    uint256 forVotes;
+    uint256 againstVotes;
+    bool executed;
+    bool canceled;
+    address strategy;
+    bytes32 ipfsHash;
+    mapping(address => Vote) votes;
+  }
+
+  struct ProposalWithoutVotes {
+    uint256 id;
+    address creator;
+    IExecutorWithTimelock executor;
+    address[] targets;
+    uint256[] values;
+    string[] signatures;
+    bytes[] calldatas;
+    bool[] withDelegatecalls;
+    uint256 startBlock;
+    uint256 endBlock;
+    uint256 executionTime;
+    uint256 forVotes;
+    uint256 againstVotes;
+    bool executed;
+    bool canceled;
+    address strategy;
+    bytes32 ipfsHash;
+  }
+
+  /**
+   * @dev emitted when a new proposal is created
+   * @param id Id of the proposal
+   * @param creator address of the creator
+   * @param executor The ExecutorWithTimelock contract that will execute the proposal
+   * @param targets list of contracts called by proposal's associated transactions
+   * @param values list of value in wei for each propoposal's associated transaction
+   * @param signatures list of function signatures (can be empty) to be used when created the callData
+   * @param calldatas list of calldatas: if associated signature empty, calldata ready, else calldata is arguments
+   * @param withDelegatecalls boolean, true = transaction delegatecalls the taget, else calls the target
+   * @param startBlock block number when vote starts
+   * @param endBlock block number when vote ends
+   * @param strategy address of the governanceStrategy contract
+   * @param ipfsHash IPFS hash of the proposal
+   **/
+  event ProposalCreated(
+    uint256 id,
+    address indexed creator,
+    IExecutorWithTimelock indexed executor,
+    address[] targets,
+    uint256[] values,
+    string[] signatures,
+    bytes[] calldatas,
+    bool[] withDelegatecalls,
+    uint256 startBlock,
+    uint256 endBlock,
+    address strategy,
+    bytes32 ipfsHash
+  );
+
+  /**
+   * @dev emitted when a proposal is canceled
+   * @param id Id of the proposal
+   **/
+  event ProposalCanceled(uint256 id);
+
+  /**
+   * @dev emitted when a proposal is queued
+   * @param id Id of the proposal
+   * @param executionTime time when proposal underlying transactions can be executed
+   * @param initiatorQueueing address of the initiator of the queuing transaction
+   **/
+  event ProposalQueued(uint256 id, uint256 executionTime, address indexed initiatorQueueing);
+  /**
+   * @dev emitted when a proposal is executed
+   * @param id Id of the proposal
+   * @param initiatorExecution address of the initiator of the execution transaction
+   **/
+  event ProposalExecuted(uint256 id, address indexed initiatorExecution);
+  /**
+   * @dev emitted when a vote is registered
+   * @param id Id of the proposal
+   * @param voter address of the voter
+   * @param support boolean, true = vote for, false = vote against
+   * @param votingPower Power of the voter/vote
+   **/
+  event VoteEmitted(uint256 id, address indexed voter, bool support, uint256 votingPower);
+
+  event GovernanceStrategyChanged(address indexed newStrategy, address indexed initiatorChange);
+
+  event VotingDelayChanged(uint256 newVotingDelay, address indexed initiatorChange);
+
+  event ExecutorAuthorized(address executor);
+
+  event ExecutorUnauthorized(address executor);
+
+  /**
+   * @dev Creates a Proposal (needs Proposition Power of creator > Threshold)
+   * @param executor The ExecutorWithTimelock contract that will execute the proposal
+   * @param targets list of contracts called by proposal's associated transactions
+   * @param values list of value in wei for each propoposal's associated transaction
+   * @param signatures list of function signatures (can be empty) to be used when created the callData
+   * @param calldatas list of calldatas: if associated signature empty, calldata ready, else calldata is arguments
+   * @param withDelegatecalls if true, transaction delegatecalls the taget, else calls the target
+   * @param ipfsHash IPFS hash of the proposal
+   **/
+  function create(
+    IExecutorWithTimelock executor,
+    address[] memory targets,
+    uint256[] memory values,
+    string[] memory signatures,
+    bytes[] memory calldatas,
+    bool[] memory withDelegatecalls,
+    bytes32 ipfsHash
+  ) external returns (uint256);
+
+  /**
+   * @dev Cancels a Proposal,
+   * either at anytime by guardian
+   * or when proposal is Pending/Active and threshold no longer reached
+   * @param proposalId id of the proposal
+   **/
+  function cancel(uint256 proposalId) external;
+
+  /**
+   * @dev Queue the proposal (If Proposal Succeeded)
+   * @param proposalId id of the proposal to queue
+   **/
+  function queue(uint256 proposalId) external;
+
+  /**
+   * @dev Execute the proposal (If Proposal Queued)
+   * @param proposalId id of the proposal to execute
+   **/
+  function execute(uint256 proposalId) external payable;
+
+  /**
+   * @dev Function allowing msg.sender to vote for/against a proposal
+   * @param proposalId id of the proposal
+   * @param support boolean, true = vote for, false = vote against
+   **/
+  function submitVote(uint256 proposalId, bool support) external;
+
+  /**
+   * @dev Function to register the vote of user that has voted offchain via signature
+   * @param proposalId id of the proposal
+   * @param support boolean, true = vote for, false = vote against
+   * @param v v part of the voter signature
+   * @param r r part of the voter signature
+   * @param s s part of the voter signature
+   **/
+  function submitVoteBySignature(
+    uint256 proposalId,
+    bool support,
+    uint8 v,
+    bytes32 r,
+    bytes32 s
+  ) external;
+
+  /**
+   * @dev Set new GovernanceStrategy
+   * Note: owner should be a timelocked executor, so needs to make a proposal
+   * @param governanceStrategy new Address of the GovernanceStrategy contract
+   **/
+  function setGovernanceStrategy(address governanceStrategy) external;
+
+  /**
+   * @dev Set new Voting Delay (delay before a newly created proposal can be voted on)
+   * Note: owner should be a timelocked executor, so needs to make a proposal
+   * @param votingDelay new voting delay in seconds
+   **/
+  function setVotingDelay(uint256 votingDelay) external;
+
+  /**
+   * @dev Add new addresses to the list of authorized executors
+   * @param executors list of new addresses to be authorized executors
+   **/
+  function authorizeExecutors(address[] memory executors) external;
+
+  /**
+   * @dev Remove addresses to the list of authorized executors
+   * @param executors list of addresses to be removed as authorized executors
+   **/
+  function unauthorizeExecutors(address[] memory executors) external;
+
+  /**
+   * @dev Let the guardian abdicate from its priviledged rights
+   **/
+  function __abdicate() external;
+
+  /**
+   * @dev Getter of the current GovernanceStrategy address
+   * @return The address of the current GovernanceStrategy contracts
+   **/
+  function getGovernanceStrategy() external view returns (address);
+
+  /**
+   * @dev Getter of the current Voting Delay (delay before a created proposal can be voted on)
+   * Different from the voting duration
+   * @return The voting delay in seconds
+   **/
+  function getVotingDelay() external view returns (uint256);
+
+  /**
+   * @dev Returns whether an address is an authorized executor
+   * @param executor address to evaluate as authorized executor
+   * @return true if authorized
+   **/
+  function isExecutorAuthorized(address executor) external view returns (bool);
+
+  /**
+   * @dev Getter the address of the guardian, that can mainly cancel proposals
+   * @return The address of the guardian
+   **/
+  function getGuardian() external view returns (address);
+
+  /**
+   * @dev Getter of the proposal count (the current number of proposals ever created)
+   * @return the proposal count
+   **/
+  function getProposalsCount() external view returns (uint256);
+
+  /**
+   * @dev Getter of a proposal by id
+   * @param proposalId id of the proposal to get
+   * @return the proposal as ProposalWithoutVotes memory object
+   **/
+  function getProposalById(uint256 proposalId) external view returns (ProposalWithoutVotes memory);
+
+  /**
+   * @dev Getter of the Vote of a voter about a proposal
+   * Note: Vote is a struct: ({bool support, uint248 votingPower})
+   * @param proposalId id of the proposal
+   * @param voter address of the voter
+   * @return The associated Vote memory object
+   **/
+  function getVoteOnProposal(uint256 proposalId, address voter) external view returns (Vote memory);
+
+  /**
+   * @dev Get the current state of a proposal
+   * @param proposalId id of the proposal
+   * @return The current state if the proposal
+   **/
+  function getProposalState(uint256 proposalId) external view returns (ProposalState);
+}
+
+interface IExecutorWithTimelock {
+  /**
+   * @dev emitted when a new pending admin is set
+   * @param newPendingAdmin address of the new pending admin
+   **/
+  event NewPendingAdmin(address newPendingAdmin);
+
+  /**
+   * @dev emitted when a new admin is set
+   * @param newAdmin address of the new admin
+   **/
+  event NewAdmin(address newAdmin);
+
+  /**
+   * @dev emitted when a new delay (between queueing and execution) is set
+   * @param delay new delay
+   **/
+  event NewDelay(uint256 delay);
+
+  /**
+   * @dev emitted when a new (trans)action is Queued.
+   * @param actionHash hash of the action
+   * @param target address of the targeted contract
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   **/
+  event QueuedAction(
+    bytes32 actionHash,
+    address indexed target,
+    uint256 value,
+    string signature,
+    bytes data,
+    uint256 executionTime,
+    bool withDelegatecall
+  );
+
+  /**
+   * @dev emitted when an action is Cancelled
+   * @param actionHash hash of the action
+   * @param target address of the targeted contract
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   **/
+  event CancelledAction(
+    bytes32 actionHash,
+    address indexed target,
+    uint256 value,
+    string signature,
+    bytes data,
+    uint256 executionTime,
+    bool withDelegatecall
+  );
+
+  /**
+   * @dev emitted when an action is Cancelled
+   * @param actionHash hash of the action
+   * @param target address of the targeted contract
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   * @param resultData the actual callData used on the target
+   **/
+  event ExecutedAction(
+    bytes32 actionHash,
+    address indexed target,
+    uint256 value,
+    string signature,
+    bytes data,
+    uint256 executionTime,
+    bool withDelegatecall,
+    bytes resultData
+  );
+
+  /**
+   * @dev Getter of the current admin address (should be governance)
+   * @return The address of the current admin
+   **/
+  function getAdmin() external view returns (address);
+
+  /**
+   * @dev Getter of the current pending admin address
+   * @return The address of the pending admin
+   **/
+  function getPendingAdmin() external view returns (address);
+
+  /**
+   * @dev Getter of the delay between queuing and execution
+   * @return The delay in seconds
+   **/
+  function getDelay() external view returns (uint256);
+
+  /**
+   * @dev Returns whether an action (via actionHash) is queued
+   * @param actionHash hash of the action to be checked
+   * keccak256(abi.encode(target, value, signature, data, executionTime, withDelegatecall))
+   * @return true if underlying action of actionHash is queued
+   **/
+  function isActionQueued(bytes32 actionHash) external view returns (bool);
+
+  /**
+   * @dev Checks whether a proposal is over its grace period
+   * @param governance Governance contract
+   * @param proposalId Id of the proposal against which to test
+   * @return true of proposal is over grace period
+   **/
+  function isProposalOverGracePeriod(
+    IAaveGovernanceV2 governance,
+    uint256 proposalId
+  ) external view returns (bool);
+
+  /**
+   * @dev Getter of grace period constant
+   * @return grace period in seconds
+   **/
+  function GRACE_PERIOD() external view returns (uint256);
+
+  /**
+   * @dev Getter of minimum delay constant
+   * @return minimum delay in seconds
+   **/
+  function MINIMUM_DELAY() external view returns (uint256);
+
+  /**
+   * @dev Getter of maximum delay constant
+   * @return maximum delay in seconds
+   **/
+  function MAXIMUM_DELAY() external view returns (uint256);
+
+  /**
+   * @dev Function, called by Governance, that queue a transaction, returns action hash
+   * @param target smart contract target
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   **/
+  function queueTransaction(
+    address target,
+    uint256 value,
+    string memory signature,
+    bytes memory data,
+    uint256 executionTime,
+    bool withDelegatecall
+  ) external returns (bytes32);
+
+  /**
+   * @dev Function, called by Governance, that cancels a transaction, returns the callData executed
+   * @param target smart contract target
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   **/
+  function executeTransaction(
+    address target,
+    uint256 value,
+    string memory signature,
+    bytes memory data,
+    uint256 executionTime,
+    bool withDelegatecall
+  ) external payable returns (bytes memory);
+
+  /**
+   * @dev Function, called by Governance, that cancels a transaction, returns action hash
+   * @param target smart contract target
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   **/
+  function cancelTransaction(
+    address target,
+    uint256 value,
+    string memory signature,
+    bytes memory data,
+    uint256 executionTime,
+    bool withDelegatecall
+  ) external returns (bytes32);
+}
+
+/**
+ * @title Time Locked Executor Contract, inherited by Aave Governance Executors
+ * @dev Contract that can queue, execute, cancel transactions voted by Governance
+ * Queued transactions can be executed after a delay and until
+ * Grace period is not over.
+ * @author Aave
+ **/
+contract ExecutorWithTimelock is IExecutorWithTimelock {
+  using SafeMath for uint256;
+
+  uint256 public immutable override GRACE_PERIOD;
+  uint256 public immutable override MINIMUM_DELAY;
+  uint256 public immutable override MAXIMUM_DELAY;
+
+  address private _admin;
+  address private _pendingAdmin;
+  uint256 private _delay;
+
+  mapping(bytes32 => bool) private _queuedTransactions;
+
+  /**
+   * @dev Constructor
+   * @param admin admin address, that can call the main functions, (Governance)
+   * @param delay minimum time between queueing and execution of proposal
+   * @param gracePeriod time after `delay` while a proposal can be executed
+   * @param minimumDelay lower threshold of `delay`, in seconds
+   * @param maximumDelay upper threhold of `delay`, in seconds
+   **/
+  constructor(
+    address admin,
+    uint256 delay,
+    uint256 gracePeriod,
+    uint256 minimumDelay,
+    uint256 maximumDelay
+  ) {
+    require(delay >= minimumDelay, 'DELAY_SHORTER_THAN_MINIMUM');
+    require(delay <= maximumDelay, 'DELAY_LONGER_THAN_MAXIMUM');
+    _delay = delay;
+    _admin = admin;
+
+    GRACE_PERIOD = gracePeriod;
+    MINIMUM_DELAY = minimumDelay;
+    MAXIMUM_DELAY = maximumDelay;
+
+    emit NewDelay(delay);
+    emit NewAdmin(admin);
+  }
+
+  modifier onlyAdmin() {
+    require(msg.sender == _admin, 'ONLY_BY_ADMIN');
+    _;
+  }
+
+  modifier onlyTimelock() {
+    require(msg.sender == address(this), 'ONLY_BY_THIS_TIMELOCK');
+    _;
+  }
+
+  modifier onlyPendingAdmin() {
+    require(msg.sender == _pendingAdmin, 'ONLY_BY_PENDING_ADMIN');
+    _;
+  }
+
+  /**
+   * @dev Set the delay
+   * @param delay delay between queue and execution of proposal
+   **/
+  function setDelay(uint256 delay) public onlyTimelock {
+    _validateDelay(delay);
+    _delay = delay;
+
+    emit NewDelay(delay);
+  }
+
+  /**
+   * @dev Function enabling pending admin to become admin
+   **/
+  function acceptAdmin() public onlyPendingAdmin {
+    _admin = msg.sender;
+    _pendingAdmin = address(0);
+
+    emit NewAdmin(msg.sender);
+  }
+
+  /**
+   * @dev Setting a new pending admin (that can then become admin)
+   * Can only be called by this executor (i.e via proposal)
+   * @param newPendingAdmin address of the new admin
+   **/
+  function setPendingAdmin(address newPendingAdmin) public onlyTimelock {
+    _pendingAdmin = newPendingAdmin;
+
+    emit NewPendingAdmin(newPendingAdmin);
+  }
+
+  /**
+   * @dev Function, called by Governance, that queue a transaction, returns action hash
+   * @param target smart contract target
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   * @return the action Hash
+   **/
+  function queueTransaction(
+    address target,
+    uint256 value,
+    string memory signature,
+    bytes memory data,
+    uint256 executionTime,
+    bool withDelegatecall
+  ) public override onlyAdmin returns (bytes32) {
+    require(executionTime >= block.timestamp.add(_delay), 'EXECUTION_TIME_UNDERESTIMATED');
+
+    bytes32 actionHash = keccak256(
+      abi.encode(target, value, signature, data, executionTime, withDelegatecall)
+    );
+    _queuedTransactions[actionHash] = true;
+
+    emit QueuedAction(actionHash, target, value, signature, data, executionTime, withDelegatecall);
+    return actionHash;
+  }
+
+  /**
+   * @dev Function, called by Governance, that cancels a transaction, returns action hash
+   * @param target smart contract target
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   * @return the action Hash of the canceled tx
+   **/
+  function cancelTransaction(
+    address target,
+    uint256 value,
+    string memory signature,
+    bytes memory data,
+    uint256 executionTime,
+    bool withDelegatecall
+  ) public override onlyAdmin returns (bytes32) {
+    bytes32 actionHash = keccak256(
+      abi.encode(target, value, signature, data, executionTime, withDelegatecall)
+    );
+    _queuedTransactions[actionHash] = false;
+
+    emit CancelledAction(
+      actionHash,
+      target,
+      value,
+      signature,
+      data,
+      executionTime,
+      withDelegatecall
+    );
+    return actionHash;
+  }
+
+  /**
+   * @dev Function, called by Governance, that cancels a transaction, returns the callData executed
+   * @param target smart contract target
+   * @param value wei value of the transaction
+   * @param signature function signature of the transaction
+   * @param data function arguments of the transaction or callData if signature empty
+   * @param executionTime time at which to execute the transaction
+   * @param withDelegatecall boolean, true = transaction delegatecalls the target, else calls the target
+   * @return the callData executed as memory bytes
+   **/
+  function executeTransaction(
+    address target,
+    uint256 value,
+    string memory signature,
+    bytes memory data,
+    uint256 executionTime,
+    bool withDelegatecall
+  ) public payable override onlyAdmin returns (bytes memory) {
+    bytes32 actionHash = keccak256(
+      abi.encode(target, value, signature, data, executionTime, withDelegatecall)
+    );
+    require(_queuedTransactions[actionHash], 'ACTION_NOT_QUEUED');
+    require(block.timestamp >= executionTime, 'TIMELOCK_NOT_FINISHED');
+    require(block.timestamp <= executionTime.add(GRACE_PERIOD), 'GRACE_PERIOD_FINISHED');
+
+    _queuedTransactions[actionHash] = false;
+
+    bytes memory callData;
+
+    if (bytes(signature).length == 0) {
+      callData = data;
+    } else {
+      callData = abi.encodePacked(bytes4(keccak256(bytes(signature))), data);
+    }
+
+    bool success;
+    bytes memory resultData;
+    if (withDelegatecall) {
+      require(msg.value >= value, 'NOT_ENOUGH_MSG_VALUE');
+      // solium-disable-next-line security/no-call-value
+      (success, resultData) = target.delegatecall(callData);
+    } else {
+      // solium-disable-next-line security/no-call-value
+      (success, resultData) = target.call{value: value}(callData);
+    }
+
+    require(success, 'FAILED_ACTION_EXECUTION');
+
+    emit ExecutedAction(
+      actionHash,
+      target,
+      value,
+      signature,
+      data,
+      executionTime,
+      withDelegatecall,
+      resultData
+    );
+
+    return resultData;
+  }
+
+  /**
+   * @dev Getter of the current admin address (should be governance)
+   * @return The address of the current admin
+   **/
+  function getAdmin() external view override returns (address) {
+    return _admin;
+  }
+
+  /**
+   * @dev Getter of the current pending admin address
+   * @return The address of the pending admin
+   **/
+  function getPendingAdmin() external view override returns (address) {
+    return _pendingAdmin;
+  }
+
+  /**
+   * @dev Getter of the delay between queuing and execution
+   * @return The delay in seconds
+   **/
+  function getDelay() external view override returns (uint256) {
+    return _delay;
+  }
+
+  /**
+   * @dev Returns whether an action (via actionHash) is queued
+   * @param actionHash hash of the action to be checked
+   * keccak256(abi.encode(target, value, signature, data, executionTime, withDelegatecall))
+   * @return true if underlying action of actionHash is queued
+   **/
+  function isActionQueued(bytes32 actionHash) external view override returns (bool) {
+    return _queuedTransactions[actionHash];
+  }
+
+  /**
+   * @dev Checks whether a proposal is over its grace period
+   * @param governance Governance contract
+   * @param proposalId Id of the proposal against which to test
+   * @return true of proposal is over grace period
+   **/
+  function isProposalOverGracePeriod(
+    IAaveGovernanceV2 governance,
+    uint256 proposalId
+  ) external view override returns (bool) {
+    IAaveGovernanceV2.ProposalWithoutVotes memory proposal = governance.getProposalById(proposalId);
+
+    return (block.timestamp > proposal.executionTime.add(GRACE_PERIOD));
+  }
+
+  function _validateDelay(uint256 delay) internal view {
+    require(delay >= MINIMUM_DELAY, 'DELAY_SHORTER_THAN_MINIMUM');
+    require(delay <= MAXIMUM_DELAY, 'DELAY_LONGER_THAN_MAXIMUM');
+  }
+
+  receive() external payable {}
+}
+
+interface IProposalValidator {
+  /**
+   * @dev Called to validate a proposal (e.g when creating new proposal in Governance)
+   * @param governance Governance Contract
+   * @param user Address of the proposal creator
+   * @param blockNumber Block Number against which to make the test (e.g proposal creation block -1).
+   * @return boolean, true if can be created
+   **/
+  function validateCreatorOfProposal(
+    IAaveGovernanceV2 governance,
+    address user,
+    uint256 blockNumber
+  ) external view returns (bool);
+
+  /**
+   * @dev Called to validate the cancellation of a proposal
+   * @param governance Governance Contract
+   * @param user Address of the proposal creator
+   * @param blockNumber Block Number against which to make the test (e.g proposal creation block -1).
+   * @return boolean, true if can be cancelled
+   **/
+  function validateProposalCancellation(
+    IAaveGovernanceV2 governance,
+    address user,
+    uint256 blockNumber
+  ) external view returns (bool);
+
+  /**
+   * @dev Returns whether a user has enough Proposition Power to make a proposal.
+   * @param governance Governance Contract
+   * @param user Address of the user to be challenged.
+   * @param blockNumber Block Number against which to make the challenge.
+   * @return true if user has enough power
+   **/
+  function isPropositionPowerEnough(
+    IAaveGovernanceV2 governance,
+    address user,
+    uint256 blockNumber
+  ) external view returns (bool);
+
+  /**
+   * @dev Returns the minimum Proposition Power needed to create a proposition.
+   * @param governance Governance Contract
+   * @param blockNumber Blocknumber at which to evaluate
+   * @return minimum Proposition Power needed
+   **/
+  function getMinimumPropositionPowerNeeded(
+    IAaveGovernanceV2 governance,
+    uint256 blockNumber
+  ) external view returns (uint256);
+
+  /**
+   * @dev Returns whether a proposal passed or not
+   * @param governance Governance Contract
+   * @param proposalId Id of the proposal to set
+   * @return true if proposal passed
+   **/
+  function isProposalPassed(
+    IAaveGovernanceV2 governance,
+    uint256 proposalId
+  ) external view returns (bool);
+
+  /**
+   * @dev Check whether a proposal has reached quorum, ie has enough FOR-voting-power
+   * Here quorum is not to understand as number of votes reached, but number of for-votes reached
+   * @param governance Governance Contract
+   * @param proposalId Id of the proposal to verify
+   * @return voting power needed for a proposal to pass
+   **/
+  function isQuorumValid(
+    IAaveGovernanceV2 governance,
+    uint256 proposalId
+  ) external view returns (bool);
+
+  /**
+   * @dev Check whether a proposal has enough extra FOR-votes than AGAINST-votes
+   * FOR VOTES - AGAINST VOTES > VOTE_DIFFERENTIAL * voting supply
+   * @param governance Governance Contract
+   * @param proposalId Id of the proposal to verify
+   * @return true if enough For-Votes
+   **/
+  function isVoteDifferentialValid(
+    IAaveGovernanceV2 governance,
+    uint256 proposalId
+  ) external view returns (bool);
+
+  /**
+   * @dev Calculates the minimum amount of Voting Power needed for a proposal to Pass
+   * @param votingSupply Total number of oustanding voting tokens
+   * @return voting power needed for a proposal to pass
+   **/
+  function getMinimumVotingPowerNeeded(uint256 votingSupply) external view returns (uint256);
+
+  /**
+   * @dev Get proposition threshold constant value
+   * @return the proposition threshold value (100 <=> 1%)
+   **/
+  function PROPOSITION_THRESHOLD() external view returns (uint256);
+
+  /**
+   * @dev Get voting duration constant value
+   * @return the voting duration value in seconds
+   **/
+  function VOTING_DURATION() external view returns (uint256);
+
+  /**
+   * @dev Get the vote differential threshold constant value
+   * to compare with % of for votes/total supply - % of against votes/total supply
+   * @return the vote differential threshold value (100 <=> 1%)
+   **/
+  function VOTE_DIFFERENTIAL() external view returns (uint256);
+
+  /**
+   * @dev Get quorum threshold constant value
+   * to compare with % of for votes/total supply
+   * @return the quorum threshold value (100 <=> 1%)
+   **/
+  function MINIMUM_QUORUM() external view returns (uint256);
+
+  /**
+   * @dev precision helper: 100% = 10000
+   * @return one hundred percents with our chosen precision
+   **/
+  function ONE_HUNDRED_WITH_PRECISION() external view returns (uint256);
+}
+
+/**
+ * @title Proposal Validator Contract, inherited by  Aave Governance Executors
+ * @dev Validates/Invalidations propositions state modifications.
+ * Proposition Power functions: Validates proposition creations/ cancellation
+ * Voting Power functions: Validates success of propositions.
+ * @author Aave
+ **/
+contract ProposalValidator is IProposalValidator {
+  using SafeMath for uint256;
+
+  uint256 public immutable override PROPOSITION_THRESHOLD;
+  uint256 public immutable override VOTING_DURATION;
+  uint256 public immutable override VOTE_DIFFERENTIAL;
+  uint256 public immutable override MINIMUM_QUORUM;
+  uint256 public constant override ONE_HUNDRED_WITH_PRECISION = 10000; // Equivalent to 100%, but scaled for precision
+
+  /**
+   * @dev Constructor
+   * @param propositionThreshold minimum percentage of supply needed to submit a proposal
+   * - In ONE_HUNDRED_WITH_PRECISION units
+   * @param votingDuration duration in blocks of the voting period
+   * @param voteDifferential percentage of supply that `for` votes need to be over `against`
+   *   in order for the proposal to pass
+   * - In ONE_HUNDRED_WITH_PRECISION units
+   * @param minimumQuorum minimum percentage of the supply in FOR-voting-power need for a proposal to pass
+   * - In ONE_HUNDRED_WITH_PRECISION units
+   **/
+  constructor(
+    uint256 propositionThreshold,
+    uint256 votingDuration,
+    uint256 voteDifferential,
+    uint256 minimumQuorum
+  ) {
+    PROPOSITION_THRESHOLD = propositionThreshold;
+    VOTING_DURATION = votingDuration;
+    VOTE_DIFFERENTIAL = voteDifferential;
+    MINIMUM_QUORUM = minimumQuorum;
+  }
+
+  /**
+   * @dev Called to validate a proposal (e.g when creating new proposal in Governance)
+   * @param governance Governance Contract
+   * @param user Address of the proposal creator
+   * @param blockNumber Block Number against which to make the test (e.g proposal creation block -1).
+   * @return boolean, true if can be created
+   **/
+  function validateCreatorOfProposal(
+    IAaveGovernanceV2 governance,
+    address user,
+    uint256 blockNumber
+  ) external view override returns (bool) {
+    return isPropositionPowerEnough(governance, user, blockNumber);
+  }
+
+  /**
+   * @dev Called to validate the cancellation of a proposal
+   * Needs to creator to have lost proposition power threashold
+   * @param governance Governance Contract
+   * @param user Address of the proposal creator
+   * @param blockNumber Block Number against which to make the test (e.g proposal creation block -1).
+   * @return boolean, true if can be cancelled
+   **/
+  function validateProposalCancellation(
+    IAaveGovernanceV2 governance,
+    address user,
+    uint256 blockNumber
+  ) external view override returns (bool) {
+    return !isPropositionPowerEnough(governance, user, blockNumber);
+  }
+
+  /**
+   * @dev Returns whether a user has enough Proposition Power to make a proposal.
+   * @param governance Governance Contract
+   * @param user Address of the user to be challenged.
+   * @param blockNumber Block Number against which to make the challenge.
+   * @return true if user has enough power
+   **/
+  function isPropositionPowerEnough(
+    IAaveGovernanceV2 governance,
+    address user,
+    uint256 blockNumber
+  ) public view override returns (bool) {
+    IGovernanceStrategy currentGovernanceStrategy = IGovernanceStrategy(
+      governance.getGovernanceStrategy()
+    );
+    return
+      currentGovernanceStrategy.getPropositionPowerAt(user, blockNumber) >=
+      getMinimumPropositionPowerNeeded(governance, blockNumber);
+  }
+
+  /**
+   * @dev Returns the minimum Proposition Power needed to create a proposition.
+   * @param governance Governance Contract
+   * @param blockNumber Blocknumber at which to evaluate
+   * @return minimum Proposition Power needed
+   **/
+  function getMinimumPropositionPowerNeeded(
+    IAaveGovernanceV2 governance,
+    uint256 blockNumber
+  ) public view override returns (uint256) {
+    IGovernanceStrategy currentGovernanceStrategy = IGovernanceStrategy(
+      governance.getGovernanceStrategy()
+    );
+    return
+      currentGovernanceStrategy
+        .getTotalPropositionSupplyAt(blockNumber)
+        .mul(PROPOSITION_THRESHOLD)
+        .div(ONE_HUNDRED_WITH_PRECISION);
+  }
+
+  /**
+   * @dev Returns whether a proposal passed or not
+   * @param governance Governance Contract
+   * @param proposalId Id of the proposal to set
+   * @return true if proposal passed
+   **/
+  function isProposalPassed(
+    IAaveGovernanceV2 governance,
+    uint256 proposalId
+  ) external view override returns (bool) {
+    return (isQuorumValid(governance, proposalId) &&
+      isVoteDifferentialValid(governance, proposalId));
+  }
+
+  /**
+   * @dev Calculates the minimum amount of Voting Power needed for a proposal to Pass
+   * @param votingSupply Total number of oustanding voting tokens
+   * @return voting power needed for a proposal to pass
+   **/
+  function getMinimumVotingPowerNeeded(
+    uint256 votingSupply
+  ) public view override returns (uint256) {
+    return votingSupply.mul(MINIMUM_QUORUM).div(ONE_HUNDRED_WITH_PRECISION);
+  }
+
+  /**
+   * @dev Check whether a proposal has reached quorum, ie has enough FOR-voting-power
+   * Here quorum is not to understand as number of votes reached, but number of for-votes reached
+   * @param governance Governance Contract
+   * @param proposalId Id of the proposal to verify
+   * @return voting power needed for a proposal to pass
+   **/
+  function isQuorumValid(
+    IAaveGovernanceV2 governance,
+    uint256 proposalId
+  ) public view override returns (bool) {
+    IAaveGovernanceV2.ProposalWithoutVotes memory proposal = governance.getProposalById(proposalId);
+    uint256 votingSupply = IGovernanceStrategy(proposal.strategy).getTotalVotingSupplyAt(
+      proposal.startBlock
+    );
+
+    return proposal.forVotes >= getMinimumVotingPowerNeeded(votingSupply);
+  }
+
+  /**
+   * @dev Check whether a proposal has enough extra FOR-votes than AGAINST-votes
+   * FOR VOTES - AGAINST VOTES > VOTE_DIFFERENTIAL * voting supply
+   * @param governance Governance Contract
+   * @param proposalId Id of the proposal to verify
+   * @return true if enough For-Votes
+   **/
+  function isVoteDifferentialValid(
+    IAaveGovernanceV2 governance,
+    uint256 proposalId
+  ) public view override returns (bool) {
+    IAaveGovernanceV2.ProposalWithoutVotes memory proposal = governance.getProposalById(proposalId);
+    uint256 votingSupply = IGovernanceStrategy(proposal.strategy).getTotalVotingSupplyAt(
+      proposal.startBlock
+    );
+
+    return (proposal.forVotes.mul(ONE_HUNDRED_WITH_PRECISION).div(votingSupply) >
+      proposal.againstVotes.mul(ONE_HUNDRED_WITH_PRECISION).div(votingSupply).add(
+        VOTE_DIFFERENTIAL
+      ));
+  }
+}
+
+/**
+ * @title Time Locked, Validator, Executor Contract
+ * @dev Contract
+ * - Validate Proposal creations/ cancellation
+ * - Validate Vote Quorum and Vote success on proposal
+ * - Queue, Execute, Cancel, successful proposals' transactions.
+ * @author Aave
+ **/
+contract Executor is ExecutorWithTimelock, ProposalValidator {
+  constructor(
+    address admin,
+    uint256 delay,
+    uint256 gracePeriod,
+    uint256 minimumDelay,
+    uint256 maximumDelay,
+    uint256 propositionThreshold,
+    uint256 voteDuration,
+    uint256 voteDifferential,
+    uint256 minimumQuorum
+  )
+    ExecutorWithTimelock(admin, delay, gracePeriod, minimumDelay, maximumDelay)
+    ProposalValidator(propositionThreshold, voteDuration, voteDifferential, minimumQuorum)
+  {}
+}
diff --git a/src/downloads/metis/ACL_ADMIN/contracts/bridges/BridgeExecutorBase.sol b/src/downloads/metis/ACL_ADMIN/contracts/bridges/BridgeExecutorBase.sol
deleted file mode 100644
index d29f502..0000000
--- a/src/downloads/metis/ACL_ADMIN/contracts/bridges/BridgeExecutorBase.sol
+++ /dev/null
@@ -1,403 +0,0 @@
-// SPDX-License-Identifier: AGPL-3.0
-pragma solidity ^0.8.10;
-
-import {IExecutorBase} from '../interfaces/IExecutorBase.sol';
-
-/**
- * @title BridgeExecutorBase
- * @author Aave
- * @notice Abstract contract that implements basic executor functionality
- * @dev It does not implement an external `queue` function. This should instead be done in the inheriting
- * contract with proper access control
- */
-abstract contract BridgeExecutorBase is IExecutorBase {
-  // Minimum allowed grace period, which reduces the risk of having an actions set expire due to network congestion
-  uint256 constant MINIMUM_GRACE_PERIOD = 10 minutes;
-
-  // Time between queuing and execution
-  uint256 private _delay;
-  // Time after the execution time during which the actions set can be executed
-  uint256 private _gracePeriod;
-  // Minimum allowed delay
-  uint256 private _minimumDelay;
-  // Maximum allowed delay
-  uint256 private _maximumDelay;
-  // Address with the ability of canceling actions sets
-  address private _guardian;
-
-  // Number of actions sets
-  uint256 private _actionsSetCounter;
-  // Map of registered actions sets (id => ActionsSet)
-  mapping(uint256 => ActionsSet) private _actionsSets;
-  // Map of queued actions (actionHash => isQueued)
-  mapping(bytes32 => bool) private _queuedActions;
-
-  /**
-   * @dev Only guardian can call functions marked by this modifier.
-   **/
-  modifier onlyGuardian() {
-    if (msg.sender != _guardian) revert NotGuardian();
-    _;
-  }
-
-  /**
-   * @dev Only this contract can call functions marked by this modifier.
-   **/
-  modifier onlyThis() {
-    if (msg.sender != address(this)) revert OnlyCallableByThis();
-    _;
-  }
-
-  /**
-   * @dev Constructor
-   *
-   * @param delay The delay before which an actions set can be executed
-   * @param gracePeriod The time period after a delay during which an actions set can be executed
-   * @param minimumDelay The minimum bound a delay can be set to
-   * @param maximumDelay The maximum bound a delay can be set to
-   * @param guardian The address of the guardian, which can cancel queued proposals (can be zero)
-   */
-  constructor(
-    uint256 delay,
-    uint256 gracePeriod,
-    uint256 minimumDelay,
-    uint256 maximumDelay,
-    address guardian
-  ) {
-    if (
-      gracePeriod < MINIMUM_GRACE_PERIOD ||
-      minimumDelay >= maximumDelay ||
-      delay < minimumDelay ||
-      delay > maximumDelay
-    ) revert InvalidInitParams();
-
-    _updateDelay(delay);
-    _updateGracePeriod(gracePeriod);
-    _updateMinimumDelay(minimumDelay);
-    _updateMaximumDelay(maximumDelay);
-    _updateGuardian(guardian);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function execute(uint256 actionsSetId) external payable override {
-    if (getCurrentState(actionsSetId) != ActionsSetState.Queued) revert OnlyQueuedActions();
-
-    ActionsSet storage actionsSet = _actionsSets[actionsSetId];
-    if (block.timestamp < actionsSet.executionTime) revert TimelockNotFinished();
-
-    actionsSet.executed = true;
-    uint256 actionCount = actionsSet.targets.length;
-
-    bytes[] memory returnedData = new bytes[](actionCount);
-    for (uint256 i = 0; i < actionCount; ) {
-      returnedData[i] = _executeTransaction(
-        actionsSet.targets[i],
-        actionsSet.values[i],
-        actionsSet.signatures[i],
-        actionsSet.calldatas[i],
-        actionsSet.executionTime,
-        actionsSet.withDelegatecalls[i]
-      );
-      unchecked {
-        ++i;
-      }
-    }
-
-    emit ActionsSetExecuted(actionsSetId, msg.sender, returnedData);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function cancel(uint256 actionsSetId) external override onlyGuardian {
-    if (getCurrentState(actionsSetId) != ActionsSetState.Queued) revert OnlyQueuedActions();
-
-    ActionsSet storage actionsSet = _actionsSets[actionsSetId];
-    actionsSet.canceled = true;
-
-    uint256 targetsLength = actionsSet.targets.length;
-    for (uint256 i = 0; i < targetsLength; ) {
-      _cancelTransaction(
-        actionsSet.targets[i],
-        actionsSet.values[i],
-        actionsSet.signatures[i],
-        actionsSet.calldatas[i],
-        actionsSet.executionTime,
-        actionsSet.withDelegatecalls[i]
-      );
-      unchecked {
-        ++i;
-      }
-    }
-
-    emit ActionsSetCanceled(actionsSetId);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function updateGuardian(address guardian) external override onlyThis {
-    _updateGuardian(guardian);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function updateDelay(uint256 delay) external override onlyThis {
-    _validateDelay(delay);
-    _updateDelay(delay);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function updateGracePeriod(uint256 gracePeriod) external override onlyThis {
-    if (gracePeriod < MINIMUM_GRACE_PERIOD) revert GracePeriodTooShort();
-    _updateGracePeriod(gracePeriod);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function updateMinimumDelay(uint256 minimumDelay) external override onlyThis {
-    if (minimumDelay >= _maximumDelay) revert MinimumDelayTooLong();
-    _updateMinimumDelay(minimumDelay);
-    _validateDelay(_delay);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function updateMaximumDelay(uint256 maximumDelay) external override onlyThis {
-    if (maximumDelay <= _minimumDelay) revert MaximumDelayTooShort();
-    _updateMaximumDelay(maximumDelay);
-    _validateDelay(_delay);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function executeDelegateCall(
-    address target,
-    bytes calldata data
-  ) external payable override onlyThis returns (bool, bytes memory) {
-    bool success;
-    bytes memory resultData;
-    // solium-disable-next-line security/no-call-value
-    (success, resultData) = target.delegatecall(data);
-    return (success, resultData);
-  }
-
-  /// @inheritdoc IExecutorBase
-  function receiveFunds() external payable override {}
-
-  /// @inheritdoc IExecutorBase
-  function getDelay() external view override returns (uint256) {
-    return _delay;
-  }
-
-  /// @inheritdoc IExecutorBase
-  function getGracePeriod() external view override returns (uint256) {
-    return _gracePeriod;
-  }
-
-  /// @inheritdoc IExecutorBase
-  function getMinimumDelay() external view override returns (uint256) {
-    return _minimumDelay;
-  }
-
-  /// @inheritdoc IExecutorBase
-  function getMaximumDelay() external view override returns (uint256) {
-    return _maximumDelay;
-  }
-
-  /// @inheritdoc IExecutorBase
-  function getGuardian() external view override returns (address) {
-    return _guardian;
-  }
-
-  /// @inheritdoc IExecutorBase
-  function getActionsSetCount() external view override returns (uint256) {
-    return _actionsSetCounter;
-  }
-
-  /// @inheritdoc IExecutorBase
-  function getActionsSetById(
-    uint256 actionsSetId
-  ) external view override returns (ActionsSet memory) {
-    return _actionsSets[actionsSetId];
-  }
-
-  /// @inheritdoc IExecutorBase
-  function getCurrentState(uint256 actionsSetId) public view override returns (ActionsSetState) {
-    if (_actionsSetCounter <= actionsSetId) revert InvalidActionsSetId();
-    ActionsSet storage actionsSet = _actionsSets[actionsSetId];
-    if (actionsSet.canceled) {
-      return ActionsSetState.Canceled;
-    } else if (actionsSet.executed) {
-      return ActionsSetState.Executed;
-    } else if (block.timestamp > actionsSet.executionTime + _gracePeriod) {
-      return ActionsSetState.Expired;
-    } else {
-      return ActionsSetState.Queued;
-    }
-  }
-
-  /// @inheritdoc IExecutorBase
-  function isActionQueued(bytes32 actionHash) public view override returns (bool) {
-    return _queuedActions[actionHash];
-  }
-
-  function _updateGuardian(address guardian) internal {
-    emit GuardianUpdate(_guardian, guardian);
-    _guardian = guardian;
-  }
-
-  function _updateDelay(uint256 delay) internal {
-    emit DelayUpdate(_delay, delay);
-    _delay = delay;
-  }
-
-  function _updateGracePeriod(uint256 gracePeriod) internal {
-    emit GracePeriodUpdate(_gracePeriod, gracePeriod);
-    _gracePeriod = gracePeriod;
-  }
-
-  function _updateMinimumDelay(uint256 minimumDelay) internal {
-    emit MinimumDelayUpdate(_minimumDelay, minimumDelay);
-    _minimumDelay = minimumDelay;
-  }
-
-  function _updateMaximumDelay(uint256 maximumDelay) internal {
-    emit MaximumDelayUpdate(_maximumDelay, maximumDelay);
-    _maximumDelay = maximumDelay;
-  }
-
-  /**
-   * @notice Queue an ActionsSet
-   * @dev If a signature is empty, calldata is used for the execution, calldata is appended to signature otherwise
-   * @param targets Array of targets to be called by the actions set
-   * @param values Array of values to pass in each call by the actions set
-   * @param signatures Array of function signatures to encode in each call (can be empty)
-   * @param calldatas Array of calldata to pass in each call (can be empty)
-   * @param withDelegatecalls Array of whether to delegatecall for each call
-   **/
-  function _queue(
-    address[] memory targets,
-    uint256[] memory values,
-    string[] memory signatures,
-    bytes[] memory calldatas,
-    bool[] memory withDelegatecalls
-  ) internal {
-    if (targets.length == 0) revert EmptyTargets();
-    uint256 targetsLength = targets.length;
-    if (
-      targetsLength != values.length ||
-      targetsLength != signatures.length ||
-      targetsLength != calldatas.length ||
-      targetsLength != withDelegatecalls.length
-    ) revert InconsistentParamsLength();
-
-    uint256 actionsSetId = _actionsSetCounter;
-    uint256 executionTime = block.timestamp + _delay;
-    unchecked {
-      ++_actionsSetCounter;
-    }
-
-    for (uint256 i = 0; i < targetsLength; ) {
-      bytes32 actionHash = keccak256(
-        abi.encode(
-          targets[i],
-          values[i],
-          signatures[i],
-          calldatas[i],
-          executionTime,
-          withDelegatecalls[i]
-        )
-      );
-      if (isActionQueued(actionHash)) revert DuplicateAction();
-      _queuedActions[actionHash] = true;
-      unchecked {
-        ++i;
-      }
-    }
-
-    ActionsSet storage actionsSet = _actionsSets[actionsSetId];
-    actionsSet.targets = targets;
-    actionsSet.values = values;
-    actionsSet.signatures = signatures;
-    actionsSet.calldatas = calldatas;
-    actionsSet.withDelegatecalls = withDelegatecalls;
-    actionsSet.executionTime = executionTime;
-
-    emit ActionsSetQueued(
-      actionsSetId,
-      targets,
-      values,
-      signatures,
-      calldatas,
-      withDelegatecalls,
-      executionTime
-    );
-  }
-
-  function _executeTransaction(
-    address target,
-    uint256 value,
-    string memory signature,
-    bytes memory data,
-    uint256 executionTime,
-    bool withDelegatecall
-  ) internal returns (bytes memory) {
-    if (address(this).balance < value) revert InsufficientBalance();
-
-    bytes32 actionHash = keccak256(
-      abi.encode(target, value, signature, data, executionTime, withDelegatecall)
-    );
-    _queuedActions[actionHash] = false;
-
-    bytes memory callData;
-    if (bytes(signature).length == 0) {
-      callData = data;
-    } else {
-      callData = abi.encodePacked(bytes4(keccak256(bytes(signature))), data);
-    }
-
-    bool success;
-    bytes memory resultData;
-    if (withDelegatecall) {
-      (success, resultData) = this.executeDelegateCall{value: value}(target, callData);
-    } else {
-      // solium-disable-next-line security/no-call-value
-      (success, resultData) = target.call{value: value}(callData);
-    }
-    return _verifyCallResult(success, resultData);
-  }
-
-  function _cancelTransaction(
-    address target,
-    uint256 value,
-    string memory signature,
-    bytes memory data,
-    uint256 executionTime,
-    bool withDelegatecall
-  ) internal {
-    bytes32 actionHash = keccak256(
-      abi.encode(target, value, signature, data, executionTime, withDelegatecall)
-    );
-    _queuedActions[actionHash] = false;
-  }
-
-  function _validateDelay(uint256 delay) internal view {
-    if (delay < _minimumDelay) revert DelayShorterThanMin();
-    if (delay > _maximumDelay) revert DelayLongerThanMax();
-  }
-
-  function _verifyCallResult(
-    bool success,
-    bytes memory returnData
-  ) private pure returns (bytes memory) {
-    if (success) {
-      return returnData;
-    } else {
-      // Look for revert reason and bubble it up if present
-      if (returnData.length > 0) {
-        // The easiest way to bubble the revert reason is using memory via assembly
-
-        // solhint-disable-next-line no-inline-assembly
-        assembly {
-          let returndata_size := mload(returnData)
-          revert(add(32, returnData), returndata_size)
-        }
-      } else {
-        revert FailedActionExecution();
-      }
-    }
-  }
-}
diff --git a/src/downloads/metis/ACL_ADMIN/contracts/bridges/L2BridgeExecutor.sol b/src/downloads/metis/ACL_ADMIN/contracts/bridges/L2BridgeExecutor.sol
deleted file mode 100644
index d2b4969..0000000
--- a/src/downloads/metis/ACL_ADMIN/contracts/bridges/L2BridgeExecutor.sol
+++ /dev/null
@@ -1,65 +0,0 @@
-// SPDX-License-Identifier: AGPL-3.0
-pragma solidity ^0.8.10;
-
-import {IL2BridgeExecutor} from '../interfaces/IL2BridgeExecutor.sol';
-import {BridgeExecutorBase} from './BridgeExecutorBase.sol';
-
-/**
- * @title L2BridgeExecutor
- * @author Aave
- * @notice Abstract contract that implements bridge executor functionality for L2
- * @dev It does not implement the `onlyEthereumGovernanceExecutor` modifier. This should instead be done in the inheriting
- * contract with proper configuration and adjustments depending on the L2
- */
-abstract contract L2BridgeExecutor is BridgeExecutorBase, IL2BridgeExecutor {
-  // Address of the Ethereum Governance Executor, which should be able to queue actions sets
-  address internal _ethereumGovernanceExecutor;
-
-  /**
-   * @dev Only the Ethereum Governance Executor should be able to call functions marked by this modifier.
-   **/
-  modifier onlyEthereumGovernanceExecutor() virtual;
-
-  /**
-   * @dev Constructor
-   *
-   * @param ethereumGovernanceExecutor The address of the EthereumGovernanceExecutor
-   * @param delay The delay before which an actions set can be executed
-   * @param gracePeriod The time period after a delay during which an actions set can be executed
-   * @param minimumDelay The minimum bound a delay can be set to
-   * @param maximumDelay The maximum bound a delay can be set to
-   * @param guardian The address of the guardian, which can cancel queued proposals (can be zero)
-   */
-  constructor(
-    address ethereumGovernanceExecutor,
-    uint256 delay,
-    uint256 gracePeriod,
-    uint256 minimumDelay,
-    uint256 maximumDelay,
-    address guardian
-  ) BridgeExecutorBase(delay, gracePeriod, minimumDelay, maximumDelay, guardian) {
-    _ethereumGovernanceExecutor = ethereumGovernanceExecutor;
-  }
-
-  /// @inheritdoc IL2BridgeExecutor
-  function queue(
-    address[] memory targets,
-    uint256[] memory values,
-    string[] memory signatures,
-    bytes[] memory calldatas,
-    bool[] memory withDelegatecalls
-  ) external onlyEthereumGovernanceExecutor {
-    _queue(targets, values, signatures, calldatas, withDelegatecalls);
-  }
-
-  /// @inheritdoc IL2BridgeExecutor
-  function updateEthereumGovernanceExecutor(address ethereumGovernanceExecutor) external onlyThis {
-    emit EthereumGovernanceExecutorUpdate(_ethereumGovernanceExecutor, ethereumGovernanceExecutor);
-    _ethereumGovernanceExecutor = ethereumGovernanceExecutor;
-  }
-
-  /// @inheritdoc IL2BridgeExecutor
-  function getEthereumGovernanceExecutor() external view returns (address) {
-    return _ethereumGovernanceExecutor;
-  }
-}
diff --git a/src/downloads/metis/ACL_ADMIN/contracts/bridges/MetisBridgeExecutor.sol b/src/downloads/metis/ACL_ADMIN/contracts/bridges/MetisBridgeExecutor.sol
deleted file mode 100644
index 2033253..0000000
--- a/src/downloads/metis/ACL_ADMIN/contracts/bridges/MetisBridgeExecutor.sol
+++ /dev/null
@@ -1,59 +0,0 @@
-// SPDX-License-Identifier: MIT
-pragma solidity ^0.8.10;
-
-import {ICrossDomainMessenger} from '../dependencies/optimism/interfaces/ICrossDomainMessenger.sol';
-import {L2BridgeExecutor} from './L2BridgeExecutor.sol';
-
-/**
- * @title MetisBridgeExecutor
- * @author BGD Labs
- * @notice Implementation of the Metis Bridge Executor, able to receive cross-chain transactions from Ethereum
- * @dev Queuing an ActionsSet into this Executor can only be done by the Metis L2 Cross Domain Messenger and having
- * the EthereumGovernanceExecutor as xDomainMessageSender
- */
-contract MetisBridgeExecutor is L2BridgeExecutor {
-  // Address of the Metis L2 Cross Domain Messenger, in charge of redirecting cross-chain transactions in L2
-  address public immutable OVM_L2_CROSS_DOMAIN_MESSENGER;
-
-  /// @inheritdoc L2BridgeExecutor
-  modifier onlyEthereumGovernanceExecutor() override {
-    if (
-      msg.sender != OVM_L2_CROSS_DOMAIN_MESSENGER ||
-      ICrossDomainMessenger(OVM_L2_CROSS_DOMAIN_MESSENGER).xDomainMessageSender() !=
-      _ethereumGovernanceExecutor
-    ) revert UnauthorizedEthereumExecutor();
-    _;
-  }
-
-  /**
-   * @dev Constructor
-   *
-   * @param ovmL2CrossDomainMessenger The address of the Metis L2CrossDomainMessenger
-   * @param ethereumGovernanceExecutor The address of the EthereumGovernanceExecutor
-   * @param delay The delay before which an actions set can be executed
-   * @param gracePeriod The time period after a delay during which an actions set can be executed
-   * @param minimumDelay The minimum bound a delay can be set to
-   * @param maximumDelay The maximum bound a delay can be set to
-   * @param guardian The address of the guardian, which can cancel queued proposals (can be zero)
-   */
-  constructor(
-    address ovmL2CrossDomainMessenger,
-    address ethereumGovernanceExecutor,
-    uint256 delay,
-    uint256 gracePeriod,
-    uint256 minimumDelay,
-    uint256 maximumDelay,
-    address guardian
-  )
-    L2BridgeExecutor(
-      ethereumGovernanceExecutor,
-      delay,
-      gracePeriod,
-      minimumDelay,
-      maximumDelay,
-      guardian
-    )
-  {
-    OVM_L2_CROSS_DOMAIN_MESSENGER = ovmL2CrossDomainMessenger;
-  }
-}
diff --git a/src/downloads/metis/ACL_ADMIN/contracts/dependencies/optimism/interfaces/ICrossDomainMessenger.sol b/src/downloads/metis/ACL_ADMIN/contracts/dependencies/optimism/interfaces/ICrossDomainMessenger.sol
deleted file mode 100644
index 6f4bd34..0000000
--- a/src/downloads/metis/ACL_ADMIN/contracts/dependencies/optimism/interfaces/ICrossDomainMessenger.sol
+++ /dev/null
@@ -1,39 +0,0 @@
-// SPDX-License-Identifier: MIT
-pragma solidity >0.5.0 <0.9.0;
-
-/**
- * @title ICrossDomainMessenger
- */
-interface ICrossDomainMessenger {
-  /**********
-   * Events *
-   **********/
-
-  event SentMessage(
-    address indexed target,
-    address sender,
-    bytes message,
-    uint256 messageNonce,
-    uint256 gasLimit
-  );
-  event RelayedMessage(bytes32 indexed msgHash);
-  event FailedRelayedMessage(bytes32 indexed msgHash);
-
-  /*************
-   * Variables *
-   *************/
-
-  function xDomainMessageSender() external view returns (address);
-
-  /********************
-   * Public Functions *
-   ********************/
-
-  /**
-   * Sends a cross domain message to the target messenger.
-   * @param _target Target contract address.
-   * @param _message Message to send to the target.
-   * @param _gasLimit Gas limit for the provided message.
-   */
-  function sendMessage(address _target, bytes calldata _message, uint32 _gasLimit) external;
-}
diff --git a/src/downloads/metis/ACL_ADMIN/contracts/interfaces/IExecutorBase.sol b/src/downloads/metis/ACL_ADMIN/contracts/interfaces/IExecutorBase.sol
deleted file mode 100644
index 14b58a8..0000000
--- a/src/downloads/metis/ACL_ADMIN/contracts/interfaces/IExecutorBase.sol
+++ /dev/null
@@ -1,250 +0,0 @@
-// SPDX-License-Identifier: AGPL-3.0
-pragma solidity ^0.8.10;
-
-/**
- * @title IExecutorBase
- * @author Aave
- * @notice Defines the basic interface for the ExecutorBase abstract contract
- */
-interface IExecutorBase {
-  error InvalidInitParams();
-  error NotGuardian();
-  error OnlyCallableByThis();
-  error MinimumDelayTooLong();
-  error MaximumDelayTooShort();
-  error GracePeriodTooShort();
-  error DelayShorterThanMin();
-  error DelayLongerThanMax();
-  error OnlyQueuedActions();
-  error TimelockNotFinished();
-  error InvalidActionsSetId();
-  error EmptyTargets();
-  error InconsistentParamsLength();
-  error DuplicateAction();
-  error InsufficientBalance();
-  error FailedActionExecution();
-
-  /**
-   * @notice This enum contains all possible actions set states
-   */
-  enum ActionsSetState {
-    Queued,
-    Executed,
-    Canceled,
-    Expired
-  }
-
-  /**
-   * @notice This struct contains the data needed to execute a specified set of actions
-   * @param targets Array of targets to call
-   * @param values Array of values to pass in each call
-   * @param signatures Array of function signatures to encode in each call (can be empty)
-   * @param calldatas Array of calldatas to pass in each call, appended to the signature at the same array index if not empty
-   * @param withDelegateCalls Array of whether to delegatecall for each call
-   * @param executionTime Timestamp starting from which the actions set can be executed
-   * @param executed True if the actions set has been executed, false otherwise
-   * @param canceled True if the actions set has been canceled, false otherwise
-   */
-  struct ActionsSet {
-    address[] targets;
-    uint256[] values;
-    string[] signatures;
-    bytes[] calldatas;
-    bool[] withDelegatecalls;
-    uint256 executionTime;
-    bool executed;
-    bool canceled;
-  }
-
-  /**
-   * @dev Emitted when an ActionsSet is queued
-   * @param id Id of the ActionsSet
-   * @param targets Array of targets to be called by the actions set
-   * @param values Array of values to pass in each call by the actions set
-   * @param signatures Array of function signatures to encode in each call by the actions set
-   * @param calldatas Array of calldata to pass in each call by the actions set
-   * @param withDelegatecalls Array of whether to delegatecall for each call of the actions set
-   * @param executionTime The timestamp at which this actions set can be executed
-   **/
-  event ActionsSetQueued(
-    uint256 indexed id,
-    address[] targets,
-    uint256[] values,
-    string[] signatures,
-    bytes[] calldatas,
-    bool[] withDelegatecalls,
-    uint256 executionTime
-  );
-
-  /**
-   * @dev Emitted when an ActionsSet is successfully executed
-   * @param id Id of the ActionsSet
-   * @param initiatorExecution The address that triggered the ActionsSet execution
-   * @param returnedData The returned data from the ActionsSet execution
-   **/
-  event ActionsSetExecuted(
-    uint256 indexed id,
-    address indexed initiatorExecution,
-    bytes[] returnedData
-  );
-
-  /**
-   * @dev Emitted when an ActionsSet is cancelled by the guardian
-   * @param id Id of the ActionsSet
-   **/
-  event ActionsSetCanceled(uint256 indexed id);
-
-  /**
-   * @dev Emitted when a new guardian is set
-   * @param oldGuardian The address of the old guardian
-   * @param newGuardian The address of the new guardian
-   **/
-  event GuardianUpdate(address oldGuardian, address newGuardian);
-
-  /**
-   * @dev Emitted when the delay (between queueing and execution) is updated
-   * @param oldDelay The value of the old delay
-   * @param newDelay The value of the new delay
-   **/
-  event DelayUpdate(uint256 oldDelay, uint256 newDelay);
-
-  /**
-   * @dev Emitted when the grace period (between executionTime and expiration) is updated
-   * @param oldGracePeriod The value of the old grace period
-   * @param newGracePeriod The value of the new grace period
-   **/
-  event GracePeriodUpdate(uint256 oldGracePeriod, uint256 newGracePeriod);
-
-  /**
-   * @dev Emitted when the minimum delay (lower bound of delay) is updated
-   * @param oldMinimumDelay The value of the old minimum delay
-   * @param newMinimumDelay The value of the new minimum delay
-   **/
-  event MinimumDelayUpdate(uint256 oldMinimumDelay, uint256 newMinimumDelay);
-
-  /**
-   * @dev Emitted when the maximum delay (upper bound of delay)is updated
-   * @param oldMaximumDelay The value of the old maximum delay
-   * @param newMaximumDelay The value of the new maximum delay
-   **/
-  event MaximumDelayUpdate(uint256 oldMaximumDelay, uint256 newMaximumDelay);
-
-  /**
-   * @notice Execute the ActionsSet
-   * @param actionsSetId The id of the ActionsSet to execute
-   **/
-  function execute(uint256 actionsSetId) external payable;
-
-  /**
-   * @notice Cancel the ActionsSet
-   * @param actionsSetId The id of the ActionsSet to cancel
-   **/
-  function cancel(uint256 actionsSetId) external;
-
-  /**
-   * @notice Update guardian
-   * @param guardian The address of the new guardian
-   **/
-  function updateGuardian(address guardian) external;
-
-  /**
-   * @notice Update the delay, time between queueing and execution of ActionsSet
-   * @dev It does not affect to actions set that are already queued
-   * @param delay The value of the delay (in seconds)
-   **/
-  function updateDelay(uint256 delay) external;
-
-  /**
-   * @notice Update the grace period, the period after the execution time during which an actions set can be executed
-   * @param gracePeriod The value of the grace period (in seconds)
-   **/
-  function updateGracePeriod(uint256 gracePeriod) external;
-
-  /**
-   * @notice Update the minimum allowed delay
-   * @param minimumDelay The value of the minimum delay (in seconds)
-   **/
-  function updateMinimumDelay(uint256 minimumDelay) external;
-
-  /**
-   * @notice Update the maximum allowed delay
-   * @param maximumDelay The maximum delay (in seconds)
-   **/
-  function updateMaximumDelay(uint256 maximumDelay) external;
-
-  /**
-   * @notice Allows to delegatecall a given target with an specific amount of value
-   * @dev This function is external so it allows to specify a defined msg.value for the delegate call, reducing
-   * the risk that a delegatecall gets executed with more value than intended
-   * @return True if the delegate call was successful, false otherwise
-   * @return The bytes returned by the delegate call
-   **/
-  function executeDelegateCall(
-    address target,
-    bytes calldata data
-  ) external payable returns (bool, bytes memory);
-
-  /**
-   * @notice Allows to receive funds into the executor
-   * @dev Useful for actionsSet that needs funds to gets executed
-   */
-  function receiveFunds() external payable;
-
-  /**
-   * @notice Returns the delay (between queuing and execution)
-   * @return The value of the delay (in seconds)
-   **/
-  function getDelay() external view returns (uint256);
-
-  /**
-   * @notice Returns the grace period
-   * @return The value of the grace period (in seconds)
-   **/
-  function getGracePeriod() external view returns (uint256);
-
-  /**
-   * @notice Returns the minimum delay
-   * @return The value of the minimum delay (in seconds)
-   **/
-  function getMinimumDelay() external view returns (uint256);
-
-  /**
-   * @notice Returns the maximum delay
-   * @return The value of the maximum delay (in seconds)
-   **/
-  function getMaximumDelay() external view returns (uint256);
-
-  /**
-   * @notice Returns the address of the guardian
-   * @return The address of the guardian
-   **/
-  function getGuardian() external view returns (address);
-
-  /**
-   * @notice Returns the total number of actions sets of the executor
-   * @return The number of actions sets
-   **/
-  function getActionsSetCount() external view returns (uint256);
-
-  /**
-   * @notice Returns the data of an actions set
-   * @param actionsSetId The id of the ActionsSet
-   * @return The data of the ActionsSet
-   **/
-  function getActionsSetById(uint256 actionsSetId) external view returns (ActionsSet memory);
-
-  /**
-   * @notice Returns the current state of an actions set
-   * @param actionsSetId The id of the ActionsSet
-   * @return The current state of theI ActionsSet
-   **/
-  function getCurrentState(uint256 actionsSetId) external view returns (ActionsSetState);
-
-  /**
-   * @notice Returns whether an actions set (by actionHash) is queued
-   * @dev actionHash = keccak256(abi.encode(target, value, signature, data, executionTime, withDelegatecall))
-   * @param actionHash hash of the action to be checked
-   * @return True if the underlying action of actionHash is queued, false otherwise
-   **/
-  function isActionQueued(bytes32 actionHash) external view returns (bool);
-}
diff --git a/src/downloads/metis/ACL_ADMIN/contracts/interfaces/IL2BridgeExecutor.sol b/src/downloads/metis/ACL_ADMIN/contracts/interfaces/IL2BridgeExecutor.sol
deleted file mode 100644
index 270c507..0000000
--- a/src/downloads/metis/ACL_ADMIN/contracts/interfaces/IL2BridgeExecutor.sol
+++ /dev/null
@@ -1,52 +0,0 @@
-// SPDX-License-Identifier: AGPL-3.0
-pragma solidity ^0.8.10;
-
-import {IExecutorBase} from './IExecutorBase.sol';
-
-/**
- * @title IL2BridgeExecutorBase
- * @author Aave
- * @notice Defines the basic interface for the L2BridgeExecutor abstract contract
- */
-interface IL2BridgeExecutor is IExecutorBase {
-  error UnauthorizedEthereumExecutor();
-
-  /**
-   * @dev Emitted when the Ethereum Governance Executor is updated
-   * @param oldEthereumGovernanceExecutor The address of the old EthereumGovernanceExecutor
-   * @param newEthereumGovernanceExecutor The address of the new EthereumGovernanceExecutor
-   **/
-  event EthereumGovernanceExecutorUpdate(
-    address oldEthereumGovernanceExecutor,
-    address newEthereumGovernanceExecutor
-  );
-
-  /**
-   * @notice Queue an ActionsSet
-   * @dev If a signature is empty, calldata is used for the execution, calldata is appended to signature otherwise
-   * @param targets Array of targets to be called by the actions set
-   * @param values Array of values to pass in each call by the actions set
-   * @param signatures Array of function signatures to encode in each call by the actions (can be empty)
-   * @param calldatas Array of calldata to pass in each call by the actions set
-   * @param withDelegatecalls Array of whether to delegatecall for each call of the actions set
-   **/
-  function queue(
-    address[] memory targets,
-    uint256[] memory values,
-    string[] memory signatures,
-    bytes[] memory calldatas,
-    bool[] memory withDelegatecalls
-  ) external;
-
-  /**
-   * @notice Update the address of the Ethereum Governance Executor
-   * @param ethereumGovernanceExecutor The address of the new EthereumGovernanceExecutor
-   **/
-  function updateEthereumGovernanceExecutor(address ethereumGovernanceExecutor) external;
-
-  /**
-   * @notice Returns the address of the Ethereum Governance Executor
-   * @return The address of the EthereumGovernanceExecutor
-   **/
-  function getEthereumGovernanceExecutor() external view returns (address);
-}
```

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from 'forge-std/Script.sol';
import {Ghost} from '../src/contracts/Ghost.sol';

// make deploy-ledger contract=scripts/Ghost.s.sol:Deploy chain=mainnet
contract Deploy is Script {
  function run() external {
    vm.startBroadcast();
    new Ghost();
    vm.stopBroadcast();
  }
}

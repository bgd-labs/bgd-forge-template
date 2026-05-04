// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from 'forge-std/Script.sol';
import {Spook} from '../src/contracts/Spook.sol';

/**
 * make deploy-ledger contract=scripts/Spook.s.sol:Deploy chain=mainnet
 * make deploy-keystore contract=scripts/Spook.s.sol:Deploy chain=mainnet
 */
contract Deploy is Script {
  function run() external {
    vm.startBroadcast();
    new Spook();
    vm.stopBroadcast();
  }
}

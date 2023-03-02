// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from 'forge-std/Script.sol';
import {Ghost} from '../src/contracts/Ghost.sol';

contract Ethereum is Script {
  function run() external {
    vm.startBroadcast();
    new Ghost();
    vm.stopBroadcast();
  }
}

contract Avalanche is Script {
  function run() external {
    vm.startBroadcast();
    new Ghost();
    vm.stopBroadcast();
  }
}

contract CustomDeploy is Script {
  function run() external {
    vm.startBroadcast();
    new Ghost();
    vm.stopBroadcast();
  }
}

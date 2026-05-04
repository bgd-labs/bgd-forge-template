// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';

import {Ghost} from '../../src/contracts/Ghost.sol';

/// forge-config: default.isolate = true
contract Ghost_gas_Tests is Test {
  Ghost public ghost;

  function setUp() public {
    ghost = new Ghost();
  }

  function testBoo() public {
    assertEq(ghost.boo(), 'Boo!');
    vm.snapshotGasLastCall('Ghost.Getter', 'boo: getter');
  }
}

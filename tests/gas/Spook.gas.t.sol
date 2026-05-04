// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';

import {Spook} from '../../src/contracts/Spook.sol';

/// forge-config: default.isolate = true
contract Spook_gas_Tests is Test {
  Spook public spook;

  function setUp() public {
    spook = new Spook();
  }

  function testBoo() public {
    assertEq(spook.boo(), 'Boo!');
    vm.snapshotGasLastCall('Spook.Getter', 'boo: getter');
  }
}

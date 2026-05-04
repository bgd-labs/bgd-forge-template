// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';

import {Spook} from '../src/contracts/Spook.sol';

contract SpookTest is Test {
  Spook public spook;

  function setUp() public {
    spook = new Spook();
  }

  function testBoo() public view {
    assertEq(spook.boo(), 'Boo!');
  }
}

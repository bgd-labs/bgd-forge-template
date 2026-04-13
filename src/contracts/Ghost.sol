// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../interfaces/IGhost.sol';

/**
 * @title Ghost
 * @author BGD Labs
 * @notice Example contract for the BGD forge template
 */
contract Ghost is IGhost {
  /// @inheritdoc IGhost
  function boo() external pure returns (string memory) {
    return 'Boo!';
  }
}

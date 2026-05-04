// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../interfaces/ISpook.sol';

/**
 * @title Spook
 * @author BGD Labs
 * @notice Example contract for the BGD forge template
 */
contract Spook is ISpook {
  /// @inheritdoc ISpook
  function boo() external pure returns (string memory) {
    return 'Boo!';
  }
}

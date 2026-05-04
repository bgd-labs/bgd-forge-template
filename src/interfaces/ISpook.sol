// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ISpook
 * @author BGD Labs
 * @notice Interface for the Spook contract
 */
interface ISpook {
  /**
   * @notice Returns a spooky greeting
   * @return A string with the greeting
   */
  function boo() external view returns (string memory);
}

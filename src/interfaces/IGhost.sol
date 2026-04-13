// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IGhost
 * @author BGD Labs
 * @notice Interface for the Ghost contract
 */
interface IGhost {
  /**
   * @notice Returns a spooky greeting
   * @return A string with the greeting
   */
  function boo() external view returns (string memory);
}

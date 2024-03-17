// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;


//probably repalce with an import to the selected library
interface IERC20 {
    
     function balanceOf(address account) external view returns (uint256);
}

contract ERC20Helper {
    function tokenBalanceOf(address token, address user) public view returns (uint256) {
            return IERC20(token).balanceOf(user);
    }
}
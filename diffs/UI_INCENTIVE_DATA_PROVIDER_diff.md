```diff
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Context.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Context.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Context.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Context.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol
similarity index 99%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol
index 1d470e0..72ce136 100644
--- a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol
+++ b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol
@@ -1,5 +1,5 @@
 // SPDX-License-Identifier: AGPL-3.0
-pragma solidity ^0.8.0;
+pragma solidity 0.8.10;
 
 /**
  * @dev Interface of the ERC20 standard as defined in the EIP.
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/SafeCast.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/SafeCast.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/SafeCast.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/SafeCast.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IACLManager.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IACLManager.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IACLManager.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IACLManager.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IAaveIncentivesController.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IAaveIncentivesController.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IAaveIncentivesController.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IAaveIncentivesController.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IPool.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IPool.sol
similarity index 99%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IPool.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IPool.sol
index ef306e7..3ed53f9 100644
--- a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IPool.sol
+++ b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IPool.sol
@@ -421,7 +421,7 @@ interface IPool {
    * @notice Allows smartcontracts to access the liquidity of the pool within one transaction,
    * as long as the amount taken plus a fee is returned.
    * @dev IMPORTANT There are security concerns for developers of flashloan receiver contracts that must be kept
-   * into consideration. For further details please visit https://docs.aave.com/developers/
+   * into consideration. For further details please visit https://developers.aave.com
    * @param receiverAddress The address of the contract receiving the funds, implementing IFlashLoanReceiver interface
    * @param assets The addresses of the assets being flash-borrowed
    * @param amounts The amounts of the assets being flash-borrowed
@@ -448,7 +448,7 @@ interface IPool {
    * @notice Allows smartcontracts to access the liquidity of the pool within one transaction,
    * as long as the amount taken plus a fee is returned.
    * @dev IMPORTANT There are security concerns for developers of flashloan receiver contracts that must be kept
-   * into consideration. For further details please visit https://docs.aave.com/developers/
+   * into consideration. For further details please visit https://developers.aave.com
    * @param receiverAddress The address of the contract receiving the funds, implementing IFlashLoanSimpleReceiver interface
    * @param asset The address of the asset being flash-borrowed
    * @param amount The amount of the asset being flash-borrowed
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/configuration/ReserveConfiguration.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/configuration/ReserveConfiguration.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/configuration/ReserveConfiguration.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/configuration/ReserveConfiguration.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/configuration/UserConfiguration.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/configuration/UserConfiguration.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/configuration/UserConfiguration.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/configuration/UserConfiguration.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
similarity index 98%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
index 990069e..1dacaf3 100644
--- a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
+++ b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
@@ -67,7 +67,7 @@ library Errors {
   string public constant PRICE_ORACLE_SENTINEL_CHECK_FAILED = '59'; // 'Price oracle sentinel validation failed'
   string public constant ASSET_NOT_BORROWABLE_IN_ISOLATION = '60'; // 'Asset is not borrowable in isolation mode'
   string public constant RESERVE_ALREADY_INITIALIZED = '61'; // 'Reserve has already been initialized'
-  string public constant USER_IN_ISOLATION_MODE_OR_LTV_ZERO = '62'; // 'User is in isolation mode or ltv is zero'
+  string public constant USER_IN_ISOLATION_MODE = '62'; // 'User is in isolation mode'
   string public constant INVALID_LTV = '63'; // 'Invalid ltv parameter for the reserve'
   string public constant INVALID_LIQ_THRESHOLD = '64'; // 'Invalid liquidity threshold parameter for the reserve'
   string public constant INVALID_LIQ_BONUS = '65'; // 'Invalid liquidity bonus parameter for the reserve'
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/math/WadRayMath.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/math/WadRayMath.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/math/WadRayMath.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/math/WadRayMath.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/tokenization/base/IncentivizedERC20.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/tokenization/base/IncentivizedERC20.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/core-v3/contracts/protocol/tokenization/base/IncentivizedERC20.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/core-v3/contracts/protocol/tokenization/base/IncentivizedERC20.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol
similarity index 98%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol
index 52288df..d38941e 100644
--- a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol
+++ b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol
@@ -106,11 +106,12 @@ contract UiIncentiveDataProviderV3 is IUiIncentiveDataProviderV3 {
       IRewardsController vTokenIncentiveController = IRewardsController(
         address(IncentivizedERC20(baseData.variableDebtTokenAddress).getIncentivesController())
       );
+      address[] memory vTokenRewardAddresses = vTokenIncentiveController.getRewardsByAsset(
+        baseData.variableDebtTokenAddress
+      );
       RewardInfo[] memory vRewardsInformation;
+
       if (address(vTokenIncentiveController) != address(0)) {
-        address[] memory vTokenRewardAddresses = vTokenIncentiveController.getRewardsByAsset(
-          baseData.variableDebtTokenAddress
-        );
         vRewardsInformation = new RewardInfo[](vTokenRewardAddresses.length);
         for (uint256 j = 0; j < vTokenRewardAddresses.length; ++j) {
           RewardInfo memory rewardInformation;
@@ -160,11 +161,12 @@ contract UiIncentiveDataProviderV3 is IUiIncentiveDataProviderV3 {
       IRewardsController sTokenIncentiveController = IRewardsController(
         address(IncentivizedERC20(baseData.stableDebtTokenAddress).getIncentivesController())
       );
+      address[] memory sTokenRewardAddresses = sTokenIncentiveController.getRewardsByAsset(
+        baseData.stableDebtTokenAddress
+      );
       RewardInfo[] memory sRewardsInformation;
+
       if (address(sTokenIncentiveController) != address(0)) {
-        address[] memory sTokenRewardAddresses = sTokenIncentiveController.getRewardsByAsset(
-          baseData.stableDebtTokenAddress
-        );
         sRewardsInformation = new RewardInfo[](sTokenRewardAddresses.length);
         for (uint256 j = 0; j < sTokenRewardAddresses.length; ++j) {
           RewardInfo memory rewardInformation;
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/misc/interfaces/IEACAggregatorProxy.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/misc/interfaces/IEACAggregatorProxy.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/misc/interfaces/IEACAggregatorProxy.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/misc/interfaces/IEACAggregatorProxy.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/misc/interfaces/IUiIncentiveDataProviderV3.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/misc/interfaces/IUiIncentiveDataProviderV3.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/misc/interfaces/IUiIncentiveDataProviderV3.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/misc/interfaces/IUiIncentiveDataProviderV3.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/rewards/interfaces/IRewardsController.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/rewards/interfaces/IRewardsDistributor.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/rewards/interfaces/IRewardsDistributor.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/rewards/interfaces/IRewardsDistributor.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/rewards/interfaces/IRewardsDistributor.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/rewards/interfaces/ITransferStrategyBase.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/rewards/interfaces/ITransferStrategyBase.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/rewards/interfaces/ITransferStrategyBase.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/rewards/interfaces/ITransferStrategyBase.sol
diff --git a/src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/rewards/libraries/RewardsDataTypes.sol b/src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/rewards/libraries/RewardsDataTypes.sol
similarity index 100%
rename from src/downloads/metis/UI_INCENTIVE_DATA_PROVIDER/@aave/periphery-v3/contracts/rewards/libraries/RewardsDataTypes.sol
rename to src/downloads/mainnet/UI_INCENTIVE_DATA_PROVIDER/UiIncentiveDataProviderV3/@aave/periphery-v3/contracts/rewards/libraries/RewardsDataTypes.sol
```

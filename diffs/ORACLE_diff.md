```diff
diff --git a/src/downloads/metis/ORACLE/@aave/core-v3/contracts/dependencies/chainlink/AggregatorInterface.sol b/src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/dependencies/chainlink/AggregatorInterface.sol
similarity index 100%
rename from src/downloads/metis/ORACLE/@aave/core-v3/contracts/dependencies/chainlink/AggregatorInterface.sol
rename to src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/dependencies/chainlink/AggregatorInterface.sol
diff --git a/src/downloads/metis/ORACLE/@aave/core-v3/contracts/interfaces/IACLManager.sol b/src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/interfaces/IACLManager.sol
similarity index 100%
rename from src/downloads/metis/ORACLE/@aave/core-v3/contracts/interfaces/IACLManager.sol
rename to src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/interfaces/IACLManager.sol
diff --git a/src/downloads/metis/ORACLE/@aave/core-v3/contracts/interfaces/IAaveOracle.sol b/src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/interfaces/IAaveOracle.sol
similarity index 100%
rename from src/downloads/metis/ORACLE/@aave/core-v3/contracts/interfaces/IAaveOracle.sol
rename to src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/interfaces/IAaveOracle.sol
diff --git a/src/downloads/metis/ORACLE/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol b/src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
similarity index 100%
rename from src/downloads/metis/ORACLE/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
rename to src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
diff --git a/src/downloads/metis/ORACLE/@aave/core-v3/contracts/interfaces/IPriceOracleGetter.sol b/src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/interfaces/IPriceOracleGetter.sol
similarity index 100%
rename from src/downloads/metis/ORACLE/@aave/core-v3/contracts/interfaces/IPriceOracleGetter.sol
rename to src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/interfaces/IPriceOracleGetter.sol
diff --git a/src/downloads/metis/ORACLE/@aave/core-v3/contracts/misc/AaveOracle.sol b/src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/misc/AaveOracle.sol
similarity index 100%
rename from src/downloads/metis/ORACLE/@aave/core-v3/contracts/misc/AaveOracle.sol
rename to src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/misc/AaveOracle.sol
diff --git a/src/downloads/metis/ORACLE/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol b/src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
similarity index 98%
rename from src/downloads/metis/ORACLE/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
rename to src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
index 990069e..1dacaf3 100644
--- a/src/downloads/metis/ORACLE/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
+++ b/src/downloads/mainnet/ORACLE/AaveOracle/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
@@ -67,7 +67,7 @@ library Errors {
   string public constant PRICE_ORACLE_SENTINEL_CHECK_FAILED = '59'; // 'Price oracle sentinel validation failed'
   string public constant ASSET_NOT_BORROWABLE_IN_ISOLATION = '60'; // 'Asset is not borrowable in isolation mode'
   string public constant RESERVE_ALREADY_INITIALIZED = '61'; // 'Reserve has already been initialized'
-  string public constant USER_IN_ISOLATION_MODE_OR_LTV_ZERO = '62'; // 'User is in isolation mode or ltv is zero'
+  string public constant USER_IN_ISOLATION_MODE = '62'; // 'User is in isolation mode'
   string public constant INVALID_LTV = '63'; // 'Invalid ltv parameter for the reserve'
   string public constant INVALID_LIQ_THRESHOLD = '64'; // 'Invalid liquidity threshold parameter for the reserve'
   string public constant INVALID_LIQ_BONUS = '65'; // 'Invalid liquidity bonus parameter for the reserve'
```

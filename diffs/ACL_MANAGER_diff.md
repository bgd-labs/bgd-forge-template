```diff
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/AccessControl.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/AccessControl.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/AccessControl.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/AccessControl.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Context.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Context.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Context.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Context.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/ERC165.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/ERC165.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/ERC165.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/ERC165.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IAccessControl.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IAccessControl.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IAccessControl.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IAccessControl.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC165.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC165.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC165.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC165.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Strings.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Strings.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Strings.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Strings.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/interfaces/IACLManager.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/interfaces/IACLManager.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/interfaces/IACLManager.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/interfaces/IACLManager.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/protocol/configuration/ACLManager.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/protocol/configuration/ACLManager.sol
similarity index 100%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/protocol/configuration/ACLManager.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/protocol/configuration/ACLManager.sol
diff --git a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
similarity index 98%
rename from src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
rename to src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
index 990069e..1dacaf3 100644
--- a/src/downloads/metis/ACL_MANAGER/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
+++ b/src/downloads/mainnet/ACL_MANAGER/ACLManager/@aave/core-v3/contracts/protocol/libraries/helpers/Errors.sol
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

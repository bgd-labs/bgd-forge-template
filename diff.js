require("dotenv").config();
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const { AaveV3Ethereum } = require("@bgd-labs/aave-address-book");

// ETHERSCAN START
const API_KEYS = {
  mainnet: process.env.ETHERSCAN_API_KEY_MAINNET,
};

function runCmd(cmd) {
  var resp = child_process.execSync(cmd);
  var result = resp.toString("UTF8");
  return result;
}

function download(chain, name, address) {
  if (!fs.existsSync(`src/downloads/${chain}/${name}`)) {
    runCmd(
      `cast etherscan-source --chain ${chain} -d src/downloads/${chain}/${name} ${address} --etherscan-api-key ${API_KEYS[chain]}`
    );
    runCmd(`npm run lint:fix:specific -- src/downloads/${chain}/${name}`);
  }
}

function getImpl(chain, address) {
  return utils.hexStripZeros(
    runCmd(
      `cast storage --rpc-url ${chain} ${address} 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc`
    ).replace("\n", ""),
    32
  );
}
// ETHERSCAN END

// BLOCKSCOUT START
async function getSource(addressHash) {
  const response = await fetch(
    `https://andromeda-explorer.metis.io/api?module=contract&action=getsourcecode&address=${addressHash}`
  );
  return response.json();
}

function writeFiles(response, prefix) {
  writeFile(response.result[0].FileName, response.result[0].SourceCode, prefix);
  response.result[0].AdditionalSources.forEach((element) => {
    writeFile(element.Filename, element.SourceCode, prefix);
  });
}

function writeFile(filename, src, prefix) {
  const sourcePath = filename.match(/^(.*)\/.*$/)[1];
  fs.mkdirSync(path.join(process.cwd(), prefix, sourcePath), {
    recursive: true,
  });
  fs.writeFileSync(path.join(process.cwd(), prefix, filename), src);
}
// BLOCKSCOUT END

const METIS = {
  POOL_ADDRESSES_PROVIDER: "0x632bf4054334F263F49a7039Cce25f0294f3f667",
  POOL: "0xb4bcdE07701494925455967814BFFA7eD5B4d568",
  POOL_CONFIGURATOR: "0x311ACE634E6AbfFf83480B9Ba328a89503932258",
  ORACLE: "0x5859B57b919035D82ED2Dd3F1f708dB13302614e",
  AAVE_PROTOCOL_DATA_PROVIDER: "0xd530b9cffAaAFA5B3cD835e990942c9FDa10BD18",
  ACL_MANAGER: "0x153f7b80b68EB3f296fb420F8Be847b1933854c4",
  // ACL_ADMIN: "0x8EC77963068474a45016938Deb95E603Ca82a029", doesn't make sense to diff
  COLLECTOR: "0x90dA620955B942613A6Fae754aE66F0C37a364e0",
  DEFAULT_INCENTIVES_CONTROLLER: "0xf33A80b8810bC56D574316ff17B91e1C06D6289D",
  DEFAULT_A_TOKEN_IMPL_REV_1: "0x2954c4494B3De43C69a38EfaE076507F31a385C5",
  DEFAULT_VARIABLE_DEBT_TOKEN_IMPL_REV_1:
    "0xAF3CcbaA1E30B61235ead8E056E0F2B4B5A73851",
  DEFAULT_STABLE_DEBT_TOKEN_IMPL_REV_1:
    "0x0B0c10cBD39D449F0FC6522E8eb1Cf734BD8daB7",
  EMISSION_MANAGER: "0x06010e7D435C5283467382dA9BdEf26fB6D4fA82",
  POOL_ADDRESSES_PROVIDER_REGISTRY:
    "0xb7a29601F1eEe75438D6Aa04969B124f6ED635Be",
  // WETH_GATEWAY: "0x76D3030728e52DEB8848d5613aBaDE88441cbc59", no gateway on metis
  // SWAP_COLLATERAL_ADAPTER: "0xBC2Ff189e0349Ca73D9b78c172FC2B40025abE2a", does not exist
  // RATES_FACTORY: "0x59ED955e3a34479F4a35dCBD794BA70D6319CFcC", not verified
  // LISTING_ENGINE: "0xb0A73671C97BAC9Ba899CD1a23604Fd2278cD02A", not verified
  WALLET_BALANCE_PROVIDER: "0x91b6C4ee40e6819Ea075712DB5A11459ded1b5fC",
  UI_POOL_DATA_PROVIDER: "0xFF3a3E8112Da865CA669E61257E6C21AF6D9F586",
  UI_INCENTIVE_DATA_PROVIDER: "0xB71eA83ee96246B3221bf7E8eaED737f126fc2AF",
  // L2_ENCODER: "0x57b1F9Fd95BB068784C10aDF6F0A49CB16c5E8C8", cannot compare with mainnet actually
  BORROW_LOGIC: "0xd472AE2A8a1D633B6eF218C226f1d5176e83D23F",
  BRIDGE_LOGIC: "0x88FB589271BCaDB0422c6371FcDfF653Af2C6380",
  CONFIGURATOR_LOGIC: "0x855cC1dE157F1158F22037f7AC6eFe802FA666e1",
  E_MODE_LOGIC: "0xBfD5f3C3c22B26bEa577ab05305b236Da3607D1D",
  FLASHLOAN_LOGIC: "0xEF33A00f5B5C4fC25Db0F8E2C1027dF547eb78A5",
  LIQUIDATION_LOGIC: "0x00F1Cf4032d40923B0C784Cc88f8F825Dc5c367d",
  POOL_LOGIC: "0x645f5E275F965A39b3387Be5792B744955B208cf",
  SUPPLY_LOGIC: "0xc6bDF8A004cd41483c8Ae19882840dE5ffF50e6E",
};

// spread so we can overwrite & extend
const MAINNET = {
  ...AaveV3Ethereum,
  BORROW_LOGIC: "0x5d834EAD0a80CF3b88c06FeeD6e8E0Fcae2daEE5",
  BRIDGE_LOGIC: "0x57572C9e795F4B6A748EFBeAB7E0a1B9996A0A24",
  CONFIGURATOR_LOGIC: "0x7406aba1Aa5fE5cd71d958CE10fc28c416a33aA0",
  E_MODE_LOGIC: "0xeAbd65827E91Ac3aE5471C11A329fbc675cA46d6",
  FLASHLOAN_LOGIC: "0x0A62276bFBF1Ad8443f37Da8630d407408085c8b",
  LIQUIDATION_LOGIC: "0xe175De51F29d822b86e46A9A61246Ec90631210D",
  POOL_LOGIC: "0xD5256981e08492AFc543aF2a779Af989E9f9F7e7",
  SUPPLY_LOGIC: "0x39dF4b1329D41A9AE20e17BeFf39aAbd2f049128",
};

async function main() {
  for (const key of Object.keys(METIS)) {
    console.log(key);
    if (!fs.existsSync(`src/downloads/metis/${key}`)) {
      const source = await getSource(METIS[key]);
      writeFiles(source, `src/downloads/metis/${key}`);
      runCmd(`npm run lint:fix:specific -- src/downloads/metis/${key}`);
    }
    download("mainnet", key, MAINNET[key]);
    runCmd(
      `make git-diff before=src/downloads/metis/${key} after=src/downloads/mainnet/${key} out=${key}_diff`
    );
  }
}

main();

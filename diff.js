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
  ORACLE: "0x5859B57b919035D82ED2Dd3F1f708dB13302614e",
  ACL_MANAGER: "0x153f7b80b68EB3f296fb420F8Be847b1933854c4",
  DEFAULT_A_TOKEN_IMPL_REV_1: "0x2954c4494B3De43C69a38EfaE076507F31a385C5",
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
  await Promise.all(
    Object.keys(METIS).map(async (key) => {
      if (!fs.existsSync(`src/downloads/metis/${key}`)) {
        const source = await getSource(METIS[key]);
        writeFiles(source, `src/downloads/metis/${key}`);
        runCmd(`npm run lint:fix:specific -- src/downloads/metis/${key}`);
      }
      download("mainnet", key, MAINNET[key]);
      runCmd(
        `make git-diff before=src/downloads/metis/${key} after=src/downloads/mainnet/${key} out=${key}_diff`
      );
    })
  );
}

main();

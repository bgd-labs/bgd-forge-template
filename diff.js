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
};

// spread so we can overwrite & extend
const MAINNET = {
  ...AaveV3Ethereum,
};

async function main() {
  await Promise.all(
    Object.keys(METIS).map(async (key) => {
      const source = await getSource(METIS[key]);
      writeFiles(source, `src/downloads/metis/${key}`);
      download("mainnet", key, MAINNET[key]);
      runCmd("npm run lint:fix");
      runCmd(
        `make git-diff before=src/downloads/metis/${key} after=src/downloads/mainnet/${key} out=${key}_diff`
      );
    })
  );
}

main();

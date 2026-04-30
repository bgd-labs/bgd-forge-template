# BGD forge template

[![Coverage badge](./report/coverage.svg)](https://bgd-labs.github.io/bgd-forge-template/)

Foundry-based Solidity project template with built-in formatting, linting, coverage, and gas reporting.

To create a new project using this template run

```shell
$ forge init --template bgd-labs/bgd-forge-template my_new_project
```

## Recommended modules

[bgd-labs/solidity-utils](https://github.com/bgd-labs/solidity-utils) - common contracts we use everywhere, ie transparent proxy and around

[bgd-labs/aave-address-book](https://github.com/bgd-labs/aave-address-book) - the best and only source about all deployed Aave ecosystem related contracts across all the chains

[bgd-labs/aave-helpers](https://github.com/bgd-labs/aave-helpers) - useful utils for integration, and not only testing related to Aave ecosystem contracts

[Rari-Capital/solmate](https://github.com/Rari-Capital/solmate) - one of the best sources of base contracts for ERC20, ERC21, which will work with transparent proxy pattern out of the box

[OpenZeppelin/openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) - another very reputable and well organized source of base contracts for tokens, access control and many others

## Development

This project uses [Foundry](https://getfoundry.sh). See the [book](https://book.getfoundry.sh/getting-started/installation.html) for detailed instructions on how to install and use Foundry.
The template ships with sensible defaults so you can use default `foundry` commands without resorting to `MakeFile`.

### Setup

```sh
cp .env.example .env
forge install
```

#### Keystore Wallet

For deployments, the template uses Foundry's encrypted keystore instead of plaintext private keys. The template defaults to a keystore named `deployer`, but you can use any name you want — just make sure `KEYSTORE_ACCOUNT` matches.

To create the keystore:

```sh
cast wallet import deployer --interactive
```

You will be prompted for your private key and a password to encrypt it:

```
Enter private key:
Enter password:
`deployer` keystore was saved successfully. Address: 0x...
```

Then set `KEYSTORE_ACCOUNT` and `KEYSTORE_PASSWORD` in your `.env`.

### Build & Test

```sh
forge build
forge test
```

### Formatting & Linting

The template uses `forge fmt` for Solidity formatting and `forge lint` for linting — no external dependencies needed.

```sh
make fmt        # format solidity files
make fmt-check  # check formatting without modifying
make lint       # run the forge linter
```

### Coverage

Generate an lcov coverage report with an HTML output (requires `lcov` and `genhtml` installed):

```sh
make coverage
```

This generates an HTML report in `report/`.

### Gas Reporting

```sh
make gas-report    # print gas report for all contracts
make snapshot      # create .gas-snapshot baseline
make snapshot-diff # compare current gas usage against baseline
```

### Documentation

Generate NatSpec documentation from source contracts:

```sh
make doc
```

## Advanced features

### Diffing

For contracts upgrading implementations it's quite important to diff the implementation code to spot potential issues and ensure only the intended changes are included.
Therefore the `Makefile` includes some commands to streamline the diffing process.

#### Download

You can `download` the current contract code of a deployed contract via `make download chain=polygon address=0x00`. This will download the contract source for specified address to `src/etherscan/chain_address`. This command works for all chains with a etherscan compatible block explorer.

#### Git diff

You can `git-diff` a downloaded contract against your src via `make git-diff before=./etherscan/chain_address after=./src out=filename`. This command will diff the two folders via git patience algorithm and write the output to `diffs/filename.md`.

**Caveat**: If the onchain implementation was verified using flatten, for generating the diff you need to flatten the new contract via `forge flatten` and supply the flattened file instead of the whole `./src` folder.

# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

# deps
update:; forge update

# Build & test
build  :; forge build --sizes
test   :; forge test -vvv

# Formatting & linting
fmt       :; forge fmt
fmt-check :; forge fmt --check
lint      :; forge lint

# Gas reports
gas-report :; forge test --mp 'tests/gas/*.t.sol' --isolate

# Coverage
coverage :; forge coverage --report lcov --no-match-coverage "(scripts|tests)"

# Documentation
doc :; forge doc --build

# Utilities
download :; cast etherscan-source --chain ${chain} -d src/etherscan/${chain}_${address} ${address}
git-diff :
	@mkdir -p diffs
	@forge fmt ${before} ${after}
	@printf '%s\n%s\n%s\n' "\`\`\`diff" "$$(git diff --no-index --diff-algorithm=patience --ignore-space-at-eol ${before} ${after})" "\`\`\`" > diffs/${out}.md

# Deploy
deploy-ledger :; forge script ${contract} --rpc-url ${chain} $(if ${dry},--sender 0x25F2226B597E8F9514B3F68F00f494cF4f286491 -vvvv, --ledger --mnemonic-indexes ${MNEMONIC_INDEX} --sender ${LEDGER_SENDER} --verify --verifier etherscan -vvvv --slow --broadcast)
deploy-keystore :; forge script ${contract} --rpc-url ${chain} $(if ${dry},--sender 0x25F2226B597E8F9514B3F68F00f494cF4f286491 -vvvv, --account ${KEYSTORE_ACCOUNT} --password ${KEYSTORE_PASSWORD} --verify --verifier etherscan -vvvv --slow --broadcast)

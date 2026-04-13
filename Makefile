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

# Gas reports & snapshots
gas-report :; forge test --gas-report
snapshot   :; forge snapshot
snapshot-diff :; forge snapshot --diff

# Coverage
coverage-base :; forge coverage --report lcov --no-match-coverage "(scripts|tests)"
coverage-report :; genhtml ./lcov.info -o report --branch-coverage --rc derive_function_end_line=0
coverage-badge :; coverage=$$(awk -F '[<>]' '/headerCovTableEntryHi/{print $$3}' ./report/index.html | sed 's/[^0-9.]//g' | head -n 1); \
	wget -O ./report/coverage.svg "https://img.shields.io/badge/coverage-$${coverage}%25-brightgreen"
coverage :
	make coverage-base
	make coverage-report
	make coverage-badge

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
deploy-pk :; forge script ${contract} --rpc-url ${chain} $(if ${dry},--sender 0x25F2226B597E8F9514B3F68F00f494cF4f286491 -vvvv, --private-key ${PRIVATE_KEY} --verify --verifier etherscan -vvvv --slow --broadcast --verifier etherscan)

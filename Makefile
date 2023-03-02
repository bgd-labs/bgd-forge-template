# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

# deps
update:; forge update


# Utilities
download :; cast etherscan-source --chain ${chain} -d src/etherscan/${chain}_${address} ${address}
git-diff :
	@mkdir -p diffs
	@printf '%s\n%s\n%s\n' "\`\`\`diff" "$$(git diff --no-index --diff-algorithm=patience --ignore-space-at-eol ${before} ${after})" "\`\`\`" > diffs/${out}.md


# Build & test
build  :; forge build --sizes --via-ir
test   :; forge test -vvv

# Base script configuration
BASE_LEDGER = --legacy --ledger --mnemonic-indexes $(MNEMONIC_INDEX) --sender $(LEDGER_SENDER)
BASE_KEY = --private-key ${PRIVATE_KEY}

custom_ethereum-testnet := --gas-estimate-multiplier 200

# params:
#  1 - path/file_name
#  2 - network name
#  3 - script to call if not the same as network name (optional)
#  To define custom params per network add vars custom_network-name.
#  To use ledger, set LEDGER=true to env.
#  By default deploys to the chains specified in (3),
#  if your contracts are testnet agnostic, set TESTNET=true to env, it will change network names to network_name-testnet
define deploy_single_fn
forge script \
 scripts/$(1).s.sol:$(if $(3),$(3),$(shell UP=$(2); echo $${UP} | perl -nE 'say ucfirst')) \
 --rpc-url $(if $(TESTNET),$(2)-testnet,$(2)) --broadcast --verify -vvvv \
 $(if $(LEDGER),$(BASE_LEDGER),$(BASE_KEY)) \
 $(custom_$(if $(TESTNET),$(2)-testnet,$(2)))

endef

define deploy_fn
 $(foreach network,$(2),$(call deploy_single_fn,$(1),$(network),$(3)))
endef


# Deployment scripts

# Deploy Ghost on all networks
deploy-ghost-multi-chain:
	$(call deploy_fn,Ghost,ethereum avalanche)

deploy-ghost-custom:
	$(call deploy_fn,Ghost,ethereum,CustomDeploy)

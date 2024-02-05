# Certora 

This folder provides a fully functional skeleton for integrating with Certora.
There are two configurations:



## Run From the Command Line

Follow this guide to install the prover and its dependencies:
[Installation Guide](https://docs.certora.com/en/latest/docs/user-guide/getting-started/install.html)

Once installations are set, run from this directory:  
`certoraRun ./certora/confs/ghost.conf`  

## Recommended IDE

We recommended using VSCode with the following extension:
[Certora Verification Language LSP](https://marketplace.visualstudio.com/items?itemName=Certora.evmspec-lsp)
This extension is found in the VSCode extensions/marketplace. It provides syntactic support for the Certora Verification Language (CVL) - the language in which we will be writing specifications.
 
## Files

The folder `specs` contains the specification files: 
1. `ghost.spec` contains basic rules that are not dependent on any interface.
2. `moreExmaplesERC20.spec` contains basic examples including ghost, hooks, and multi-contract features.

Folder `confs` contains the configuration files for running the Certora Prover:  
1. File `ghost.conf` for running `ghost.spec` on `ghost.sol` file.  
This configuration is suitable for a standalone project, containing:  
    * external calls are assumed to be non-state changing and return random values on each call.  
    * loops are unrolled three times.   
    * calls to fallbacks are assumed to be side-effect-free and only update the native balance.   
2. File `ghostWithERC20s.conf` running `moreExmaplesERC20.spec` on `ghost.sol` with additional ERC20-related contracts.   
This demonstrates how to set up a project with multi-contract 


## CI Integration

This repository contains a Certora setup in GitHub actions.
You will need to provide your secret `CERTORAKEY` to GitHub. 



## Mutation Testing
The Certora Prover is integrated with <a href=https://www.certora.com/gambit>Gambit</a>, an open-source Solidity mutation testing tool. Mutation testing can give you an estimate of the coverage of your verification.

To run the mutation test from this directory, run:  
 `certoraMutate --prover_conf certora/confs/ghost.conf --mutation_conf certora/confs/mutation.mconf`. 
 However, this does not generate any mutates as 'ghost.sol' is too small. 
 `certoraMutate --prover_conf certora/confs/ghostWithERC20s.conf --mutation_conf certora/confs/mutationWithERC20.mconf ` mutates `SimpleERC20.sol`.  


## CVL Examples and Docs
See more <a href="https://github.com/Certora/Examples/tree/master/CVLByExample" target="_blank">CVL specification general examples</a>
and <a href="https://docs.certora.com" target="_blank">Documenation</a>.
More mutation configurations can be found in the [certoraInit repo](https://github.com/Certora/CertoraInit"). 

# Certora 

This folder provides a fully functional skeleton for integrating with Certora.
There are two configurations:



## Run From the Command Line

To run the checks from the command line, first install the Python SDK:
`pip install certora-cli`

Set your Certora Key:  
`export CERTORAKEY=<personal_access_key>` 

Then run from this directory:  
`certoraRun ./certora/confs/ghost.conf`  
 
## Files

Folder `specs` contains the specification files: 
1. `ghost.spec` contains basic rules that are not dependent on any interface.
1. `moreExmaplesERC20.spec` contains basic examples including ghost, hooks, and multi-contract features.

Folder `confs` contains the configuration files for running the Certora Prover:  
1. File `ghost.conf` for running `ghost.spec` on `ghost.sol` file.  
This configuration is suitable for a standalone project, containing:  
    * external calls are assumed to be non-state changing and returning random value on each call.  
    * loops are unrolled three times.   
    * calls to fallbacks are assumed to be side-effect-free and only update the native balance.   
 1. File `ghostWithERC20s.conf` running `moreExmaplesERC20.spec` on `ghost.sol` with additional ERC20-related contracts.   
This demonstrates how to setup a project with multi-contract 


## CI Integration

This repository contains a Certora setup in GitHub actions.
You will need to provide your secret `CERTORAKEY` to GitHub, 



## Mutation Testing
The Certora Prover is integrated with <a href=https://www.certora.com/gambit>Gambit</a>, an open-source Solidity mutation testing tool. Mutation testing can give you an estimate of the coverage of your verification.

To run the mutation test from this directory, run `certoraMutate --prover_conf certora/confs/ghost.conf --mutation_conf certora/confs/mutation.mconf`


## CVL Examples and Docs
See more <a href="https://github.com/Certora/Examples/tree/master/CVLByExample" target="_blank">CVL specification general examples</a>
and  <a href="https://docs.certora.com" target="_blank">Documenation</a>.
More mutation configurations can be found in the [certoraInit repo](https://github.com/Certora/CertoraInit"). 

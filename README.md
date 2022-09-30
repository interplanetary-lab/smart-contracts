# SMART CONTRACTS

[![Ethereum Version][ethereum-image]][ethereum-url]
[![Solidity][solidity-image]][solidity-url]

<!-- Markdown link & img dfn's -->
[ethereum-image]: https://img.shields.io/badge/Ethereum-purple?logo=Ethereum
[ethereum-url]: https://ethereum.org/fr/
[solidity-image]: https://img.shields.io/badge/Solidity_v0.8-gray?logo=Solidity
[solidity-url]: https://docs.soliditylang.org

**Useful toolbox for Interplanetary lab's smart contracts.**

- Provides extensions of [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) libraries with many useful and generic functions.
- Allows inter-compatibility with others tools of Interplanetary lab's.
- Provide audited (comming soon) and tested smart contracts.

## Table of Contents
- [SMART CONTRACTS](#smart-contracts)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Smart contracts](#smart-contracts-1)
    - [ERC721RoundsUpgradeable](#erc721roundsupgradeable)


## Overview

### Installation

```console
$ npm install @interplanetary-lab/smart-contracts
```

### Usage

Once installed, you can use the contracts in the library by importing them:

```solidity
pragma solidity ^0.8.0;

import "@interplanetary-lab/smart-contracts/contracts/ERC721Upgradeable/ERC721RoundsUpgradeable.sol";

contract MyContract is ERC721RoundsUpgradeable {

}
```


## Smart contracts

### ERC721RoundsUpgradeable
[View documentation](./docs/ERC721Upgradeable/ERC721RoundsUpgradeable.md)

**Overview**

Contract allowing the management of mint rounds for [OpenZeppelin ERC721Upgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/token/ERC721/ERC721Upgradeable.sol).
- Create rounds with a start date, a duration, a supply and a price.
- Can setup a private round with a validator address where the mint is authorized through the validator's signature only.
- In a private round, the `maxMint` of a wallet is determined by the validator.


**Usage**

1. Setup public and private mint functions
```solidity
function mint(uint256 roundId, uint256 amount) external payable virtual {
    // My custom requirements 
    // require(
    //    totalMintedBy(msg.sender, roundId) + amount <= maxMintsPerWallet,
    //    "Max allowed"
    // );
    _publicRoundMint(msg.sender, roundId, amount);
}
```

```solidity
function privateMint(
    uint256 roundId,
    uint256 amount,
    uint256 maxMint,
    uint256 payloadExpiration,
    bytes memory sig
) external payable virtual {
    // My custom requirements
    // ...

    _privateRoundMint(
        msg.sender,
        roundId,
        amount,
        maxMint,
        payloadExpiration,
        sig
    );
}
```

2. Setup before and after mint custom requirements
```solidity
function _beforeMint(address to, uint256 amount) internal virtual override {
    // My custom requirements
    // require(_totalMinted + amount <= MAX_SUPPLY, "Supply exceeded");
    super._beforeMint(to, amount);
}
```

3. _(optional)_ Personalize the assignment of identifiers (by default start at 1).
```solidity
function _getNextTokenId(address to, uint256 totalMinted)
    internal
    virtual
    returns (uint256)
{
    // My custom ID attribution function
    return totalMinted + 1;
}
```

4. Gives admin access to setup rounds (here with [OpenZeppelin Ownable](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable))
```solidity
function setupRound(
    uint256 roundId,
    uint32 supply,
    uint64 startTime,
    uint64 duration,
    address validator,
    uint256 price
) external virtual onlyOwner {
    _setupRound(roundId, supply, startTime, duration, validator, price);
}
```

**Signature provider for private mint**

In a private mint, the signature of the validator address must be generated like this: 

```javascript
let message = web3.utils.soliditySha3(
    web3.utils.encodePacked(
        user_address, // The address who want to mint
        payloadExpiration, // The maximum timestamp before the signature is considered invalid
        roundId, // The mint round index
        maxMint, // The maximum token that the user is allowed to mint in the round 
        smartContractAddress, // The address of the smart contract (to maximize security)
        smartContractChainId, // The chainId of the smart contract (to maximize security)
    )
);
return web3.eth.accounts.sign(message, validator_private_key).signature;
```

**Example**

For a complete example, see [DummyERC721RoundsUpgradeable](./contracts/ERC721Upgradeable/exemples/DummyERC721RoundsUpgradeable.sol) smart contract.

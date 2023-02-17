# `ERC1155RoundsUpgradeable`
**Documentation of `ERC1155Upgradeable/ERC1155RoundsUpgradeable.sol`.**



Contract allowing the management of mint rounds for {ERC1155Upgradeable}


## TABLE OF CONTENTS
- [Events](#events)
    - [`RoundSetup`](#ERC1155RoundsUpgradeable-RoundSetup-uint256-uint256-uint32-uint64-uint64-uint256-address-) 
    - [`TransferSingle`](#IERC1155Upgradeable-TransferSingle-address-address-address-uint256-uint256-) (inherited)
    - [`TransferBatch`](#IERC1155Upgradeable-TransferBatch-address-address-address-uint256---uint256---) (inherited)
    - [`ApprovalForAll`](#IERC1155Upgradeable-ApprovalForAll-address-address-bool-) (inherited)
    - [`URI`](#IERC1155Upgradeable-URI-string-uint256-) (inherited)
    - [`Initialized`](#Initializable-Initialized-uint8-) (inherited)

- [Public Functions](#public-functions)
    - [`totalSupply`](#ERC1155RoundsUpgradeable-totalSupply-uint256-) 
    - [`totalMintedBy`](#ERC1155RoundsUpgradeable-totalMintedBy-address-uint256-) 
    - [`allRounds`](#ERC1155RoundsUpgradeable-allRounds--) 
    - [`supportsInterface`](#ERC1155Upgradeable-supportsInterface-bytes4-) (inherited)
    - [`uri`](#ERC1155Upgradeable-uri-uint256-) (inherited)
    - [`balanceOf`](#ERC1155Upgradeable-balanceOf-address-uint256-) (inherited)
    - [`balanceOfBatch`](#ERC1155Upgradeable-balanceOfBatch-address---uint256---) (inherited)
    - [`setApprovalForAll`](#ERC1155Upgradeable-setApprovalForAll-address-bool-) (inherited)
    - [`isApprovedForAll`](#ERC1155Upgradeable-isApprovedForAll-address-address-) (inherited)
    - [`safeTransferFrom`](#ERC1155Upgradeable-safeTransferFrom-address-address-uint256-uint256-bytes-) (inherited)
    - [`safeBatchTransferFrom`](#ERC1155Upgradeable-safeBatchTransferFrom-address-address-uint256---uint256---bytes-) (inherited)

- [Internal Functions](#internal-functions)
    - [`__ERC1155Rounds_init`](#ERC1155RoundsUpgradeable-__ERC1155Rounds_init--) 
    - [`__ERC1155Rounds_init_unchained`](#ERC1155RoundsUpgradeable-__ERC1155Rounds_init_unchained--) 
    - [`_publicRoundMint`](#ERC1155RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-) 
    - [`_privateRoundMint`](#ERC1155RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-) 
    - [`_setupRound`](#ERC1155RoundsUpgradeable-_setupRound-uint256-uint256-uint32-uint64-uint64-address-uint256-) 
    - [`_roundMint`](#ERC1155RoundsUpgradeable-_roundMint-address-uint256-uint256-) 
    - [`_mintWithAmount`](#ERC1155RoundsUpgradeable-_mintWithAmount-address-uint256-uint256-) 
    - [`_checkSignature`](#ERC1155RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-) 
    - [`_beforeRoundMint`](#ERC1155RoundsUpgradeable-_beforeRoundMint-address-uint256-uint256-) 
    - [`_beforeMint`](#ERC1155RoundsUpgradeable-_beforeMint-address-uint256-uint256-) 
    - [`_afterRoundMint`](#ERC1155RoundsUpgradeable-_afterRoundMint-address-uint256-uint256-) 
    - [`_afterMint`](#ERC1155RoundsUpgradeable-_afterMint-address-uint256-uint256-) 
    - [`__ERC1155_init`](#ERC1155Upgradeable-__ERC1155_init-string-) (inherited)
    - [`__ERC1155_init_unchained`](#ERC1155Upgradeable-__ERC1155_init_unchained-string-) (inherited)
    - [`_safeTransferFrom`](#ERC1155Upgradeable-_safeTransferFrom-address-address-uint256-uint256-bytes-) (inherited)
    - [`_safeBatchTransferFrom`](#ERC1155Upgradeable-_safeBatchTransferFrom-address-address-uint256---uint256---bytes-) (inherited)
    - [`_setURI`](#ERC1155Upgradeable-_setURI-string-) (inherited)
    - [`_mint`](#ERC1155Upgradeable-_mint-address-uint256-uint256-bytes-) (inherited)
    - [`_mintBatch`](#ERC1155Upgradeable-_mintBatch-address-uint256---uint256---bytes-) (inherited)
    - [`_burn`](#ERC1155Upgradeable-_burn-address-uint256-uint256-) (inherited)
    - [`_burnBatch`](#ERC1155Upgradeable-_burnBatch-address-uint256---uint256---) (inherited)
    - [`_setApprovalForAll`](#ERC1155Upgradeable-_setApprovalForAll-address-address-bool-) (inherited)
    - [`_beforeTokenTransfer`](#ERC1155Upgradeable-_beforeTokenTransfer-address-address-address-uint256---uint256---bytes-) (inherited)
    - [`_afterTokenTransfer`](#ERC1155Upgradeable-_afterTokenTransfer-address-address-address-uint256---uint256---bytes-) (inherited)
    - [`__ERC165_init`](#ERC165Upgradeable-__ERC165_init--) (inherited)
    - [`__ERC165_init_unchained`](#ERC165Upgradeable-__ERC165_init_unchained--) (inherited)
    - [`__Context_init`](#ContextUpgradeable-__Context_init--) (inherited)
    - [`__Context_init_unchained`](#ContextUpgradeable-__Context_init_unchained--) (inherited)
    - [`_msgSender`](#ContextUpgradeable-_msgSender--) (inherited)
    - [`_msgData`](#ContextUpgradeable-_msgData--) (inherited)
    - [`_disableInitializers`](#Initializable-_disableInitializers--) (inherited)



- [Modifiers](#modifiers)
    - [`initializer`](#Initializable-initializer--) (inherited)
    - [`reinitializer`](#Initializable-reinitializer-uint8-) (inherited)
    - [`onlyInitializing`](#Initializable-onlyInitializing--) (inherited)

- [Structs](#structs)
    - [`Round`](#ERC1155RoundsUpgradeable-Round) 



## EVENTS

### `RoundSetup(uint256 roundId, uint256 tokenId, uint32 supply, uint64 startTime, uint64 duration, uint256 price, address validator)`  <a name="ERC1155RoundsUpgradeable-RoundSetup-uint256-uint256-uint32-uint64-uint64-uint256-address-" id="ERC1155RoundsUpgradeable-RoundSetup-uint256-uint256-uint32-uint64-uint64-uint256-address-"></a>
Event emitted when a round is created or edited





### `TransferSingle(address operator, address from, address to, uint256 id, uint256 value)` (inherited) <a name="IERC1155Upgradeable-TransferSingle-address-address-address-uint256-uint256-" id="IERC1155Upgradeable-TransferSingle-address-address-address-uint256-uint256-"></a>

Emitted when `value` tokens of token type `id` are transferred from `from` to `to` by `operator`.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol`_.


### `TransferBatch(address operator, address from, address to, uint256[] ids, uint256[] values)` (inherited) <a name="IERC1155Upgradeable-TransferBatch-address-address-address-uint256---uint256---" id="IERC1155Upgradeable-TransferBatch-address-address-address-uint256---uint256---"></a>

Equivalent to multiple {TransferSingle} events, where `operator`, `from` and `to` are the same for all
transfers.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol`_.


### `ApprovalForAll(address account, address operator, bool approved)` (inherited) <a name="IERC1155Upgradeable-ApprovalForAll-address-address-bool-" id="IERC1155Upgradeable-ApprovalForAll-address-address-bool-"></a>

Emitted when `account` grants or revokes permission to `operator` to transfer their tokens, according to
`approved`.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol`_.


### `URI(string value, uint256 id)` (inherited) <a name="IERC1155Upgradeable-URI-string-uint256-" id="IERC1155Upgradeable-URI-string-uint256-"></a>

Emitted when the URI for token type `id` changes to `value`, if it is a non-programmatic URI.
If an {URI} event was emitted for `id`, the standard
https://eips.ethereum.org/EIPS/eip-1155#metadata-extensions[guarantees] that `value` will equal the value
returned by {IERC1155MetadataURI-uri}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol`_.


### `Initialized(uint8 version)` (inherited) <a name="Initializable-Initialized-uint8-" id="Initializable-Initialized-uint8-"></a>

Triggered when the contract has been initialized or reinitialized.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol`_.



## PUBLIC FUNCTIONS

### `totalSupply(uint256 tokenId) → uint256` (public) <a name="ERC1155RoundsUpgradeable-totalSupply-uint256-" id="ERC1155RoundsUpgradeable-totalSupply-uint256-"></a>
Returns the total amount of tokens stored by the contract, by tokenId.



Parameters:
- `tokenId`: The token identifier



### `totalMintedBy(address wallet, uint256 roundId) → uint256` (public) <a name="ERC1155RoundsUpgradeable-totalMintedBy-address-uint256-" id="ERC1155RoundsUpgradeable-totalMintedBy-address-uint256-"></a>
Returns the total amount of tokens minted by `wallet` for `roundId`.





### `allRounds() → struct ERC1155RoundsUpgradeable.Round[]` (public) <a name="ERC1155RoundsUpgradeable-allRounds--" id="ERC1155RoundsUpgradeable-allRounds--"></a>
Returns the array of all rounds stored in the contract.


Starts with the index of roundId 1
Function for web3 first, this one is not recommended for a call
     from another smart contract (can be expensive in gas).




### `supportsInterface(bytes4 interfaceId) → bool` (public) (inherited)<a name="ERC1155Upgradeable-supportsInterface-bytes4-" id="ERC1155Upgradeable-supportsInterface-bytes4-"></a>

See {IERC165-supportsInterface}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `uri(uint256) → string` (public) (inherited)<a name="ERC1155Upgradeable-uri-uint256-" id="ERC1155Upgradeable-uri-uint256-"></a>

See {IERC1155MetadataURI-uri}.
This implementation returns the same URI for *all* token types. It relies
on the token type ID substitution mechanism
https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].
Clients calling this function must replace the `\{id\}` substring with the
actual token type ID.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `balanceOf(address account, uint256 id) → uint256` (public) (inherited)<a name="ERC1155Upgradeable-balanceOf-address-uint256-" id="ERC1155Upgradeable-balanceOf-address-uint256-"></a>

See {IERC1155-balanceOf}.
Requirements:
- `account` cannot be the zero address.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `balanceOfBatch(address[] accounts, uint256[] ids) → uint256[]` (public) (inherited)<a name="ERC1155Upgradeable-balanceOfBatch-address---uint256---" id="ERC1155Upgradeable-balanceOfBatch-address---uint256---"></a>

See {IERC1155-balanceOfBatch}.
Requirements:
- `accounts` and `ids` must have the same length.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `setApprovalForAll(address operator, bool approved)` (public) (inherited)<a name="ERC1155Upgradeable-setApprovalForAll-address-bool-" id="ERC1155Upgradeable-setApprovalForAll-address-bool-"></a>

See {IERC1155-setApprovalForAll}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `isApprovedForAll(address account, address operator) → bool` (public) (inherited)<a name="ERC1155Upgradeable-isApprovedForAll-address-address-" id="ERC1155Upgradeable-isApprovedForAll-address-address-"></a>

See {IERC1155-isApprovedForAll}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)` (public) (inherited)<a name="ERC1155Upgradeable-safeTransferFrom-address-address-uint256-uint256-bytes-" id="ERC1155Upgradeable-safeTransferFrom-address-address-uint256-uint256-bytes-"></a>

See {IERC1155-safeTransferFrom}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)` (public) (inherited)<a name="ERC1155Upgradeable-safeBatchTransferFrom-address-address-uint256---uint256---bytes-" id="ERC1155Upgradeable-safeBatchTransferFrom-address-address-uint256---uint256---bytes-"></a>

See {IERC1155-safeBatchTransferFrom}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


## INTERNAL FUNCTIONS

### `__ERC1155Rounds_init()` (internal)  <a name="ERC1155RoundsUpgradeable-__ERC1155Rounds_init--" id="ERC1155RoundsUpgradeable-__ERC1155Rounds_init--"></a>

See {_setURI}.




### `__ERC1155Rounds_init_unchained()` (internal)  <a name="ERC1155RoundsUpgradeable-__ERC1155Rounds_init_unchained--" id="ERC1155RoundsUpgradeable-__ERC1155Rounds_init_unchained--"></a>






### `_publicRoundMint(address to, uint256 roundId, uint256 amount)` (internal)  <a name="ERC1155RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-" id="ERC1155RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-"></a>

Mint the `amount` of tokens in a round without validator.
Call {ERC721RoundsUpgradeable-_roundMint}.
Requirements:
- Round must not have a validator
- View {ERC721RoundsUpgradeable-_roundMint} requirements



Parameters:
- `to`: The address who want to mint

- `amount`: The number of tokens to mint



### `_privateRoundMint(address to, uint256 roundId, uint256 amount, uint256 maxMint, uint256 payloadExpiration, bytes sig)` (internal)  <a name="ERC1155RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-" id="ERC1155RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-"></a>

Mint the `amount` of tokens with the signature of the round validator.

Requirements:
- Round must have a validator
- Total minted for the user during this round must be less than `maxMint`.
- `sig` must be signed by the validator of the wave and contains all information to check.
- `payloadExpiration` must be less than the block timestamp.
- View {ERC721RoundsUpgradeable-_roundMint} requirements.



Parameters:
- `to`: The address who want to mint

- `roundId`: The mint round index

- `amount`: The number of tokens to mint

- `maxMint`: The maximum token that the user is allowed to mint in the round (verified in `sig`)

- `payloadExpiration`: The maximum timestamp before the signature is considered invalid (verified in `sig`)

- `sig`: The EC signature generated by the wave validator



### `_setupRound(uint256 roundId, uint256 tokenId, uint32 supply, uint64 startTime, uint64 duration, address validator, uint256 price)` (internal)  <a name="ERC1155RoundsUpgradeable-_setupRound-uint256-uint256-uint32-uint64-uint64-address-uint256-" id="ERC1155RoundsUpgradeable-_setupRound-uint256-uint256-uint32-uint64-uint64-address-uint256-"></a>

Create or edit a round

Requirements:
- `roundId` must exist or increment `roundsLength` for create one.
- `roundId` can't be 0.



Parameters:
- `roundId`: The round identifier

- `tokenId`: The token identifier

- `supply`: Number of tokens that can be minted in this round. Can be 0 for no supply control.

- `startTime`: The start date of the round in seconds

- `duration`: The duration of the round in seconds. Can be 0 for no time limitation

- `validator`: The address of the whitelist validator. Can be 'address(0)' for no whitelist

- `price`: The price of the round in ETH (can be 0)



### `_roundMint(address to, uint256 roundId, uint256 amount)` (internal)  <a name="ERC1155RoundsUpgradeable-_roundMint-address-uint256-uint256-" id="ERC1155RoundsUpgradeable-_roundMint-address-uint256-uint256-"></a>

Safely mint the `amount` of tokens for `to` address in accordance with round configuration

Requirements:
- View {ERC721RoundsUpgradeable-_mintWithAmount} Requirements
- `roundId` must exist and be in progress
- The round must have enough supply
- msg.value must contain the price



Parameters:
- `to`: The address who want to mint

- `roundId`: The round index in the current wave

- `amount`: The number of tokens to mint



### `_mintWithAmount(address to, uint256 tokenId, uint256 amount)` (internal)  <a name="ERC1155RoundsUpgradeable-_mintWithAmount-address-uint256-uint256-" id="ERC1155RoundsUpgradeable-_mintWithAmount-address-uint256-uint256-"></a>

Mint the `amount` of tokens for `to`

Requirements:
- `amount` must be above 0
- The supply must not be exceeded with amount

Increase `_totalMinted`



Parameters:
- `to`: The wallet to transfer new tokens

- `tokenId`: The token identifier

- `amount`: The number of tokens to mint



### `_checkSignature(uint256 payloadExpiration, bytes data, bytes sig, address signer)` (internal)  <a name="ERC1155RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-" id="ERC1155RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-"></a>
Reverts if the data does not correspond to the signature, to the correct signer or if it has expired


Requirements:
- `payloadExpiration` must be less than the block timestamp
- `sig` must be a hash of `data`
- `sig` must be signed by `signer`



Parameters:
- `payloadExpiration`: The maximum timestamp before the signature is considered invalid

- `data`: All encoded pack data in order

- `sig`: The EC signature generated by the signatory

- `signer`: The address that is supposed to be the signatory



### `_beforeRoundMint(address to, uint256 roundId, uint256 amount)` (internal)  <a name="ERC1155RoundsUpgradeable-_beforeRoundMint-address-uint256-uint256-" id="ERC1155RoundsUpgradeable-_beforeRoundMint-address-uint256-uint256-"></a>

Hook that is called before any mint in a round

Calling conditions:
- when the correct price was send.
- when round is in progress.
- when round supply not exceeded.



Parameters:
- `to`: The wallet to transfer new tokens

- `roundId`: The mint round index

- `amount`: The number of tokens to mint



### `_beforeMint(address to, uint256 tokenId, uint256 amount)` (internal)  <a name="ERC1155RoundsUpgradeable-_beforeMint-address-uint256-uint256-" id="ERC1155RoundsUpgradeable-_beforeMint-address-uint256-uint256-"></a>

Hook that is called before any mint

Calling conditions:
- amount is not 0.



Parameters:
- `to`: The wallet to transfer new tokens

- `tokenId`: The token identifier

- `amount`: The number of tokens to mint



### `_afterRoundMint(address to, uint256 tokenId, uint256 amount)` (internal)  <a name="ERC1155RoundsUpgradeable-_afterRoundMint-address-uint256-uint256-" id="ERC1155RoundsUpgradeable-_afterRoundMint-address-uint256-uint256-"></a>

Hook that is called after any mint in a round


Parameters:
- `to`: The wallet to transfer new tokens

- `tokenId`: The token identifier

- `amount`: The number of tokens to mint



### `_afterMint(address to, uint256 tokenId, uint256 amount)` (internal)  <a name="ERC1155RoundsUpgradeable-_afterMint-address-uint256-uint256-" id="ERC1155RoundsUpgradeable-_afterMint-address-uint256-uint256-"></a>

Hook that is called after any mint


Parameters:
- `to`: The wallet to transfer new tokens

- `tokenId`: The token identifier

- `amount`: The number of tokens to mint



### `__ERC1155_init(string uri_)` (internal) (inherited) <a name="ERC1155Upgradeable-__ERC1155_init-string-" id="ERC1155Upgradeable-__ERC1155_init-string-"></a>

See {_setURI}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `__ERC1155_init_unchained(string uri_)` (internal) (inherited) <a name="ERC1155Upgradeable-__ERC1155_init_unchained-string-" id="ERC1155Upgradeable-__ERC1155_init_unchained-string-"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)` (internal) (inherited) <a name="ERC1155Upgradeable-_safeTransferFrom-address-address-uint256-uint256-bytes-" id="ERC1155Upgradeable-_safeTransferFrom-address-address-uint256-uint256-bytes-"></a>

Transfers `amount` tokens of token type `id` from `from` to `to`.
Emits a {TransferSingle} event.
Requirements:
- `to` cannot be the zero address.
- `from` must have a balance of tokens of type `id` of at least `amount`.
- If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
acceptance magic value.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)` (internal) (inherited) <a name="ERC1155Upgradeable-_safeBatchTransferFrom-address-address-uint256---uint256---bytes-" id="ERC1155Upgradeable-_safeBatchTransferFrom-address-address-uint256---uint256---bytes-"></a>

xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_safeTransferFrom}.
Emits a {TransferBatch} event.
Requirements:
- If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the
acceptance magic value.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_setURI(string newuri)` (internal) (inherited) <a name="ERC1155Upgradeable-_setURI-string-" id="ERC1155Upgradeable-_setURI-string-"></a>

Sets a new URI for all token types, by relying on the token type ID
substitution mechanism
https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].
By this mechanism, any occurrence of the `\{id\}` substring in either the
URI or any of the amounts in the JSON file at said URI will be replaced by
clients with the token type ID.
For example, the `https://token-cdn-domain/\{id\}.json` URI would be
interpreted by clients as
`https://token-cdn-domain/000000000000000000000000000000000000000000000000000000000004cce0.json`
for token type ID 0x4cce0.
See {uri}.
Because these URIs cannot be meaningfully represented by the {URI} event,
this function emits no events.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_mint(address to, uint256 id, uint256 amount, bytes data)` (internal) (inherited) <a name="ERC1155Upgradeable-_mint-address-uint256-uint256-bytes-" id="ERC1155Upgradeable-_mint-address-uint256-uint256-bytes-"></a>

Creates `amount` tokens of token type `id`, and assigns them to `to`.
Emits a {TransferSingle} event.
Requirements:
- `to` cannot be the zero address.
- If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
acceptance magic value.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_mintBatch(address to, uint256[] ids, uint256[] amounts, bytes data)` (internal) (inherited) <a name="ERC1155Upgradeable-_mintBatch-address-uint256---uint256---bytes-" id="ERC1155Upgradeable-_mintBatch-address-uint256---uint256---bytes-"></a>

xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_mint}.
Emits a {TransferBatch} event.
Requirements:
- `ids` and `amounts` must have the same length.
- If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the
acceptance magic value.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_burn(address from, uint256 id, uint256 amount)` (internal) (inherited) <a name="ERC1155Upgradeable-_burn-address-uint256-uint256-" id="ERC1155Upgradeable-_burn-address-uint256-uint256-"></a>

Destroys `amount` tokens of token type `id` from `from`
Emits a {TransferSingle} event.
Requirements:
- `from` cannot be the zero address.
- `from` must have at least `amount` tokens of token type `id`.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_burnBatch(address from, uint256[] ids, uint256[] amounts)` (internal) (inherited) <a name="ERC1155Upgradeable-_burnBatch-address-uint256---uint256---" id="ERC1155Upgradeable-_burnBatch-address-uint256---uint256---"></a>

xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_burn}.
Emits a {TransferBatch} event.
Requirements:
- `ids` and `amounts` must have the same length.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_setApprovalForAll(address owner, address operator, bool approved)` (internal) (inherited) <a name="ERC1155Upgradeable-_setApprovalForAll-address-address-bool-" id="ERC1155Upgradeable-_setApprovalForAll-address-address-bool-"></a>

Approve `operator` to operate on all of `owner` tokens
Emits an {ApprovalForAll} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_beforeTokenTransfer(address operator, address from, address to, uint256[] ids, uint256[] amounts, bytes data)` (internal) (inherited) <a name="ERC1155Upgradeable-_beforeTokenTransfer-address-address-address-uint256---uint256---bytes-" id="ERC1155Upgradeable-_beforeTokenTransfer-address-address-address-uint256---uint256---bytes-"></a>

Hook that is called before any token transfer. This includes minting
and burning, as well as batched variants.
The same hook is called on both single and batched variants. For single
transfers, the length of the `ids` and `amounts` arrays will be 1.
Calling conditions (for each `id` and `amount` pair):
- When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
of token type `id` will be  transferred to `to`.
- When `from` is zero, `amount` tokens of token type `id` will be minted
for `to`.
- when `to` is zero, `amount` of ``from``'s tokens of token type `id`
will be burned.
- `from` and `to` are never both zero.
- `ids` and `amounts` have the same, non-zero length.
To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `_afterTokenTransfer(address operator, address from, address to, uint256[] ids, uint256[] amounts, bytes data)` (internal) (inherited) <a name="ERC1155Upgradeable-_afterTokenTransfer-address-address-address-uint256---uint256---bytes-" id="ERC1155Upgradeable-_afterTokenTransfer-address-address-address-uint256---uint256---bytes-"></a>

Hook that is called after any token transfer. This includes minting
and burning, as well as batched variants.
The same hook is called on both single and batched variants. For single
transfers, the length of the `id` and `amount` arrays will be 1.
Calling conditions (for each `id` and `amount` pair):
- When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
of token type `id` will be  transferred to `to`.
- When `from` is zero, `amount` tokens of token type `id` will be minted
for `to`.
- when `to` is zero, `amount` of ``from``'s tokens of token type `id`
will be burned.
- `from` and `to` are never both zero.
- `ids` and `amounts` have the same, non-zero length.
To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol`_.


### `__ERC165_init()` (internal) (inherited) <a name="ERC165Upgradeable-__ERC165_init--" id="ERC165Upgradeable-__ERC165_init--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol`_.


### `__ERC165_init_unchained()` (internal) (inherited) <a name="ERC165Upgradeable-__ERC165_init_unchained--" id="ERC165Upgradeable-__ERC165_init_unchained--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol`_.


### `__Context_init()` (internal) (inherited) <a name="ContextUpgradeable-__Context_init--" id="ContextUpgradeable-__Context_init--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol`_.


### `__Context_init_unchained()` (internal) (inherited) <a name="ContextUpgradeable-__Context_init_unchained--" id="ContextUpgradeable-__Context_init_unchained--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol`_.


### `_msgSender() → address` (internal) (inherited) <a name="ContextUpgradeable-_msgSender--" id="ContextUpgradeable-_msgSender--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol`_.


### `_msgData() → bytes` (internal) (inherited) <a name="ContextUpgradeable-_msgData--" id="ContextUpgradeable-_msgData--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol`_.


### `_disableInitializers()` (internal) (inherited) <a name="Initializable-_disableInitializers--" id="Initializable-_disableInitializers--"></a>

Locks the contract, preventing any future reinitialization. This cannot be part of an initializer call.
Calling this in the constructor of a contract will prevent that contract from being initialized or reinitialized
to any version. It is recommended to use this to lock implementation contracts that are designed to be called
through proxies.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol`_.



## MODIFIERS

### `initializer()` (inherited) <a name="Initializable-initializer--" id="Initializable-initializer--"></a>


A modifier that defines a protected initializer function that can be invoked at most once. In its scope,
`onlyInitializing` functions can be used to initialize parent contracts. Equivalent to `reinitializer(1)`.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol`_.


### `reinitializer(uint8 version)` (inherited) <a name="Initializable-reinitializer-uint8-" id="Initializable-reinitializer-uint8-"></a>


A modifier that defines a protected reinitializer function that can be invoked at most once, and only if the
contract hasn't been initialized to a greater version before. In its scope, `onlyInitializing` functions can be
used to initialize parent contracts.
`initializer` is equivalent to `reinitializer(1)`, so a reinitializer may be used after the original
initialization step. This is essential to configure modules that are added through upgrades and that require
initialization.
Note that versions can jump in increments greater than 1; this implies that if multiple reinitializers coexist in
a contract, executing them in the right order is up to the developer or operator.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol`_.


### `onlyInitializing()` (inherited) <a name="Initializable-onlyInitializing--" id="Initializable-onlyInitializing--"></a>


Modifier to protect an initialization function so that it can only be invoked by functions with the
{initializer} and {reinitializer} modifiers, directly or indirectly.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol`_.


## STRUCTS

### `Round`  <a name="ERC1155RoundsUpgradeable-Round" id="ERC1155RoundsUpgradeable-Round"></a>
- uint256 id
- uint256 tokenId
- uint32 supply
- uint64 startTime
- uint64 duration
- uint256 price
- uint256 totalMinted
- address validator




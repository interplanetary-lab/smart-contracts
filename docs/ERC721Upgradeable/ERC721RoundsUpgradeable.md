# `ERC721RoundsUpgradeable`
**Documentation of `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`.**



Contract allowing the management of mint rounds for {ERC721Upgradeable}


## TABLE OF CONTENTS
- [Events](#events)
    - [`RoundSetup`](#ERC721RoundsUpgradeable-RoundSetup-uint256-uint32-uint64-uint64-address-uint256-) 
    - [`Transfer`](#IERC721Upgradeable-Transfer-address-address-uint256-) (inherited)
    - [`Approval`](#IERC721Upgradeable-Approval-address-address-uint256-) (inherited)
    - [`ApprovalForAll`](#IERC721Upgradeable-ApprovalForAll-address-address-bool-) (inherited)
    - [`Initialized`](#Initializable-Initialized-uint8-) (inherited)

- [Public Functions](#public-functions)
    - [`totalSupply`](#ERC721RoundsUpgradeable-totalSupply--) 
    - [`totalMintedBy`](#ERC721RoundsUpgradeable-totalMintedBy-address-uint256-) 
    - [`allRounds`](#ERC721RoundsUpgradeable-allRounds--) 
    - [`supportsInterface`](#ERC721Upgradeable-supportsInterface-bytes4-) (inherited)
    - [`balanceOf`](#ERC721Upgradeable-balanceOf-address-) (inherited)
    - [`ownerOf`](#ERC721Upgradeable-ownerOf-uint256-) (inherited)
    - [`name`](#ERC721Upgradeable-name--) (inherited)
    - [`symbol`](#ERC721Upgradeable-symbol--) (inherited)
    - [`tokenURI`](#ERC721Upgradeable-tokenURI-uint256-) (inherited)
    - [`approve`](#ERC721Upgradeable-approve-address-uint256-) (inherited)
    - [`getApproved`](#ERC721Upgradeable-getApproved-uint256-) (inherited)
    - [`setApprovalForAll`](#ERC721Upgradeable-setApprovalForAll-address-bool-) (inherited)
    - [`isApprovedForAll`](#ERC721Upgradeable-isApprovedForAll-address-address-) (inherited)
    - [`transferFrom`](#ERC721Upgradeable-transferFrom-address-address-uint256-) (inherited)
    - [`safeTransferFrom`](#ERC721Upgradeable-safeTransferFrom-address-address-uint256-) (inherited)
    - [`safeTransferFrom`](#ERC721Upgradeable-safeTransferFrom-address-address-uint256-bytes-) (inherited)

- [Internal Functions](#internal-functions)
    - [`_publicRoundMint`](#ERC721RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-) 
    - [`_privateRoundMint`](#ERC721RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-) 
    - [`_setupRound`](#ERC721RoundsUpgradeable-_setupRound-uint256-uint32-uint64-uint64-address-uint256-) 
    - [`_roundMint`](#ERC721RoundsUpgradeable-_roundMint-address-uint256-uint256-) 
    - [`_mintWithAmount`](#ERC721RoundsUpgradeable-_mintWithAmount-address-uint256-) 
    - [`_getNextTokenId`](#ERC721RoundsUpgradeable-_getNextTokenId-address-uint256-) 
    - [`_checkSignature`](#ERC721RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-) 
    - [`_beforeRoundMint`](#ERC721RoundsUpgradeable-_beforeRoundMint-address-uint256-) 
    - [`_beforeMint`](#ERC721RoundsUpgradeable-_beforeMint-address-uint256-) 
    - [`_afterRoundMint`](#ERC721RoundsUpgradeable-_afterRoundMint-address-uint256-) 
    - [`_afterMint`](#ERC721RoundsUpgradeable-_afterMint-address-uint256-) 
    - [`__ERC721_init`](#ERC721Upgradeable-__ERC721_init-string-string-) (inherited)
    - [`__ERC721_init_unchained`](#ERC721Upgradeable-__ERC721_init_unchained-string-string-) (inherited)
    - [`_baseURI`](#ERC721Upgradeable-_baseURI--) (inherited)
    - [`_safeTransfer`](#ERC721Upgradeable-_safeTransfer-address-address-uint256-bytes-) (inherited)
    - [`_exists`](#ERC721Upgradeable-_exists-uint256-) (inherited)
    - [`_isApprovedOrOwner`](#ERC721Upgradeable-_isApprovedOrOwner-address-uint256-) (inherited)
    - [`_safeMint`](#ERC721Upgradeable-_safeMint-address-uint256-) (inherited)
    - [`_safeMint`](#ERC721Upgradeable-_safeMint-address-uint256-bytes-) (inherited)
    - [`_mint`](#ERC721Upgradeable-_mint-address-uint256-) (inherited)
    - [`_burn`](#ERC721Upgradeable-_burn-uint256-) (inherited)
    - [`_transfer`](#ERC721Upgradeable-_transfer-address-address-uint256-) (inherited)
    - [`_approve`](#ERC721Upgradeable-_approve-address-uint256-) (inherited)
    - [`_setApprovalForAll`](#ERC721Upgradeable-_setApprovalForAll-address-address-bool-) (inherited)
    - [`_requireMinted`](#ERC721Upgradeable-_requireMinted-uint256-) (inherited)
    - [`_beforeTokenTransfer`](#ERC721Upgradeable-_beforeTokenTransfer-address-address-uint256-) (inherited)
    - [`_afterTokenTransfer`](#ERC721Upgradeable-_afterTokenTransfer-address-address-uint256-) (inherited)
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
    - [`Round`](#ERC721RoundsUpgradeable-Round) 



## EVENTS

### `RoundSetup(uint256 roundId, uint32 supply, uint64 startTime, uint64 duration, address validator, uint256 price)`  <a name="ERC721RoundsUpgradeable-RoundSetup-uint256-uint32-uint64-uint64-address-uint256-" id="ERC721RoundsUpgradeable-RoundSetup-uint256-uint32-uint64-uint64-address-uint256-"></a>
Event emitted when a round is created or edited





### `Transfer(address from, address to, uint256 tokenId)` (inherited) <a name="IERC721Upgradeable-Transfer-address-address-uint256-" id="IERC721Upgradeable-Transfer-address-address-uint256-"></a>

Emitted when `tokenId` token is transferred from `from` to `to`.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol`_.


### `Approval(address owner, address approved, uint256 tokenId)` (inherited) <a name="IERC721Upgradeable-Approval-address-address-uint256-" id="IERC721Upgradeable-Approval-address-address-uint256-"></a>

Emitted when `owner` enables `approved` to manage the `tokenId` token.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol`_.


### `ApprovalForAll(address owner, address operator, bool approved)` (inherited) <a name="IERC721Upgradeable-ApprovalForAll-address-address-bool-" id="IERC721Upgradeable-ApprovalForAll-address-address-bool-"></a>

Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol`_.


### `Initialized(uint8 version)` (inherited) <a name="Initializable-Initialized-uint8-" id="Initializable-Initialized-uint8-"></a>

Triggered when the contract has been initialized or reinitialized.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol`_.



## PUBLIC FUNCTIONS

### `totalSupply() → uint256` (public) <a name="ERC721RoundsUpgradeable-totalSupply--" id="ERC721RoundsUpgradeable-totalSupply--"></a>
Returns the total amount of tokens stored by the contract.





### `totalMintedBy(address wallet, uint256 roundId) → uint256` (public) <a name="ERC721RoundsUpgradeable-totalMintedBy-address-uint256-" id="ERC721RoundsUpgradeable-totalMintedBy-address-uint256-"></a>
Returns the total amount of tokens minted by `wallet` for `roundId`.





### `allRounds() → struct ERC721RoundsUpgradeable.Round[]` (public) <a name="ERC721RoundsUpgradeable-allRounds--" id="ERC721RoundsUpgradeable-allRounds--"></a>
Returns the array of all rounds stored in the contract.


Starts with the index of roundId 1
Function for web3 first, this one is not recommended for a call
     from another smart contract (can be expensive in gas).




### `supportsInterface(bytes4 interfaceId) → bool` (public) (inherited)<a name="ERC721Upgradeable-supportsInterface-bytes4-" id="ERC721Upgradeable-supportsInterface-bytes4-"></a>

See {IERC165-supportsInterface}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `balanceOf(address owner) → uint256` (public) (inherited)<a name="ERC721Upgradeable-balanceOf-address-" id="ERC721Upgradeable-balanceOf-address-"></a>

See {IERC721-balanceOf}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `ownerOf(uint256 tokenId) → address` (public) (inherited)<a name="ERC721Upgradeable-ownerOf-uint256-" id="ERC721Upgradeable-ownerOf-uint256-"></a>

See {IERC721-ownerOf}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `name() → string` (public) (inherited)<a name="ERC721Upgradeable-name--" id="ERC721Upgradeable-name--"></a>

See {IERC721Metadata-name}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `symbol() → string` (public) (inherited)<a name="ERC721Upgradeable-symbol--" id="ERC721Upgradeable-symbol--"></a>

See {IERC721Metadata-symbol}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `tokenURI(uint256 tokenId) → string` (public) (inherited)<a name="ERC721Upgradeable-tokenURI-uint256-" id="ERC721Upgradeable-tokenURI-uint256-"></a>

See {IERC721Metadata-tokenURI}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `approve(address to, uint256 tokenId)` (public) (inherited)<a name="ERC721Upgradeable-approve-address-uint256-" id="ERC721Upgradeable-approve-address-uint256-"></a>

See {IERC721-approve}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `getApproved(uint256 tokenId) → address` (public) (inherited)<a name="ERC721Upgradeable-getApproved-uint256-" id="ERC721Upgradeable-getApproved-uint256-"></a>

See {IERC721-getApproved}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `setApprovalForAll(address operator, bool approved)` (public) (inherited)<a name="ERC721Upgradeable-setApprovalForAll-address-bool-" id="ERC721Upgradeable-setApprovalForAll-address-bool-"></a>

See {IERC721-setApprovalForAll}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `isApprovedForAll(address owner, address operator) → bool` (public) (inherited)<a name="ERC721Upgradeable-isApprovedForAll-address-address-" id="ERC721Upgradeable-isApprovedForAll-address-address-"></a>

See {IERC721-isApprovedForAll}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `transferFrom(address from, address to, uint256 tokenId)` (public) (inherited)<a name="ERC721Upgradeable-transferFrom-address-address-uint256-" id="ERC721Upgradeable-transferFrom-address-address-uint256-"></a>

See {IERC721-transferFrom}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `safeTransferFrom(address from, address to, uint256 tokenId)` (public) (inherited)<a name="ERC721Upgradeable-safeTransferFrom-address-address-uint256-" id="ERC721Upgradeable-safeTransferFrom-address-address-uint256-"></a>

See {IERC721-safeTransferFrom}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `safeTransferFrom(address from, address to, uint256 tokenId, bytes data)` (public) (inherited)<a name="ERC721Upgradeable-safeTransferFrom-address-address-uint256-bytes-" id="ERC721Upgradeable-safeTransferFrom-address-address-uint256-bytes-"></a>

See {IERC721-safeTransferFrom}.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


## INTERNAL FUNCTIONS

### `_publicRoundMint(address to, uint256 roundId, uint256 amount)` (internal)  <a name="ERC721RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-" id="ERC721RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-"></a>

Mint the `amount` of tokens in a round without validator.
Call {ERC721RoundsUpgradeable-_roundMint}.
Requirements:
- Round must not have a validator
- View {ERC721RoundsUpgradeable-_roundMint} requirements



Parameters:
- `to`: The address who want to mint

- `roundId`: The mint round index

- `amount`: The number of tokens to mint



### `_privateRoundMint(address to, uint256 roundId, uint256 amount, uint256 maxMint, uint256 payloadExpiration, bytes sig)` (internal)  <a name="ERC721RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-" id="ERC721RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-"></a>

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



### `_setupRound(uint256 roundId, uint32 supply, uint64 startTime, uint64 duration, address validator, uint256 price)` (internal)  <a name="ERC721RoundsUpgradeable-_setupRound-uint256-uint32-uint64-uint64-address-uint256-" id="ERC721RoundsUpgradeable-_setupRound-uint256-uint32-uint64-uint64-address-uint256-"></a>

Create or edit a round

Requirements:
- `roundId` must exist or increment `roundsLength` for create one.
- `roundId` can't be 0.



Parameters:
- `roundId`: The round identifier

- `supply`: Number of tokens that can be minted in this round. Can be 0 for no supply control.

- `startTime`: The start date of the round in seconds

- `duration`: The duration of the round in seconds. Can be 0 for no time limitation

- `validator`: The address of the whitelist validator. Can be 'address(0)' for no whitelist

- `price`: The price of the round in ETH (can be 0)



### `_roundMint(address to, uint256 roundId, uint256 amount)` (internal)  <a name="ERC721RoundsUpgradeable-_roundMint-address-uint256-uint256-" id="ERC721RoundsUpgradeable-_roundMint-address-uint256-uint256-"></a>

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



### `_mintWithAmount(address to, uint256 amount)` (internal)  <a name="ERC721RoundsUpgradeable-_mintWithAmount-address-uint256-" id="ERC721RoundsUpgradeable-_mintWithAmount-address-uint256-"></a>

Mint the `amount` of tokens for `to`

Requirements:
- `amount` must be above 0
- The supply must not be exceeded with amount

Increase `_totalMinted`



Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint



### `_getNextTokenId(address to, uint256 totalMinted) → uint256` (internal)  <a name="ERC721RoundsUpgradeable-_getNextTokenId-address-uint256-" id="ERC721RoundsUpgradeable-_getNextTokenId-address-uint256-"></a>

Gives the identifier for the next minted token (can be override)
By default, simply increments the last token Id



Parameters:
- `to`: The wallet who want to mint (to use in a random function or other)

- `totalMinted`: Updated total minted



### `_checkSignature(uint256 payloadExpiration, bytes data, bytes sig, address signer)` (internal)  <a name="ERC721RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-" id="ERC721RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-"></a>
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



### `_beforeRoundMint(address to, uint256 amount)` (internal)  <a name="ERC721RoundsUpgradeable-_beforeRoundMint-address-uint256-" id="ERC721RoundsUpgradeable-_beforeRoundMint-address-uint256-"></a>

Hook that is called before any mint in a round

Calling conditions:
- when the correct price was send.
- when round is in progress.
- when round supply not exceeded.



Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint



### `_beforeMint(address to, uint256 amount)` (internal)  <a name="ERC721RoundsUpgradeable-_beforeMint-address-uint256-" id="ERC721RoundsUpgradeable-_beforeMint-address-uint256-"></a>

Hook that is called before any mint

Calling conditions:
- amount is not 0.



Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint



### `_afterRoundMint(address to, uint256 amount)` (internal)  <a name="ERC721RoundsUpgradeable-_afterRoundMint-address-uint256-" id="ERC721RoundsUpgradeable-_afterRoundMint-address-uint256-"></a>

Hook that is called after any mint in a round


Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint



### `_afterMint(address to, uint256 amount)` (internal)  <a name="ERC721RoundsUpgradeable-_afterMint-address-uint256-" id="ERC721RoundsUpgradeable-_afterMint-address-uint256-"></a>

Hook that is called after any mint


Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint



### `__ERC721_init(string name_, string symbol_)` (internal) (inherited) <a name="ERC721Upgradeable-__ERC721_init-string-string-" id="ERC721Upgradeable-__ERC721_init-string-string-"></a>

Initializes the contract by setting a `name` and a `symbol` to the token collection.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `__ERC721_init_unchained(string name_, string symbol_)` (internal) (inherited) <a name="ERC721Upgradeable-__ERC721_init_unchained-string-string-" id="ERC721Upgradeable-__ERC721_init_unchained-string-string-"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_baseURI() → string` (internal) (inherited) <a name="ERC721Upgradeable-_baseURI--" id="ERC721Upgradeable-_baseURI--"></a>

Base URI for computing {tokenURI}. If set, the resulting URI for each
token will be the concatenation of the `baseURI` and the `tokenId`. Empty
by default, can be overridden in child contracts.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_safeTransfer(address from, address to, uint256 tokenId, bytes data)` (internal) (inherited) <a name="ERC721Upgradeable-_safeTransfer-address-address-uint256-bytes-" id="ERC721Upgradeable-_safeTransfer-address-address-uint256-bytes-"></a>

Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
are aware of the ERC721 protocol to prevent tokens from being forever locked.
`data` is additional data, it has no specified format and it is sent in call to `to`.
This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
implement alternative mechanisms to perform token transfer, such as signature-based.
Requirements:
- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must exist and be owned by `from`.
- If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
Emits a {Transfer} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_exists(uint256 tokenId) → bool` (internal) (inherited) <a name="ERC721Upgradeable-_exists-uint256-" id="ERC721Upgradeable-_exists-uint256-"></a>

Returns whether `tokenId` exists.
Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
Tokens start existing when they are minted (`_mint`),
and stop existing when they are burned (`_burn`).


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_isApprovedOrOwner(address spender, uint256 tokenId) → bool` (internal) (inherited) <a name="ERC721Upgradeable-_isApprovedOrOwner-address-uint256-" id="ERC721Upgradeable-_isApprovedOrOwner-address-uint256-"></a>

Returns whether `spender` is allowed to manage `tokenId`.
Requirements:
- `tokenId` must exist.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_safeMint(address to, uint256 tokenId)` (internal) (inherited) <a name="ERC721Upgradeable-_safeMint-address-uint256-" id="ERC721Upgradeable-_safeMint-address-uint256-"></a>

Safely mints `tokenId` and transfers it to `to`.
Requirements:
- `tokenId` must not exist.
- If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
Emits a {Transfer} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_safeMint(address to, uint256 tokenId, bytes data)` (internal) (inherited) <a name="ERC721Upgradeable-_safeMint-address-uint256-bytes-" id="ERC721Upgradeable-_safeMint-address-uint256-bytes-"></a>

Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
forwarded in {IERC721Receiver-onERC721Received} to contract recipients.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_mint(address to, uint256 tokenId)` (internal) (inherited) <a name="ERC721Upgradeable-_mint-address-uint256-" id="ERC721Upgradeable-_mint-address-uint256-"></a>

Mints `tokenId` and transfers it to `to`.
WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
Requirements:
- `tokenId` must not exist.
- `to` cannot be the zero address.
Emits a {Transfer} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_burn(uint256 tokenId)` (internal) (inherited) <a name="ERC721Upgradeable-_burn-uint256-" id="ERC721Upgradeable-_burn-uint256-"></a>

Destroys `tokenId`.
The approval is cleared when the token is burned.
Requirements:
- `tokenId` must exist.
Emits a {Transfer} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_transfer(address from, address to, uint256 tokenId)` (internal) (inherited) <a name="ERC721Upgradeable-_transfer-address-address-uint256-" id="ERC721Upgradeable-_transfer-address-address-uint256-"></a>

Transfers `tokenId` from `from` to `to`.
 As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
Requirements:
- `to` cannot be the zero address.
- `tokenId` token must be owned by `from`.
Emits a {Transfer} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_approve(address to, uint256 tokenId)` (internal) (inherited) <a name="ERC721Upgradeable-_approve-address-uint256-" id="ERC721Upgradeable-_approve-address-uint256-"></a>

Approve `to` to operate on `tokenId`
Emits an {Approval} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_setApprovalForAll(address owner, address operator, bool approved)` (internal) (inherited) <a name="ERC721Upgradeable-_setApprovalForAll-address-address-bool-" id="ERC721Upgradeable-_setApprovalForAll-address-address-bool-"></a>

Approve `operator` to operate on all of `owner` tokens
Emits an {ApprovalForAll} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_requireMinted(uint256 tokenId)` (internal) (inherited) <a name="ERC721Upgradeable-_requireMinted-uint256-" id="ERC721Upgradeable-_requireMinted-uint256-"></a>

Reverts if the `tokenId` has not been minted yet.


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_beforeTokenTransfer(address from, address to, uint256 tokenId)` (internal) (inherited) <a name="ERC721Upgradeable-_beforeTokenTransfer-address-address-uint256-" id="ERC721Upgradeable-_beforeTokenTransfer-address-address-uint256-"></a>

Hook that is called before any token transfer. This includes minting
and burning.
Calling conditions:
- When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
transferred to `to`.
- When `from` is zero, `tokenId` will be minted for `to`.
- When `to` is zero, ``from``'s `tokenId` will be burned.
- `from` and `to` are never both zero.
To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


### `_afterTokenTransfer(address from, address to, uint256 tokenId)` (internal) (inherited) <a name="ERC721Upgradeable-_afterTokenTransfer-address-address-uint256-" id="ERC721Upgradeable-_afterTokenTransfer-address-address-uint256-"></a>

Hook that is called after any transfer of tokens. This includes
minting and burning.
Calling conditions:
- when `from` and `to` are both non-zero.
- `from` and `to` are never both zero.
To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].


_Inherited from `../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol`_.


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

### `Round`  <a name="ERC721RoundsUpgradeable-Round" id="ERC721RoundsUpgradeable-Round"></a>
- uint256 id
- uint32 supply
- uint64 startTime
- uint64 duration
- address validator
- uint256 price
- uint256 totalMinted




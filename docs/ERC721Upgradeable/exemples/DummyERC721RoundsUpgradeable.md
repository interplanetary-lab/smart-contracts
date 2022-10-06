# `DummyERC721RoundsUpgradeable`
**Documentation of `ERC721Upgradeable/exemples/DummyERC721RoundsUpgradeable.sol`.**



Dummy contract test the management of mint rounds with {ERC721RoundsUpgradeable}


## TABLE OF CONTENTS
- [Events](#events)
    - [`Upgraded`](#ERC1967UpgradeUpgradeable-Upgraded-address-) (inherited)
    - [`AdminChanged`](#ERC1967UpgradeUpgradeable-AdminChanged-address-address-) (inherited)
    - [`BeaconUpgraded`](#ERC1967UpgradeUpgradeable-BeaconUpgraded-address-) (inherited)
    - [`OwnershipTransferred`](#OwnableUpgradeable-OwnershipTransferred-address-address-) (inherited)
    - [`RoundSetup`](#ERC721RoundsUpgradeable-RoundSetup-uint256-uint32-uint64-uint64-uint256-address-) (inherited)
    - [`Transfer`](#IERC721Upgradeable-Transfer-address-address-uint256-) (inherited)
    - [`Approval`](#IERC721Upgradeable-Approval-address-address-uint256-) (inherited)
    - [`ApprovalForAll`](#IERC721Upgradeable-ApprovalForAll-address-address-bool-) (inherited)
    - [`Initialized`](#Initializable-Initialized-uint8-) (inherited)

- [Public Functions](#public-functions)
    - [`constructor`](#DummyERC721RoundsUpgradeable-constructor--) 
    - [`initialize`](#DummyERC721RoundsUpgradeable-initialize--) 
    - [`mint`](#DummyERC721RoundsUpgradeable-mint-uint256-uint256-) 
    - [`privateMint`](#DummyERC721RoundsUpgradeable-privateMint-uint256-uint256-uint256-uint256-bytes-) 
    - [`setupRound`](#DummyERC721RoundsUpgradeable-setupRound-uint256-uint32-uint64-uint64-address-uint256-) 
    - [`proxiableUUID`](#UUPSUpgradeable-proxiableUUID--) (inherited)
    - [`upgradeTo`](#UUPSUpgradeable-upgradeTo-address-) (inherited)
    - [`upgradeToAndCall`](#UUPSUpgradeable-upgradeToAndCall-address-bytes-) (inherited)
    - [`owner`](#OwnableUpgradeable-owner--) (inherited)
    - [`renounceOwnership`](#OwnableUpgradeable-renounceOwnership--) (inherited)
    - [`transferOwnership`](#OwnableUpgradeable-transferOwnership-address-) (inherited)
    - [`totalSupply`](#ERC721RoundsUpgradeable-totalSupply--) (inherited)
    - [`totalMintedBy`](#ERC721RoundsUpgradeable-totalMintedBy-address-uint256-) (inherited)
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
    - [`_beforeMint`](#DummyERC721RoundsUpgradeable-_beforeMint-address-uint256-) 
    - [`_authorizeUpgrade`](#DummyERC721RoundsUpgradeable-_authorizeUpgrade-address-) 
    - [`__UUPSUpgradeable_init`](#UUPSUpgradeable-__UUPSUpgradeable_init--) (inherited)
    - [`__UUPSUpgradeable_init_unchained`](#UUPSUpgradeable-__UUPSUpgradeable_init_unchained--) (inherited)
    - [`__ERC1967Upgrade_init`](#ERC1967UpgradeUpgradeable-__ERC1967Upgrade_init--) (inherited)
    - [`__ERC1967Upgrade_init_unchained`](#ERC1967UpgradeUpgradeable-__ERC1967Upgrade_init_unchained--) (inherited)
    - [`_getImplementation`](#ERC1967UpgradeUpgradeable-_getImplementation--) (inherited)
    - [`_upgradeTo`](#ERC1967UpgradeUpgradeable-_upgradeTo-address-) (inherited)
    - [`_upgradeToAndCall`](#ERC1967UpgradeUpgradeable-_upgradeToAndCall-address-bytes-bool-) (inherited)
    - [`_upgradeToAndCallUUPS`](#ERC1967UpgradeUpgradeable-_upgradeToAndCallUUPS-address-bytes-bool-) (inherited)
    - [`_getAdmin`](#ERC1967UpgradeUpgradeable-_getAdmin--) (inherited)
    - [`_changeAdmin`](#ERC1967UpgradeUpgradeable-_changeAdmin-address-) (inherited)
    - [`_getBeacon`](#ERC1967UpgradeUpgradeable-_getBeacon--) (inherited)
    - [`_upgradeBeaconToAndCall`](#ERC1967UpgradeUpgradeable-_upgradeBeaconToAndCall-address-bytes-bool-) (inherited)
    - [`__Ownable_init`](#OwnableUpgradeable-__Ownable_init--) (inherited)
    - [`__Ownable_init_unchained`](#OwnableUpgradeable-__Ownable_init_unchained--) (inherited)
    - [`_checkOwner`](#OwnableUpgradeable-_checkOwner--) (inherited)
    - [`_transferOwnership`](#OwnableUpgradeable-_transferOwnership-address-) (inherited)
    - [`_publicRoundMint`](#ERC721RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-) (inherited)
    - [`_privateRoundMint`](#ERC721RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-) (inherited)
    - [`_setupRound`](#ERC721RoundsUpgradeable-_setupRound-uint256-uint32-uint64-uint64-address-uint256-) (inherited)
    - [`_roundMint`](#ERC721RoundsUpgradeable-_roundMint-address-uint256-uint256-) (inherited)
    - [`_mintWithAmount`](#ERC721RoundsUpgradeable-_mintWithAmount-address-uint256-) (inherited)
    - [`_getNextTokenId`](#ERC721RoundsUpgradeable-_getNextTokenId-address-uint256-) (inherited)
    - [`_checkSignature`](#ERC721RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-) (inherited)
    - [`_beforeRoundMint`](#ERC721RoundsUpgradeable-_beforeRoundMint-address-uint256-) (inherited)
    - [`_afterRoundMint`](#ERC721RoundsUpgradeable-_afterRoundMint-address-uint256-) (inherited)
    - [`_afterMint`](#ERC721RoundsUpgradeable-_afterMint-address-uint256-) (inherited)
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
    - [`onlyProxy`](#UUPSUpgradeable-onlyProxy--) (inherited)
    - [`notDelegated`](#UUPSUpgradeable-notDelegated--) (inherited)
    - [`onlyOwner`](#OwnableUpgradeable-onlyOwner--) (inherited)
    - [`initializer`](#Initializable-initializer--) (inherited)
    - [`reinitializer`](#Initializable-reinitializer-uint8-) (inherited)
    - [`onlyInitializing`](#Initializable-onlyInitializing--) (inherited)

- [Structs](#structs)
    - [`Round`](#ERC721RoundsUpgradeable-Round) (inherited)



## EVENTS

### `Upgraded(address implementation)` (inherited) <a name="ERC1967UpgradeUpgradeable-Upgraded-address-" id="ERC1967UpgradeUpgradeable-Upgraded-address-"></a>

Emitted when the implementation is upgraded.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `AdminChanged(address previousAdmin, address newAdmin)` (inherited) <a name="ERC1967UpgradeUpgradeable-AdminChanged-address-address-" id="ERC1967UpgradeUpgradeable-AdminChanged-address-address-"></a>

Emitted when the admin account has changed.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `BeaconUpgraded(address beacon)` (inherited) <a name="ERC1967UpgradeUpgradeable-BeaconUpgraded-address-" id="ERC1967UpgradeUpgradeable-BeaconUpgraded-address-"></a>

Emitted when the beacon is upgraded.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `OwnershipTransferred(address previousOwner, address newOwner)` (inherited) <a name="OwnableUpgradeable-OwnershipTransferred-address-address-" id="OwnableUpgradeable-OwnershipTransferred-address-address-"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


### `RoundSetup(uint256 roundId, uint32 supply, uint64 startTime, uint64 duration, uint256 price, address validator)` (inherited) <a name="ERC721RoundsUpgradeable-RoundSetup-uint256-uint32-uint64-uint64-uint256-address-" id="ERC721RoundsUpgradeable-RoundSetup-uint256-uint32-uint64-uint64-uint256-address-"></a>
Event emitted when a round is created or edited



_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


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

### `constructor()` (public) <a name="DummyERC721RoundsUpgradeable-constructor--" id="DummyERC721RoundsUpgradeable-constructor--"></a>
CONSTRUCTOR







### `initialize()` (public) <a name="DummyERC721RoundsUpgradeable-initialize--" id="DummyERC721RoundsUpgradeable-initialize--"></a>
Initialize the contract





### `mint(uint256 roundId, uint256 amount)` (external) <a name="DummyERC721RoundsUpgradeable-mint-uint256-uint256-" id="DummyERC721RoundsUpgradeable-mint-uint256-uint256-"></a>
Mint the `amount` of tokens in a public round.


Call {ERC721RoundsUpgradeable-_publicRoundMint}.
Requirements:
- Total minted for the user during this round must be less than `maxMintsPerWallet`
- View {ERC721RoundsUpgradeable-_publicRoundMint} requirements



Parameters:
- `roundId`: The mint round index

- `amount`: The number of tokens to mint



### `privateMint(uint256 roundId, uint256 amount, uint256 maxMint, uint256 payloadExpiration, bytes sig)` (external) <a name="DummyERC721RoundsUpgradeable-privateMint-uint256-uint256-uint256-uint256-bytes-" id="DummyERC721RoundsUpgradeable-privateMint-uint256-uint256-uint256-uint256-bytes-"></a>
Mint the `amount` of tokens with the signature of the round validator.


Call {ERC721RoundsUpgradeable-_privateRoundMint}.
Requirements:
- View {ERC721RoundsUpgradeable-_privateRoundMint} requirements



Parameters:
- `roundId`: The mint round index

- `amount`: The number of tokens to mint

- `maxMint`: The maximum token that the user is allowed to mint in the round (verified in `sig`)

- `payloadExpiration`: The maximum timestamp before the signature is considered invalid (verified in `sig`)

- `sig`: The EC signature generated by the wave validator



### `setupRound(uint256 roundId, uint32 supply, uint64 startTime, uint64 duration, address validator, uint256 price)` (external) <a name="DummyERC721RoundsUpgradeable-setupRound-uint256-uint32-uint64-uint64-address-uint256-" id="DummyERC721RoundsUpgradeable-setupRound-uint256-uint32-uint64-uint64-address-uint256-"></a>

Create or edit a round

Call {ERC721RoundsUpgradeable-_setupRound}.
Requirements:
- msg.sender is owner of the contract
- View {ERC721RoundsUpgradeable-_setupRound} requirements



Parameters:
- `roundId`: The round identifier

- `supply`: Number of tokens that can be minted in this round. Can be 0 for no supply control.

- `startTime`: The start date of the round in seconds

- `duration`: The duration of the round in seconds. Can be 0 for no time limitation

- `validator`: The address of the whitelist validator. Can be 'address(0)' for no whitelist

- `price`: The price of the round in ETH (can be 0)



### `proxiableUUID() → bytes32` (external) (inherited)<a name="UUPSUpgradeable-proxiableUUID--" id="UUPSUpgradeable-proxiableUUID--"></a>

Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the
implementation. It is used to validate that the this implementation remains valid after an upgrade.
IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks
bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this
function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol`_.


### `upgradeTo(address newImplementation)` (external) (inherited)<a name="UUPSUpgradeable-upgradeTo-address-" id="UUPSUpgradeable-upgradeTo-address-"></a>

Upgrade the implementation of the proxy to `newImplementation`.
Calls {_authorizeUpgrade}.
Emits an {Upgraded} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol`_.


### `upgradeToAndCall(address newImplementation, bytes data)` (external) (inherited)<a name="UUPSUpgradeable-upgradeToAndCall-address-bytes-" id="UUPSUpgradeable-upgradeToAndCall-address-bytes-"></a>

Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call
encoded in `data`.
Calls {_authorizeUpgrade}.
Emits an {Upgraded} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol`_.


### `owner() → address` (public) (inherited)<a name="OwnableUpgradeable-owner--" id="OwnableUpgradeable-owner--"></a>

Returns the address of the current owner.


_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


### `renounceOwnership()` (public) (inherited)<a name="OwnableUpgradeable-renounceOwnership--" id="OwnableUpgradeable-renounceOwnership--"></a>

Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.
NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.


_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


### `transferOwnership(address newOwner)` (public) (inherited)<a name="OwnableUpgradeable-transferOwnership-address-" id="OwnableUpgradeable-transferOwnership-address-"></a>

Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.


_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


### `totalSupply() → uint256` (public) (inherited)<a name="ERC721RoundsUpgradeable-totalSupply--" id="ERC721RoundsUpgradeable-totalSupply--"></a>
Returns the total amount of tokens stored by the contract.



_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `totalMintedBy(address wallet, uint256 roundId) → uint256` (public) (inherited)<a name="ERC721RoundsUpgradeable-totalMintedBy-address-uint256-" id="ERC721RoundsUpgradeable-totalMintedBy-address-uint256-"></a>
Returns the total amount of tokens minted by `wallet` for `roundId`.



_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


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

### `_beforeMint(address to, uint256 amount)` (internal)  <a name="DummyERC721RoundsUpgradeable-_beforeMint-address-uint256-" id="DummyERC721RoundsUpgradeable-_beforeMint-address-uint256-"></a>
Check the max supply before the mint




Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint



### `_authorizeUpgrade(address newImplementation)` (internal)  <a name="DummyERC721RoundsUpgradeable-_authorizeUpgrade-address-" id="DummyERC721RoundsUpgradeable-_authorizeUpgrade-address-"></a>






### `__UUPSUpgradeable_init()` (internal) (inherited) <a name="UUPSUpgradeable-__UUPSUpgradeable_init--" id="UUPSUpgradeable-__UUPSUpgradeable_init--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol`_.


### `__UUPSUpgradeable_init_unchained()` (internal) (inherited) <a name="UUPSUpgradeable-__UUPSUpgradeable_init_unchained--" id="UUPSUpgradeable-__UUPSUpgradeable_init_unchained--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol`_.


### `__ERC1967Upgrade_init()` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-__ERC1967Upgrade_init--" id="ERC1967UpgradeUpgradeable-__ERC1967Upgrade_init--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `__ERC1967Upgrade_init_unchained()` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-__ERC1967Upgrade_init_unchained--" id="ERC1967UpgradeUpgradeable-__ERC1967Upgrade_init_unchained--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `_getImplementation() → address` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-_getImplementation--" id="ERC1967UpgradeUpgradeable-_getImplementation--"></a>

Returns the current implementation address.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `_upgradeTo(address newImplementation)` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-_upgradeTo-address-" id="ERC1967UpgradeUpgradeable-_upgradeTo-address-"></a>

Perform implementation upgrade
Emits an {Upgraded} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `_upgradeToAndCall(address newImplementation, bytes data, bool forceCall)` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-_upgradeToAndCall-address-bytes-bool-" id="ERC1967UpgradeUpgradeable-_upgradeToAndCall-address-bytes-bool-"></a>

Perform implementation upgrade with additional setup call.
Emits an {Upgraded} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `_upgradeToAndCallUUPS(address newImplementation, bytes data, bool forceCall)` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-_upgradeToAndCallUUPS-address-bytes-bool-" id="ERC1967UpgradeUpgradeable-_upgradeToAndCallUUPS-address-bytes-bool-"></a>

Perform implementation upgrade with security checks for UUPS proxies, and additional setup call.
Emits an {Upgraded} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `_getAdmin() → address` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-_getAdmin--" id="ERC1967UpgradeUpgradeable-_getAdmin--"></a>

Returns the current admin.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `_changeAdmin(address newAdmin)` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-_changeAdmin-address-" id="ERC1967UpgradeUpgradeable-_changeAdmin-address-"></a>

Changes the admin of the proxy.
Emits an {AdminChanged} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `_getBeacon() → address` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-_getBeacon--" id="ERC1967UpgradeUpgradeable-_getBeacon--"></a>

Returns the current beacon.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `_upgradeBeaconToAndCall(address newBeacon, bytes data, bool forceCall)` (internal) (inherited) <a name="ERC1967UpgradeUpgradeable-_upgradeBeaconToAndCall-address-bytes-bool-" id="ERC1967UpgradeUpgradeable-_upgradeBeaconToAndCall-address-bytes-bool-"></a>

Perform beacon upgrade with additional setup call. Note: This upgrades the address of the beacon, it does
not upgrade the implementation contained in the beacon (see {UpgradeableBeacon-_setImplementation} for that).
Emits a {BeaconUpgraded} event.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol`_.


### `__Ownable_init()` (internal) (inherited) <a name="OwnableUpgradeable-__Ownable_init--" id="OwnableUpgradeable-__Ownable_init--"></a>

Initializes the contract setting the deployer as the initial owner.


_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


### `__Ownable_init_unchained()` (internal) (inherited) <a name="OwnableUpgradeable-__Ownable_init_unchained--" id="OwnableUpgradeable-__Ownable_init_unchained--"></a>




_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


### `_checkOwner()` (internal) (inherited) <a name="OwnableUpgradeable-_checkOwner--" id="OwnableUpgradeable-_checkOwner--"></a>

Throws if the sender is not the owner.


_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


### `_transferOwnership(address newOwner)` (internal) (inherited) <a name="OwnableUpgradeable-_transferOwnership-address-" id="OwnableUpgradeable-_transferOwnership-address-"></a>

Transfers ownership of the contract to a new account (`newOwner`).
Internal function without access restriction.


_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


### `_publicRoundMint(address to, uint256 roundId, uint256 amount)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-" id="ERC721RoundsUpgradeable-_publicRoundMint-address-uint256-uint256-"></a>

Mint the `amount` of tokens in a round without validator.
Call {ERC721RoundsUpgradeable-_roundMint}.
Requirements:
- Round must not have a validator
- View {ERC721RoundsUpgradeable-_roundMint} requirements



Parameters:
- `to`: The address who want to mint

- `roundId`: The mint round index

- `amount`: The number of tokens to mint

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_privateRoundMint(address to, uint256 roundId, uint256 amount, uint256 maxMint, uint256 payloadExpiration, bytes sig)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-" id="ERC721RoundsUpgradeable-_privateRoundMint-address-uint256-uint256-uint256-uint256-bytes-"></a>

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

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_setupRound(uint256 roundId, uint32 supply, uint64 startTime, uint64 duration, address validator, uint256 price)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_setupRound-uint256-uint32-uint64-uint64-address-uint256-" id="ERC721RoundsUpgradeable-_setupRound-uint256-uint32-uint64-uint64-address-uint256-"></a>

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

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_roundMint(address to, uint256 roundId, uint256 amount)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_roundMint-address-uint256-uint256-" id="ERC721RoundsUpgradeable-_roundMint-address-uint256-uint256-"></a>

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

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_mintWithAmount(address to, uint256 amount)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_mintWithAmount-address-uint256-" id="ERC721RoundsUpgradeable-_mintWithAmount-address-uint256-"></a>

Mint the `amount` of tokens for `to`

Requirements:
- `amount` must be above 0
- The supply must not be exceeded with amount

Increase `_totalMinted`



Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_getNextTokenId(address to, uint256 totalMinted) → uint256` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_getNextTokenId-address-uint256-" id="ERC721RoundsUpgradeable-_getNextTokenId-address-uint256-"></a>

Gives the identifier for the next minted token (can be override)
By default, simply increments the last token Id



Parameters:
- `to`: The wallet who want to mint (to use in a random function or other)

- `totalMinted`: Updated total minted

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_checkSignature(uint256 payloadExpiration, bytes data, bytes sig, address signer)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-" id="ERC721RoundsUpgradeable-_checkSignature-uint256-bytes-bytes-address-"></a>
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

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_beforeRoundMint(address to, uint256 amount)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_beforeRoundMint-address-uint256-" id="ERC721RoundsUpgradeable-_beforeRoundMint-address-uint256-"></a>

Hook that is called before any mint in a round

Calling conditions:
- when the correct price was send.
- when round is in progress.
- when round supply not exceeded.



Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_afterRoundMint(address to, uint256 amount)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_afterRoundMint-address-uint256-" id="ERC721RoundsUpgradeable-_afterRoundMint-address-uint256-"></a>

Hook that is called after any mint in a round


Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


### `_afterMint(address to, uint256 amount)` (internal) (inherited) <a name="ERC721RoundsUpgradeable-_afterMint-address-uint256-" id="ERC721RoundsUpgradeable-_afterMint-address-uint256-"></a>

Hook that is called after any mint


Parameters:
- `to`: The wallet to transfer new tokens

- `amount`: The number of tokens to mint

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.


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

### `onlyProxy()` (inherited) <a name="UUPSUpgradeable-onlyProxy--" id="UUPSUpgradeable-onlyProxy--"></a>


Check that the execution is being performed through a delegatecall call and that the execution context is
a proxy contract with an implementation (as defined in ERC1967) pointing to self. This should only be the case
for UUPS and transparent proxies that are using the current contract as their implementation. Execution of a
function through ERC1167 minimal proxies (clones) would not normally pass this test, but is not guaranteed to
fail.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol`_.


### `notDelegated()` (inherited) <a name="UUPSUpgradeable-notDelegated--" id="UUPSUpgradeable-notDelegated--"></a>


Check that the execution is not being performed through a delegate call. This allows a function to be
callable on the implementing contract but not through proxies.


_Inherited from `../@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol`_.


### `onlyOwner()` (inherited) <a name="OwnableUpgradeable-onlyOwner--" id="OwnableUpgradeable-onlyOwner--"></a>


Throws if called by any account other than the owner.


_Inherited from `../@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol`_.


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

### `Round` (inherited) <a name="ERC721RoundsUpgradeable-Round" id="ERC721RoundsUpgradeable-Round"></a>
- uint32 supply
- uint64 startTime
- uint64 duration
- uint256 price
- uint256 totalMinted
- address validator

_Inherited from `ERC721Upgradeable/ERC721RoundsUpgradeable.sol`_.



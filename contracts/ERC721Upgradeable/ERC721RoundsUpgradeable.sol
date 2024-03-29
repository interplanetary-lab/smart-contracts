// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @dev Contract allowing the management of mint rounds for {ERC721Upgradeable}
 * @author Interplanetary Lab <contact@interplanetary-lab.io>
 */
contract ERC721RoundsUpgradeable is ERC721Upgradeable {
    using Strings for uint256;
    using ECDSA for bytes32;

    /**
     * ========================
     *          Struct
     * ========================
     */

    /**
     * @notice Structure for packing the information of a mint round
     * @member id The round id for reverse mapping
     * @member supply Number of tokens that can be minted in this round. Can be 0 for no supply control.
     * @member totalMinted Number of token minted in this round
     * @member startTime The start date of the round in seconds
     * @member validator The address of the whitelist validator. Can be 'address(0)' for no whitelist
     * @member duration The duration of the round in seconds. Can be 0 for no time limitation
     * @member price The price of the round in ETH (can be 0)
     */
    struct Round {
        uint256 id;
        uint32 supply;
        uint64 startTime;
        uint64 duration;
        address validator;
        uint256 price;
        uint256 totalMinted;
    }

    /**
     * ========================
     *          Events
     * ========================
     */

    /**
     * @notice Event emitted when a round is created or edited
     */
    event RoundSetup(
        uint256 indexed roundId,
        uint32 supply,
        uint64 startTime,
        uint64 duration,
        address validator,
        uint256 price
    );

    /**
     * ========================
     *         Storage
     * ========================
     */

    /// Total of minted token
    uint256 internal _totalMinted;

    /// Total of rounds setup
    uint256 public roundsLength;

    /// All rounds (starts at index 1)
    mapping(uint256 => Round) public rounds;

    /// Total of minted token by address for a roundId
    mapping(uint256 => mapping(address => uint256))
        private _roundsToOwnerTotalMinted;

    /*
     * ========================
     *          Views
     * ========================
     */

    /**
     * @notice Returns the total amount of tokens stored by the contract.
     */
    function totalSupply() public view virtual returns (uint256) {
        return _totalMinted;
    }

    /**
     * @notice Returns the total amount of tokens minted by `wallet` for `roundId`.
     */
    function totalMintedBy(address wallet, uint256 roundId)
        public
        view
        returns (uint256)
    {
        return _roundsToOwnerTotalMinted[roundId][wallet];
    }

    /**
     * @notice Returns the array of all rounds stored in the contract.
     *
     * @dev Starts with the index of roundId 1
     * @dev Function for web3 first, this one is not recommended for a call
     *      from another smart contract (can be expensive in gas).
     */
    function allRounds() public view returns (Round[] memory) {
        Round[] memory all = new Round[](roundsLength);
        for (uint256 id = 0; id < roundsLength; ++id) {
            all[id] = rounds[id + 1];
        }
        return all;
    }

    /**
     * ========================
     *        Functions
     * ========================
     */

    /**
     * @dev Mint the `amount` of tokens in a round without validator.
     * @dev Call {ERC721RoundsUpgradeable-_roundMint}.
     * @dev Requirements:
     * - Round must not have a validator
     * - View {ERC721RoundsUpgradeable-_roundMint} requirements
     *
     * @param to The address who want to mint
     * @param roundId The mint round index
     * @param amount The number of tokens to mint
     */
    function _publicRoundMint(
        address to,
        uint256 roundId,
        uint256 amount
    ) internal virtual {
        require(rounds[roundId].validator == address(0), "Need a sig");
        _roundMint(to, roundId, amount);
    }

    /**
     * @dev Mint the `amount` of tokens with the signature of the round validator.
     *
     * @dev Requirements:
     * - Round must have a validator
     * - Total minted for the user during this round must be less than `maxMint`.
     * - `sig` must be signed by the validator of the wave and contains all information to check.
     * - `payloadExpiration` must be less than the block timestamp.
     * - View {ERC721RoundsUpgradeable-_roundMint} requirements.
     *
     * @param to The address who want to mint
     * @param roundId The mint round index
     * @param amount The number of tokens to mint
     * @param maxMint The maximum token that the user is allowed to mint in the round (verified in `sig`)
     * @param payloadExpiration The maximum timestamp before the signature is considered invalid (verified in `sig`)
     * @param sig The EC signature generated by the wave validator
     */
    function _privateRoundMint(
        address to,
        uint256 roundId,
        uint256 amount,
        uint256 maxMint,
        uint256 payloadExpiration,
        bytes memory sig
    ) internal virtual {
        address validator = rounds[roundId].validator;
        require(validator != address(0), "No round validator");
        require(
            _roundsToOwnerTotalMinted[roundId][to] + amount <= maxMint,
            "Max allowed"
        );

        _checkSignature(
            payloadExpiration,
            abi.encodePacked(
                to,
                payloadExpiration,
                roundId,
                maxMint,
                address(this),
                block.chainid
            ),
            sig,
            validator
        );

        _roundMint(to, roundId, amount);
    }

    /**
     * @dev Create or edit a round
     *
     * @dev Requirements:
     * - `roundId` must exist or increment `roundsLength` for create one.
     * - `roundId` can't be 0.
     *
     * @param roundId The round identifier
     * @param supply Number of tokens that can be minted in this round. Can be 0 for no supply control.
     * @param startTime The start date of the round in seconds
     * @param duration The duration of the round in seconds. Can be 0 for no time limitation
     * @param validator The address of the whitelist validator. Can be 'address(0)' for no whitelist
     * @param price The price of the round in ETH (can be 0)
     */
    function _setupRound(
        uint256 roundId,
        uint32 supply,
        uint64 startTime,
        uint64 duration,
        address validator,
        uint256 price
    ) internal virtual {
        require(roundId > 0 && roundId <= roundsLength + 1, "Invalid roundId");

        // Create a new round
        if (roundId == roundsLength + 1) {
            roundsLength += 1;
        }

        Round storage round = rounds[roundId];
        round.id = roundId;
        round.supply = supply;
        round.startTime = startTime;
        round.duration = duration;
        round.price = price;
        round.validator = validator;

        emit RoundSetup(roundId, supply, startTime, duration, validator, price);
    }

    /**
     * @dev Safely mint the `amount` of tokens for `to` address in accordance with round configuration
     *
     * @dev Requirements:
     * - View {ERC721RoundsUpgradeable-_mintWithAmount} Requirements
     * - `roundId` must exist and be in progress
     * - The round must have enough supply
     * - msg.value must contain the price
     *
     * @param to The address who want to mint
     * @param roundId The round index in the current wave
     * @param amount The number of tokens to mint
     *
     * @return tokenIds Array of all minted ids
     */
    function _roundMint(
        address to,
        uint256 roundId,
        uint256 amount
    ) internal virtual returns (uint256[] memory) {
        Round storage round = rounds[roundId];

        // Round active
        require(
            block.timestamp >= round.startTime &&
                round.startTime > 0 &&
                (round.duration == 0 ||
                    block.timestamp < round.startTime + round.duration),
            "Round not in progress"
        );

        // Correct price
        require(round.price * amount <= msg.value, "Wrong price");

        // Round supply requirements
        require(
            (round.supply == 0 || round.totalMinted + amount <= round.supply),
            "Round supply exceeded"
        );

        // For custom conditions or process
        _beforeRoundMint(to, roundId, amount);

        // Safe mint
        uint256[] memory tokenIds = _mintWithAmount(to, amount);

        // Increase user total minted
        round.totalMinted += amount;
        _roundsToOwnerTotalMinted[roundId][to] += amount;

        // For custom process
        _afterRoundMint(to, roundId, tokenIds);

        return tokenIds;
    }

    /**
     * @dev Mint the `amount` of tokens for `to`
     *
     * @dev Requirements:
     * - `amount` must be above 0
     * - The supply must not be exceeded with amount
     *
     * @dev Increase `_totalMinted`
     *
     * @param to The wallet to transfer new tokens
     * @param amount The number of tokens to mint
     *
     * @return tokenIds Array of all minted ids
     */
    function _mintWithAmount(address to, uint256 amount)
        internal
        virtual
        returns (uint256[] memory)
    {
        require(amount > 0, "Zero amount");

        // For custom conditions or process
        _beforeMint(to, amount);

        uint256[] memory tokenIds = new uint256[](amount);

        // Mint
        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = _getNextTokenId(to, _totalMinted + i);
            _mint(to, tokenId);
            tokenIds[i] = tokenId;
        }
        _totalMinted += amount;

        // For custom process
        _afterMint(to, tokenIds);

        return tokenIds;
    }

    /**
     * @dev Gives the identifier for the next minted token (can be override)
     * @dev By default, simply increments the last token Id
     *
     * @param to The wallet who want to mint (to use in a random function or other)
     * @param totalMinted Updated total minted
     */
    function _getNextTokenId(address to, uint256 totalMinted)
        internal
        virtual
        returns (uint256)
    {
        to; // Remove warnings
        return totalMinted + 1;
    }

    /**
     * @notice Reverts if the data does not correspond to the signature, to the correct signer or if it has expired
     *
     * @dev Requirements:
     * - `payloadExpiration` must be less than the block timestamp
     * - `sig` must be a hash of `data`
     * - `sig` must be signed by `signer`
     *
     * @param payloadExpiration The maximum timestamp before the signature is considered invalid
     * @param data All encoded pack data in order
     * @param sig The EC signature generated by the signatory
     * @param signer The address that is supposed to be the signatory
     */
    function _checkSignature(
        uint256 payloadExpiration,
        bytes memory data,
        bytes memory sig,
        address signer
    ) internal view {
        require(payloadExpiration >= block.timestamp, "Signature expired");
        require(
            keccak256(data).toEthSignedMessageHash().recover(sig) == signer,
            "Invalid signature"
        );
    }

    /**
     * @dev Hook that is called before any mint in a round
     *
     * Calling conditions:
     * - when the correct price was send.
     * - when round is in progress.
     * - when round supply not exceeded.
     *
     * @param to The wallet to transfer new tokens
     * @param roundId The mint round index
     * @param amount The number of tokens to mint
     */
    function _beforeRoundMint(
        address to,
        uint256 roundId,
        uint256 amount
    ) internal virtual {}

    /**
     * @dev Hook that is called before any mint
     *
     * Calling conditions:
     * - amount is not 0.
     *
     * @param to The wallet to transfer new tokens
     * @param amount The number of tokens to mint
     */
    function _beforeMint(address to, uint256 amount) internal virtual {}

    /**
     * @dev Hook that is called after any mint in a round
     * @param to The wallet to transfer new tokens
     * @param roundId The mint round index
     * @param tokenIds Array of all minted ids
     */
    function _afterRoundMint(
        address to,
        uint256 roundId,
        uint256[] memory tokenIds
    ) internal virtual {}

    /**
     * @dev Hook that is called after any mint
     * @param to The wallet to transfer new tokens
     * @param tokenIds Array of all minted ids
     */
    function _afterMint(address to, uint256[] memory tokenIds)
        internal
        virtual
    {}

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}

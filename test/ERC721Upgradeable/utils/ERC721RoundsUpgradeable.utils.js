const { BN } = require("@openzeppelin/test-helpers");

function getBN(value) {
  return new BN(`${value}`);
}

/**
 * Get a signed data from the `signerPrivateKey` corresponding wallet
 *
 * @param data Array of data to sign
 * @param signerPrivateKey The private key of the signer
 * @returns
 */
function getSignature(data, signerPrivateKey) {
  let message = web3.utils.soliditySha3(web3.utils.encodePacked(...data));
  return web3.eth.accounts.sign(message, signerPrivateKey).signature;
}

/**
 * Generate the signature of a round's validator
 *
 * @param userAddress The address who want to mint
 * @param payloadExpiration The maximum timestamp before the signature is considered invalid
 * @param roundId The mint round index
 * @param maxMint The maximum token that the user is allowed to mint in the round
 * @param smartContractAddress The address of the smart contract (to maximize security)
 * @param smartContractChainId The chainId of the smart contract (to maximize security)
 * @param validatorPrivateKey The private key of the validator
 * @returns
 */
function getValidatorSignature(
  userAddress,
  payloadExpiration,
  roundId,
  maxMint,
  smartContractAddress,
  smartContractChainId,
  validatorPrivateKey
) {
  return getSignature(
    [
      userAddress,
      payloadExpiration,
      roundId,
      maxMint,
      smartContractAddress,
      smartContractChainId,
    ],
    validatorPrivateKey
  );
}

/**
 * Test data after send a transaction for setup a round
 */
const afterSetupRoundTests = async (
  instance,
  roundId,
  supply,
  startTime,
  duration,
  validator,
  price
) => {
  const round = await instance.rounds(roundId);

  // Assert
  assert.equal(
    round.startTime.toString(),
    startTime.toString(),
    "Bad startTime"
  );
  assert.equal(round.id.toString(), roundId.toString(), "Bad Id");
  assert.equal(round.duration.toString(), duration.toString(), "Bad duration");
  assert.equal(
    round.validator.toString(),
    validator.toString(),
    "Bad validator"
  );
  assert.equal(round.supply.toString(), supply.toString(), "Bad supply");
  assert.equal(round.price.toString(), price.toString(), "Bad price");
};

/**
 * Test data after send a transaction for mint in a round
 */
const afterRoundMintTests = async (
  tx,
  instance,
  user,
  roundId,
  amount,
  maxMint = null
) => {
  // Before tx
  const round = await instance.rounds(roundId, tx.receipt.blockNumber - 1);
  const oldBalance = await instance.balanceOf(user, tx.receipt.blockNumber - 1);
  const oldRoundTotalMinted = getBN(round.totalMinted);
  const oldUserRoundTotalMinted = await instance.totalMintedBy(
    user,
    roundId,
    tx.receipt.blockNumber - 1
  );
  const oldTotalSupply = await instance.totalSupply(tx.receipt.blockNumber - 1);

  // After tx
  const newRound = await instance.rounds(roundId);
  const newBalance = await instance.balanceOf(user);
  const newRoundTotalMinted = getBN(newRound.totalMinted);
  const newUserRoundTotalMinted = await instance.totalMintedBy(user, roundId);
  const newTotalSupply = await instance.totalSupply();

  if (maxMint) {
    assert.equal(
      maxMint >= newUserRoundTotalMinted.toNumber(),
      true,
      "User mint more than the maximum allowed"
    );
  }
  assert.equal(
    newBalance.toString(),
    oldBalance.add(getBN(amount)).toString(),
    "User balance not valid"
  );

  assert.equal(
    newRoundTotalMinted.toString(),
    oldRoundTotalMinted.add(getBN(amount)).toString(),
    "Round total minted not valid"
  );

  assert.equal(
    newUserRoundTotalMinted.toString(),
    oldUserRoundTotalMinted.add(getBN(amount)).toString(),
    "User round total minted not valid"
  );

  assert.equal(
    newTotalSupply.toString(),
    oldTotalSupply.add(getBN(amount)).toString(),
    "Total supply not valid"
  );

  // Token test
  for (tokenId of getTokensFromTransferEvent(tx)) {
    const tokenOwner = await instance.ownerOf(tokenId);
    assert.equal(
      tokenOwner.toString(),
      user.toString(),
      "User is not owner of the new token"
    );
  }
};

/**
 * Return the array of transferred tokens from transaction data
 *
 * @param {*} txData
 * @returns
 */
const getTokensFromTransferEvent = (txData) => {
  let tokens = [];
  txData.logs.map((log) => {
    if (log.event === "Transfer") {
      const { to, from, tokenId } = log.args;
      tokens.push(tokenId.toNumber());
    }
  });
  return tokens;
};

module.exports = {
  getSignature,
  getValidatorSignature,
  afterSetupRoundTests,
  afterRoundMintTests,
  getTokensFromTransferEvent,
};

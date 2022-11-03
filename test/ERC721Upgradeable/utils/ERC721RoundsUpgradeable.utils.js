const { BN } = require("@openzeppelin/test-helpers");

function getBN(value) {
  return new BN(`${value}`);
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
  afterSetupRoundTests,
  afterRoundMintTests,
  getTokensFromTransferEvent,
};

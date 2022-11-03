// Load modules
const { time, expectRevert } = require("@openzeppelin/test-helpers");
const { BN } = require("@openzeppelin/test-helpers");

const { deployProxy } = require("@openzeppelin/truffle-upgrades");

const {
  getValidatorSignature,
  setupRoundTests,
  roundMintTests,
} = require("./utils/ERC721RoundsUpgradeable.utils.js");

const Web3Utils = require("web3-utils");

// Load artifacts
const DummyERC721RoundsUpgradeable = artifacts.require(
  "DummyERC721RoundsUpgradeable"
);

contract("ERC721RoundsUpgradeable", async (accounts) => {
  const [owner, user1, user2, ...users] = accounts;
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  let instance,
    instanceV2,
    testStartTime,
    chainId,
    maxMintsPerWallet,
    mintIncome,
    MAX_SUPPLY;

  const rounds = [
    {}, // 0 not possible
    {
      roundId: 1,
      supply: 30,
      startTime: time.duration.days(1), // to add to `testStartTime`
      duration: time.duration.days(1),
      validator: "0x6F76846f7C90EcEC371e1d96cA93bfE9d36eEb83",
      validator_private_key:
        "0xfeae30926cea7dfa8fb803c348aef7f06941b9af7770e6b62c0dcb543d3391a7",
      price: new BN(Web3Utils.toWei(`${0.01}`)),
    },
    {
      roundId: 2,
      startTime: time.duration.days(2), // to add to `testStartTime`
      duration: 0,
      // no validator
      price: new BN(Web3Utils.toWei(`${0.015}`)),
      supply: 0, // infinite supply
    },
  ];

  const otherPrivateKey =
    "0x253d7333eba154ef8fc973ee4ae2e5f35d4cc8da5db8a9e6aaa51417902c2501";

  let contractBalance = new BN("0");

  /**
   * ========================
   *        FUNCTIONS
   * ========================
   */

  /**
   * Setup a round
   */
  const setupRound = async (
    { roundId, startTime, duration, validator, supply, price },
    from = owner
  ) => {
    validator = validator || ZERO_ADDRESS;

    const tx = await instance.setupRound(
      roundId,
      supply,
      testStartTime.add(startTime),
      duration,
      validator,
      price,
      { from: from }
    );
    await setupRoundTests(
      instance,
      roundId,
      supply,
      testStartTime.add(startTime),
      duration,
      validator,
      price
    );
  };

  /**
   * Mint tokens according to round data (or `overrideData`)
   */
  const mint = async (
    { roundId, amount, maxMint, validator_private_key },
    user,
    overrideData = {}
  ) => {
    const round = await instance.rounds(roundId);

    const price =
      overrideData?.price || new BN(`${round.price}`).mul(new BN(`${amount}`));
    let tx;
    if (round.validator === ZERO_ADDRESS) {
      // mint without validator
      tx = await instance.mint(roundId, amount, {
        from: user,
        value: price,
      });
    } else {
      // mint with validator
      const latestTime = await time.latest();

      const payloadExpiration =
        overrideData?.payloadExpiration ||
        latestTime.add(time.duration.minutes(30));
      const signature = getValidatorSignature(
        user,
        payloadExpiration,
        roundId,
        maxMint,
        instance.address,
        chainId,
        overrideData?.validator_private_key || validator_private_key
      );
      tx = await instance.privateMint(
        roundId,
        amount,
        maxMint,
        payloadExpiration,
        signature,
        {
          from: user,
          value: price,
        }
      );
    }

    // Increase contractBalance
    contractBalance = contractBalance.add(price);

    await roundMintTests(tx, instance, user, roundId, amount, maxMint);
  };

  /**
   * ========================
   *          TESTS
   * ========================
   */

  /**
   * DEPLOYMENT
   */
  describe("\n DEPLOYMENT", () => {
    it("Smart contract should be deployed", async () => {
      testStartTime = await time.latest();
      instance = await deployProxy(DummyERC721RoundsUpgradeable, [], {
        initializer: "initialize",
      });
      assert(instance.address !== "");
      MAX_SUPPLY = await instance.MAX_SUPPLY();
      chainId = await web3.eth.getChainId();
      chainId = 1;
      maxMintsPerWallet = await instance.maxMintsPerWallet();
    });

    it("User can't mint with and without validator when no round is setup (Reason: 'No round validator' and 'Round not in progress')", async () => {
      const roundId = 1;
      const amount = 1;
      const maxMint = 1;
      const latestTime = await time.latest();
      const payloadExpiration = latestTime.add(time.duration.minutes(30));
      const signature = getValidatorSignature(
        user1,
        payloadExpiration,
        roundId,
        maxMint,
        instance.address,
        chainId,
        rounds[1].validator_private_key
      );

      await expectRevert(
        instance.privateMint(
          roundId,
          amount,
          maxMint,
          payloadExpiration,
          signature,
          {
            from: user1,
          }
        ),
        `No round validator`
      );
      await expectRevert(
        instance.mint(roundId, amount, {
          from: user1,
        }),
        `Round not in progress`
      );
    });
  });

  /**
   * ROUNDS CREATION & EDITION
   */
  describe("\n ROUNDS CREATION & EDITION", () => {
    it(`Owner can't create a round at id 0 (Reason: Invalid roundId)`, async () => {
      await expectRevert(
        setupRound({
          roundId: 0,
          supply: 200,
          startTime: time.duration.days(1),
          duration: time.duration.days(1),
          validator: "0x6F76846f7C90EcEC371e1d96cA93bfE9d36eEb83",
          price: Web3Utils.toWei(`${0.1}`),
        }),
        `Invalid roundId`
      );
    });

    it(`Owner can't create the first round at id >= 2 (Reason: Invalid roundId)`, async () => {
      for (let i = 2; i <= 5; i++) {
        await expectRevert(
          setupRound({
            roundId: i,
            supply: 200,
            startTime: time.duration.days(1),
            duration: time.duration.days(1),
            validator: "0x6F76846f7C90EcEC371e1d96cA93bfE9d36eEb83",
            price: Web3Utils.toWei(`${0.1}`),
          }),
          `Invalid roundId`
        );
      }
    });

    it(`Owner can create round 1`, async () => {
      await setupRound({
        roundId: 1,
        supply: 16,
        startTime: time.duration.days(2),
        duration: time.duration.days(8),
        validator: "0x1aeFD4A0FbD506a40bdff825DbeD8d28F26aE02F",
        price: Web3Utils.toWei(`${0.1}`),
      });
    });

    it(`Owner can edit the round 1 (WL)`, async () => {
      await setupRound(rounds[1]);
    });

    it(`Owner can create round 2 (public)`, async () => {
      await setupRound(rounds[2]);
    });

    it(`Everyone can get the array of rounds with allRounds view function`, async () => {
      const allRounds = await instance.allRounds();

      assert.equal(
        allRounds.length,
        rounds.length - 1,
        "Invalid allRounds length"
      );

      for (const [idx, round] of allRounds.entries()) {
        const expectedRound = rounds[idx + 1];

        assert.equal(
          round.id.toString(),
          expectedRound.roundId.toString(),
          "Invalid roundId"
        );
        assert.equal(
          round.supply.toString(),
          expectedRound.supply.toString(),
          "Invalid supply"
        );
        assert.equal(
          round.startTime.toString(),
          testStartTime.add(expectedRound.startTime).toString(),
          "Invalid startTime"
        );
        assert.equal(
          round.duration.toString(),
          expectedRound.duration.toString(),
          "Invalid duration"
        );
        assert.equal(
          round.validator,
          expectedRound.validator ?? ZERO_ADDRESS,
          "Invalid validator"
        );
        assert.equal(
          round.price.toString(),
          expectedRound.price.toString(),
          "Invalid validator"
        );
      }
    });
  });

  /**
   * BEFORE ROUNDS START
   */
  describe("\n BEFORE ROUNDS START", () => {
    it(`User can't mint in round 1 if not started (Reason: Round not in progress)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 1,
            amount: 1,
            maxMint: 5,
            validator_private_key: rounds[1].validator_private_key,
          },
          user1
        ),
        `Round not in progress`
      );
    });

    it(`User can't mint in a non existing round (Reason: Round not in progress)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 10,
            amount: 1,
            maxMint: 5,
          },
          user1
        ),
        `Round not in progress`
      );
    });

    it(`User can't mint in round 0 (Reason: Round not in progress)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 0,
            amount: 1,
            maxMint: 5,
          },
          user1
        ),
        `Round not in progress`
      );
    });
  });

  /**
   * ROUND 1 MINT
   */
  describe("\n ROUND 1 MINT", () => {
    it(`Round 1 started`, async () => {
      await time.increaseTo(testStartTime.add(rounds[1].startTime));
      const latestTime = await time.latest();
      const round = await instance.rounds(1);
      assert.equal(
        new BN(`${round.startTime}`).lte(latestTime),
        true,
        "Start time not correct"
      );
    });

    it(`User can't mint in round 1 after payload (Reason: Signature expired)`, async () => {
      const latestTime = await time.latest();
      await expectRevert(
        mint(
          {
            roundId: 1,
            amount: 1,
            maxMint: 5,
            validator_private_key: rounds[1].validator_private_key,
          },
          user1,
          {
            payloadExpiration: latestTime.sub(time.duration.seconds(30)),
          }
        ),
        `Signature expired`
      );
    });

    it(`User can't mint in round 1 with an other validator (Reason: Invalid signature)`, async () => {
      await expectRevert(
        mint({ roundId: 1, amount: 1, maxMint: 5 }, user1, {
          validator_private_key: otherPrivateKey,
        }),
        `Invalid signature`
      );
    });

    it(`User can't mint in round 1 without validator (Reason: Need a sig)`, async () => {
      await expectRevert(
        instance.mint(1, 1, {
          from: user1,
        }),
        `Need a sig`
      );
    });

    it(`User can't mint more tokens than maximum authorized by the validator (Reason: Max allowed)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 1,

            amount: 5,
            maxMint: 4,
            validator_private_key: rounds[1].validator_private_key,
          },
          user1
        ),
        `Max allowed`
      );
    });

    it(`User can't mint with a lower price (Reason: Wrong price)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 1,

            amount: 2,
            maxMint: 2,
            validator_private_key: rounds[1].validator_private_key,
          },
          user1,
          {
            price: Web3Utils.toWei(`${0.001}`),
          }
        ),
        `Wrong price`
      );
    });

    it(`User can't mint 0 tokens (Reason: Zero amount)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 1,

            amount: 0,
            maxMint: 2,
            validator_private_key: rounds[1].validator_private_key,
          },
          user1
        ),
        `Zero amount`
      );
    });

    it(`User1 can mint 1 token in round 1 with all the correct parameters !`, async () => {
      await mint(
        {
          roundId: 1,

          amount: 2,
          maxMint: 2,
          validator_private_key: rounds[1].validator_private_key,
        },
        user1
      );
    });

    it(`User1 can't mint more tokens in round 1 (Reason: Max allowed)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 1,

            amount: 1,
            maxMint: 2,
            validator_private_key: rounds[1].validator_private_key,
          },
          user1
        ),
        `Max allowed`
      );
    });

    it(`User1 can mint tokens again in round 1 (validator's choice , new WL pass) !`, async () => {
      await mint(
        {
          roundId: 1,

          amount: 3,
          maxMint: 5,
          validator_private_key: rounds[1].validator_private_key,
        },
        user1
      );
    });

    it(`Round 1 ended, users can't mint after the end of the round (Reason: Round not in progress)`, async () => {
      const roundEndTime = testStartTime
        .add(rounds[1].startTime)
        .add(rounds[1].duration);
      await time.increaseTo(roundEndTime);
      const latestTime = await time.latest();
      assert.equal(roundEndTime.lte(latestTime), true, "End time not correct");

      await expectRevert(
        mint(
          {
            roundId: 1,

            amount: 1,
            maxMint: 5,
            validator_private_key: rounds[1].validator_private_key,
          },
          users[3]
        ),
        `Round not in progress`
      );
    });

    it(`Owner can edit round 1 for change duration`, async () => {
      rounds[1].duration = 0;
      await setupRound(rounds[1]);
    });

    it(`Round 1 is now sold out after everyones mints`, async () => {
      const round = await instance.rounds(1);

      const remainingTokens = new BN(`${round.supply}`).sub(
        new BN(`${round.totalMinted}`)
      );

      // Severals users mints, one by one...
      for (let i = 0; i < remainingTokens.toNumber(); i++) {
        const user = users[i % users.length];
        await mint(
          {
            roundId: 1,

            amount: 1,
            maxMint: 1000,
            validator_private_key: rounds[1].validator_private_key,
          },
          user
        );
      }

      // Now should by sold out
      const newRound = await instance.rounds(1);
      assert.equal(
        newRound.supply.toString(),
        newRound.totalMinted.toString(),
        "Total supply not valid"
      );
    });

    it(`Users can't mint in round 1 after round sold out (Reason: Round supply exceeded)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 1,

            amount: 1,
            maxMint: 99999,
            validator_private_key: rounds[1].validator_private_key,
          },
          users[3]
        ),
        `Round supply exceeded`
      );
    });
  });

  /**
   * ROUND 2 MINT
   */
  describe("\n ROUND 2 MINT", () => {
    it(`Round 2 started`, async () => {
      await time.increaseTo(
        testStartTime.add(rounds[2].startTime.add(new BN(`${3600}`)))
      );
      const latestTime = await time.latest();
      const round = await instance.rounds(1);
      assert.equal(
        new BN(`${round.startTime}`).lte(latestTime),
        true,
        "Start time not correct"
      );
    });

    it(`User can't mint in round 2 with validator (Reason: No round validator)`, async () => {
      const user = user1;
      const maxMint = 10;
      const roundId = 2;
      const amount = 2;
      const price = rounds[1].price;
      const latestTime = await time.latest();
      const payloadExpiration = latestTime.add(time.duration.minutes(30));
      const signature = getValidatorSignature(
        user1,
        payloadExpiration,
        roundId,
        maxMint,
        instance.address,
        chainId,
        otherPrivateKey
      );

      await expectRevert(
        instance.privateMint(
          roundId,
          amount,
          maxMint,
          payloadExpiration,
          signature,
          {
            from: user,
            value: price.mul(new BN(`${amount}`)),
          }
        ),
        `No round validator`
      );
    });

    it(`User can't mint more tokens than the maximum (Reason: Max allowed)`, async () => {
      await expectRevert(
        mint(
          {
            roundId: 2,

            amount: 4,
          },
          user1
        ),
        `Max allowed`
      );
    });

    it(`User can't mint (Reason: Wrong price)`, async () => {
      await expectRevert(
        mint({ roundId: 2, amount: 1 }, user1, {
          price: Web3Utils.toWei(`${0.00001}`),
        }),
        `Wrong price`
      );
    });

    it(`User1 can mint his maximum of tokens in two transaction`, async () => {
      const lastMintAmount = maxMintsPerWallet - 1;

      // first mint
      await mint({ roundId: 2, amount: 1 }, user1);

      // last mint
      if (lastMintAmount > 0) {
        await mint(
          {
            roundId: 2,

            amount: lastMintAmount,
          },
          user1
        );
      }
    });

    it(`Round 2 duration is infinite: user2 can mint a few days later`, async () => {
      await time.increase(time.duration.days(1));

      await mint(
        {
          roundId: 2,

          amount: maxMintsPerWallet,
        },
        user2
      );
    });
  });
});

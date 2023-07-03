// const { expect } = require("chai");

// describe("Monkey Token contract", function () {
//   it("Deployment assign total supply to contract deployer/owner", async function () {
//     const [owner] = await ethers.getSigners();
//     console.log("Signers: ", owner);

//     // Creating instance of token
//     const Token = await ethers.getContractFactory("Token");

//     // deploy token
//     const hardhatToken = await Token.deploy();

//     //   getting owner balance
//     const ownerBalance = await hardhatToken.checkBalance(owner.address);
//     console.log("Owner address: ", owner.address);

//     //   testing if balance correct
//     expect(await hardhatToken.TotalSupply()).to.equal(ownerBalance);
//   });

//   it("Transfer Function testing", async function () {
//     const [owner, addr1, addr2] = await ethers.getSigners();

//     // Creating instance of token
//     const Token = await ethers.getContractFactory("Token");

//     // deploy token
//     const hardhatToken = await Token.deploy();

//     // Tranfer 100 tokens from owner to addr1
//     await hardhatToken.transferToken(addr1.address, 100);
//     expect(await hardhatToken.checkBalance(addr1.address)).to.equal(100);

//     // Tranfer 30 tokens from addr1 to addr2
//     await hardhatToken.connect(addr1).transferToken(addr2.address, 30);
//     expect(await hardhatToken.checkBalance(addr1.address)).to.equal(70);

//   });
// });




// ########################################################
//  to avoid repetition of code, we will use MOCHA Framework
// (using HOOKS)

const { expect } = require("chai");

describe("Monkey Token contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  //   beforeEach : it will run these lines first before every test.
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
    // console.log(owner, addr1, addr2);
  });

  describe("Deployment", function () {
    it("Owner is assigned correctly?", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Total supply assigned to owner correctly?", async function () {
      const ownerBalance = await hardhatToken.checkBalance(owner.address);
      expect(await hardhatToken.TotalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Transfer tokens between accounts", async function () {
      // owner => addr1 : 15 tokens
      await hardhatToken.transferToken(addr1.address, 15);
      expect(await hardhatToken.checkBalance(addr1.address)).to.equal(15);
      expect(await hardhatToken.checkBalance(owner.address)).to.equal(85);

      // addr1 => addr2 : 5 tokens
      await hardhatToken.connect(addr1).transferToken(addr2.address, 5);
      expect(await hardhatToken.checkBalance(addr1.address)).to.equal(10);
    });

    it("Should fail if sender has no sufficient balance", async function () {
      // ##### transaction addr1 to owner
      const initialBalance = await hardhatToken.checkBalance(owner.address);

      // transfer
      await expect(
        hardhatToken.connect(addr1).transferToken(owner.address, 1)
      ).to.be.revertedWith("No sufficient balance");

      // checking owner(receiver) balance
      expect(await hardhatToken.checkBalance(owner.address)).to.equal(
        initialBalance
      );
    });

    it("Should update balance of sender and receiver accordingly", async function () {
      const initialOwnerBalance = await hardhatToken.checkBalance(
        owner.address
      );

      // transfer [owner to addr1 and addr2]
      await hardhatToken.transferToken(addr1.address, 20);
      await hardhatToken.transferToken(addr2.address, 15);

      const finalOwnerBalance = await hardhatToken.checkBalance(owner.address);

      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 35);

      const addr1Balance = await hardhatToken.checkBalance(addr1.address);
      expect(addr1Balance).to.equal(20);

      const addr2Balance = await hardhatToken.checkBalance(addr2.address);
      expect(addr2Balance).to.equal(15);
    });
  });
});

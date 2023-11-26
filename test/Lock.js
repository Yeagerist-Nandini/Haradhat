const { expect } = require("chai");

// describe("Token contract", function () {
  // it("Deployment should assign the total supply of tokens to the owner", async function () {
  //   const [owner] = await ethers.getSigners();

  //   const Token = await ethers.getContractFactory("Token"); //instance contract
  //   const hardhatToken=await Token.deploy();//deploy contract

  //   const ownerBalance = await hardhatToken.balanceOf(owner.address);
  //   expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  // });

  // it("Should transfer tokens between accounts", async function () {
  //   const [owner,add1,add2] = await ethers.getSigners();

  //   const Token = await ethers.getContractFactory("Token");
  //   const hardhatToken=await Token.deploy();

  //   await hardhatToken.transfer(add1.address,10);
  //   expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);

  //   await hardhatToken.connect(add1).transfer(add2.address,5);
  //   expect(await hardhatToken.balanceOf(add1.address)).to.equal(5);
  // });
// });


// We can say that the sample constant is an object comprised of the following:
// (1) contract's bytecode string
// (2) contract's interface object
// (3) signer object

// I think it's good to practice remembering them as written below:
// getContractFactory("name of the contract") ==> { "bytecode" , {interface} , {signer}  }

// Then it's time to do as below if we want to deploy our contract:
// const Sample = await sample.deploy()
// await Sample.deployed()



describe("Token Contract",function(){
  let Token;
  let hardhatToken;
  let owner;
  let add1;
  let add2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, add1, add2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment",function(){
    it("Should set the right owner",async function(){
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  })
  

  describe("Transaction",function(){
    it("Should transfer tokens between accounts", async function () {
      await hardhatToken.transfer(add1.address,10);
      expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);
  
      await hardhatToken.connect(add1).transfer(add2.address,5);
      expect(await hardhatToken.balanceOf(add2.address)).to.equal(5);
    });

    it("Should fail if sender does not have enough tokens",async function(){
      const initialOwnerBalance=await hardhatToken.balanceOf(owner.address);
      await expect(hardhatToken.connect(add1).transfer(owner.address,2)
      ).to.be.revertedWith("Not enough tokens");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers",async function(){
      const initialOwnerBalance=await hardhatToken.balanceOf(owner.address);
      await hardhatToken.transfer(add1.address,10);
      await hardhatToken.transfer(add2.address,5);

      const finalOwnerBalance=await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance-BigInt('15'));

      const addr1Balance = await hardhatToken.balanceOf(add1.address);
      expect(addr1Balance).to.equal(10);
      const addr2Balance = await hardhatToken.balanceOf(add2.address);
      expect(addr2Balance).to.equal(5);
    });
  })

})


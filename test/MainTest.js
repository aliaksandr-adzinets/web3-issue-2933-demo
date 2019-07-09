const Main = artifacts.require("Main")

contract("Main Test", function(accounts) {

    it("should execute main() using Truffle-embedded Web3", () => {
        return Main.deployed().then(main => {
            console.log("Web3 version: " + this.web3.version)
            return main.transfer()
        })
    })

})


const ERC20 = artifacts.require("ERC20")
const ERC721 = artifacts.require("ERC721")
const Main = artifacts.require("Main")

module.exports = function(deployer) {
    let erc20, erc721
    deployer.deploy(ERC20).then(instance => {
        erc20 = instance
        return deployer.deploy(ERC721).then(instance => {
            erc721 = instance
            return deployer.deploy(Main, erc20.address, erc721.address)
        })
    })
}



let ERC20 = require('./build/contracts/ERC20.json')
let ERC721 = require('./build/contracts/ERC721.json')
let Main = require('./build/contracts/Main.json')

let Web3 = require('web3')
let web3 = new Web3('ws://localhost:8545')


function sendTransactionCallback(err, transactionHash) {
    if (!err) console.log('success: ' + transactionHash)
    else console.log('error: ' + err)
}

function logEvents(err, events) { 
    events.forEach(function(event) {
        console.log(event.event + " (block #" + event.blockNumber + "): " + JSON.stringify(event.returnValues))
    })
}

async function test()  {

    console.log('Web3 version:  ' + web3.version)
    console.log('Web3 provider: ' + web3.currentProvider.host)

    let erc20 =  new web3.eth.Contract( ERC20.abi,  '0x180D179Bbf473A30183Fe858E8416351D2170Fd2')
    let erc721 = new web3.eth.Contract( ERC721.abi, '0x770191B327a9f6cd83B997F68c1ce3c8e6a018dc')
    let main =   new web3.eth.Contract( Main.abi,   '0x84b085c0d4B4D6fbf6490f8246Bc5cD317d2d4cD')

    let from = '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
    let to = main.address
    let gas = '0x6691b7'
    let gasPrice = '0x4a817c800'
    let jsonInterface = Main.abi.find(e => e.name == 'transfer')
    let data = web3.eth.abi.encodeFunctionCall(jsonInterface, [])
    let sendTransactionParam = {from:from,to:to,gas:gas,gasPrice:gasPrice,data:data}
    console.log('sendTransactionParam: ' + JSON.stringify(sendTransactionParam))

    let startBlock = await web3.eth.getBlockNumber()
    web3.eth.sendTransaction(sendTransactionParam, sendTransactionCallback)

    let fromBlock = '0x' + (startBlock+1).toString(16)
    let toBlock = 'latest'
    let getPastEventParam = {fromBlock:fromBlock,toBlock:toBlock}
    console.log('getPastEventParam: ' + JSON.stringify(getPastEventParam))
    await main.getPastEvents(  'MainTransfer', Object.assign({}, getPastEventParam), logEvents)
    await erc20.getPastEvents( 'Transfer',     Object.assign({}, getPastEventParam), logEvents)
    await erc721.getPastEvents('Transfer',     Object.assign({}, getPastEventParam), logEvents)

    process.exit()
}

test()


const { ethers } = require("ethers");

const url = "https://eth-mainnet.alchemyapi.io/v2/WfEPEh3XLK-_l00odHfTTPRDQqSx-9Rx";
const provider = new ethers.providers.JsonRpcProvider(url);

async function main() {
    blockNumber = await provider.getBlockNumber();
    console.log("The current block number for Ethereum is", blockNumber);
}

main();

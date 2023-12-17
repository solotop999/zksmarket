import { Wallet, Provider } from "zksync-web3";

//mint link: https://zksmarket.ink/

//////////////// EDIT HERE ///////////////
const privateKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const hexData = '0x646174613a2c7b2270223a227a72632d3230222c226f70223a226d696e74222c227469636b223a2273796e63222c22616d74223a2234227d';
const PROVIDER = new Provider("https://zksync.rpc.thirdweb.com");
/////////////////////////////


const ACCOUNT = new Wallet(privateKey, PROVIDER)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let ethTransferTx = {
  from: ACCOUNT.address,
  to: ACCOUNT.address,
  data: hexData,
  value: 0,
  gasPrice: await PROVIDER.getGasPrice(),
  gasLimit: 350000,
};


console.log("\nSTART MINT zkSync #Inscriptions..\n")

async function sendTransactions() {
  const transactionsPerWait = 15;
  const waitTimeAfter15Tx = 20000; // 10 seconds
  for (let _count = 0; _count <= 500; _count++) {
    try {
      const tx = await ACCOUNT.sendTransaction(ethTransferTx);
      console.log(`${_count}. tx Hash: https://explorer.zksync.io/tx/${tx.hash}`);
    } catch (error) {
      console.error("Error sending transaction:", error.message);
    }
    if (_count % transactionsPerWait === 0 && _count !== 0) {
      console.log(`Waiting for ${waitTimeAfter15Tx / 1000} seconds...`);
      await sleep(waitTimeAfter15Tx);
    }
    await sleep(3000);
  }
}



sendTransactions();

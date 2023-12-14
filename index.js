require("dotenv").config();
const ethers = require("ethers");

const contractABI = [
  {
    inputs: [],
    name: "count",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dec",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "get",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "inc",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const provider = new ethers.AlchemyProvider('goerli', process.env.API_KEY);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const counterContract = new ethers.Contract(
  "0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A",
  contractABI,
  wallet
);

async function get() {
  const currentCounterValue = await counterContract.get();
  console.log('Current Counter Value: ', currentCounterValue);
}

async function inc() {
  const tx = await counterContract.inc();
  console.log('Increment Transaction: ', `https://goerli.etherscan.io/tx/${tx.hash}`);
}

async function dec() {
  const tx = await counterContract.dec();
  console.log('Decrement Transaction: ', `https://goerli.etherscan.io/tx/${tx.hash}`);
}

get();
// inc();
// dec();

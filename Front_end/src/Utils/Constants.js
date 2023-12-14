import abi from "./ContractAbi.json"
import { ethers } from "ethers";

export const contractAddress = "0x2225c6823B8D2d5F5358f19fcB2E1fD7B5108535";
export const contractABI = abi.abi;
export function createEthereumContract() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
}

import { ethers } from "ethers";

async function requestAccount() {
  console.log("Requesting account...");

  // ❌ Check if Meta Mask Extension exists
  if (window.ethereum) {
    console.log("detected");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      throw error;
    }
  } else {
    alert("Meta Mask not detected");
  }
}

// Create a provider to interact with a smart contract
export async function getProvider() {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }
}

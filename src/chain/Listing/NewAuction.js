import { ethers } from "ethers";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { chain } from "../../constants";
import { db, auth } from "../../firebase";
import { AuctionManagerABI, PropertyNFTABI } from "../abi";
import { getProvider } from "../provider";

const NewAuction = async (propertyData, setPropertyData) => {
  try {
    // check if an auction for the property already exists
    const q1 = query(
      collection(db, "auction"),
      where(
        "propertyId",
        "==",
        `${propertyData.propertyId}`,
        where("status", "==", "active")
      )
    );
    const checkAuctionSnapshot = await getDocs(q1);
    if (checkAuctionSnapshot.docs.length > 0) {
      // Auction already exists and is ongoing
      // Update the property table to fix "eligible" inconsistency
      await updateDoc(doc(db, "property", propertyData.propertyId), {
        status: "auction",
      });
    } else {
      // Auction does not exist
      // Create a new auction
      const newAuctionRef = doc(collection(db, "auction"));
      const provider = await getProvider();
      // Add a new auction in the smart contract
      const auctionManagerContract = new ethers.Contract(
        chain.auctionManagerContract,
        AuctionManagerABI,
        provider
      );
      const signer = provider.getSigner();
      const contractWithSigner = auctionManagerContract.connect(signer);
      const amount = ethers.utils.parseEther(String(chain.auctionStake), 18);
      const tx = await contractWithSigner.addAuction(
        newAuctionRef.id,
        propertyData.propertyId,
        {
          value: amount,
        }
      );
      await tx.wait(1);
      // Record new auction start and the stake collected from the landlord
      await addDoc(collection(db, `transactions`), {
        ...chain.transactionFields(
          tx,
          propertyData.propertyId,
          auth.currentUser.uid
        ),
        value: chain.auctionStake,
        type: "Auction started and Stake collected",
      });
      // Let the contract handle the property NFT
      const propertyNFTContract = new ethers.Contract(
        chain.propertyNFTContract,
        PropertyNFTABI,
        provider
      );
      const NFTcontractWithSigner = propertyNFTContract.connect(signer);
      const ownerSigner = new ethers.Wallet(chain.ownerPrivateKey, provider);
      const tx2 = await NFTcontractWithSigner.approve(
        ownerSigner.address,
        propertyData.tokenId
      );
      await tx2.wait(1);
      await addDoc(collection(db, `transactions`), {
        ...chain.transactionFields(
          tx2,
          propertyData.propertyId,
          auth.currentUser.uid
        ),
        type: "NFT approved for transfer",
      });
      // add new auction doc
      // TODO: Update the endedAt
      await addDoc(collection(db, `auction`), {
        landlordAddress: tx2.from,
        propertyId: propertyData.propertyId,
        status: "ongoing",
        startedAt: Date.now(),
        endedAt: Date.now() + 604800000,
      });
      // update the property doc status
      await updateDoc(doc(db, "property", propertyData.propertyId), {
        status: "auction",
      });
      // Re-render component to show auction card
      setPropertyData({ ...propertyData, status: "auction" });
    }
  } catch (err) {
    console.log(err);
  }
};

export default NewAuction;

import { ethers } from "ethers";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { chain } from "../../constants";
import { db } from "../../firebase";
import { AuctionManagerABI } from "../abi";
import { getProvider } from "../provider";

const EndAuction = async (propertyId, propertyData, setPropertyData) => {
  try {
    // check if an auction for the property already exists
    const q1 = query(
      collection(db, "auction"),
      where(
        "propertyId",
        "==",
        `${propertyId}`,
        where("status", "==", "auction")
      )
    );
    const checkAuctionSnapshot = await getDocs(q1);
    if (checkAuctionSnapshot.docs.length < 1) {
      // Auction cannot be closed as it does not exist
      console.log("Auction does not exist");
      return;
    }
    // Close the auction on chain
    const provider = await getProvider();
    const auctionManagerContract = new ethers.Contract(
      chain.auctionManagerContract,
      AuctionManagerABI,
      provider
    );
    const signer = provider.getSigner();
    const contractWithSigner = auctionManagerContract.connect(signer);
    const tx = await contractWithSigner.stopAuction(
      checkAuctionSnapshot.docs[0].id
    );
    await tx.wait(1);
    // update the status of the auction
    // TODO: Update the endedAt
    await updateDoc(doc(db, `auction`, checkAuctionSnapshot.docs[0].id), {
      status: "closed",
      endedAt: Date.now(),
    });
    // update the property doc status
    await updateDoc(doc(db, "property", propertyId), {
      status: "choose",
    });
    // Re-render component to show auction card
    setPropertyData({ ...propertyData, status: "choose" });
  } catch (err) {
    console.log(err);
  }
};

export default EndAuction;

import { ethers } from "ethers";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { chain } from "../../constants";
import { auth, db } from "../../firebase";
import { AuctionManagerABI } from "../abi";
import { getProvider } from "../provider";

const UpdateBid = async (
  bidValue,
  auctionSpecs,
  setPreviousBid,
  setError,
  auctionBids,
  setAuctionBids
) => {
  try {
    setError("");
    // check if the value surpasses the startingPrice
    if (bidValue < auctionSpecs.startingPrice) {
      setError("Insufficient bid value");
      return;
    }
    // check if the bidder is the owner of the property
    if (auth.currentUser.uid === auctionSpecs.landlord) {
      setError("Landlord cannot bid on his own property");
      return;
    }
    // check if a user has already bid on this property before
    const q1 = query(
      collection(db, "auction", auctionSpecs.auctionId, "bids"),
      where("userId", "==", auth.currentUser.uid)
    );
    const existingBidSnapshot = await getDocs(q1);
    if (existingBidSnapshot.docs.length < 1) {
      setError("This user has not bid before and must create.");
      return;
    }
    // check if the new bid value is lower than the old one
    if (existingBidSnapshot.docs[0].data().value > bidValue) {
      setError(
        `Your new bid must be higher than your previous one: ${
          existingBidSnapshot.docs[0].data().value
        } ETH`
      );
      return;
    }
    // update bid to chain and send stake
    const provider = await getProvider();
    const auctionManagerContract = new ethers.Contract(
      chain.auctionManagerContract,
      AuctionManagerABI,
      provider
    );
    const signer = provider.getSigner();
    const contractWithSigner = auctionManagerContract.connect(signer);
    const amount = ethers.utils.parseEther(String(bidValue), 18);
    const stake = ethers.utils.parseEther(
      String(
        chain.bidStakePercent *
          (bidValue - existingBidSnapshot.docs[0].data().value)
      ),
      18
    );
    const tx1 = await contractWithSigner.updateBid(
      auctionSpecs.auctionId,
      amount,
      {
        value: stake,
      }
    );
    await tx1.wait(1);
    // Update bid in db
    await updateDoc(
      doc(
        db,
        `auction`,
        auctionSpecs.auctionId,
        "bids",
        existingBidSnapshot.docs[0].id
      ),
      {
        value: bidValue,
        timestamp: Date.now(),
      }
    );
    setPreviousBid({
      userId: auth.currentUser.uid,
      value: bidValue,
      timestamp: Date.now(),
    });
    const refreshedBids = auctionBids.filter(
      (bid) => bid.data().userId !== auth.currentUser.uid
    );
    setAuctionBids([
      ...refreshedBids,
      {
        data: () => {
          return {
            userId: auth.currentUser.uid,
            value: bidValue,
            timestamp: Date.now(),
          };
        },
      },
    ]);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

export default UpdateBid;

import { ethers } from "ethers";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { chain } from "../../constants";
import { auth, db } from "../../firebase";
import { AuctionManagerABI } from "../abi";
import { getProvider } from "../provider";

const AddBid = async (
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
    if (existingBidSnapshot.docs.length > 0) {
      setError("This user already has a bid and can only update.");
      return;
    }
    // add bid to chain and send stake
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
      String(chain.bidStakePercent * bidValue),
      18
    );
    const tx1 = await contractWithSigner.addBid(
      auctionSpecs.auctionId,
      amount,
      {
        value: stake,
      }
    );
    await tx1.wait(1);
    // Add bid to db
    await addDoc(collection(db, `auction`, auctionSpecs.auctionId, "bids"), {
      userId: auth.currentUser.uid,
      value: bidValue,
      timestamp: Date.now(),
    });
    setPreviousBid({
      userId: auth.currentUser.uid,
      value: bidValue,
      timestamp: Date.now(),
    });
    setAuctionBids([
      ...auctionBids,
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

export default AddBid;

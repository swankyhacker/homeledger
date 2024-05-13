import { constants, ethers } from "ethers";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { chain } from "../../constants";
import { db } from "../../firebase";
import { PropertyNFTABI } from "../abi";
import { getProvider } from "../provider";

const SignAgreement = async (chosenBid, propertyData, setPropertyData) => {
  try {
    // get landlord's address
    const q1 = query(
      collection(db, "auction"),
      where("propertyId", "==", propertyData.propertyId)
    );
    const auctionSnapshot = await getDocs(q1);
    if (auctionSnapshot.docs.length < 1) {
      console.log("Auction not found");
    }
    const landlordAddress = auctionSnapshot.docs[0].data().landlordAddress;
    // Transfer Payment to landlord
    const provider = await getProvider();
    const propertyNFTContract = new ethers.Contract(
      chain.propertyNFTContract,
      PropertyNFTABI,
      provider
    );
    const signer = provider.getSigner();
    const amount = ethers.utils.parseEther(
      String(chosenBid.value - chosenBid.value * chain.bidStakePercent),
      18
    );
    const tx = await signer.sendTransaction({
      to: landlordAddress,
      value: amount,
    });
    await tx.wait(1);
    // Transfer NFT to the renter
    const renterAddress = tx.from;
    const ownerSigner = new ethers.Wallet(chain.ownerPrivateKey, provider);
    const nonce = await provider.getTransactionCount(landlordAddress);
    const contractWithSigner = propertyNFTContract.connect(ownerSigner);
    const tx2 = await contractWithSigner.transferFrom(
      landlordAddress,
      renterAddress,
      propertyData.tokenId,
      { nonce }
    );
    await tx2.wait(1);
    // update status in the database
    await updateDoc(doc(db, `property`, propertyData.propertyId), {
      status: "leased",
      lastLeasedDate: Date.now(),
    });
    setPropertyData({
      ...propertyData,
      status: "leased",
      lastLeasedDate: Date.now(),
    });
  } catch (err) {
    console.log(err);
  }
};

export default SignAgreement;

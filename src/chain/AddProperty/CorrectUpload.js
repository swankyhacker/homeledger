import { ethers } from "ethers";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import DepositStake from "./DepositStake";
import { chain } from "../../constants";
import { PropertyNFTABI } from "../abi";
import { useNavigate } from "react-router-dom";

const CorrectUpload = async (formDetails, setError) => {
  try {
    setError("");
    const { contract, propertyId, provider } = await DepositStake(setError);
    const signer = new ethers.Wallet(chain.ownerPrivateKey, provider);
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.returnStake(propertyId);
    await tx.wait(1);
    // Record successful transaction
    await addDoc(collection(db, `transactions`), {
      ...chain.transactionFields(tx, propertyId, String(auth.currentUser.uid)),
      value: chain.depositFee,
      type: "Property Added",
    });
    // mint NFT
    const propertyNFTContract = new ethers.Contract(
      chain.propertyNFTContract,
      PropertyNFTABI,
      provider
    );
    const NFTcontractWithSigner = propertyNFTContract.connect(signer);
    const tx2 = await NFTcontractWithSigner.mintProperty(propertyId, "");
    await tx2.wait(1);
    // Record NFT minting transaction
    await addDoc(collection(db, `transactions`), {
      ...chain.transactionFields(tx2, propertyId, String(auth.currentUser.uid)),
      type: "Property NFT Minted",
    });
    // Get tokenId of the NFT
    const tx3 = await NFTcontractWithSigner.getTokenId(propertyId);
    // await tx3.wait(1);
    const tokenId = tx3.toNumber();
    // Add property to database
    await setDoc(doc(db, `property`, propertyId), {
      status: "eligible",
      ...formDetails,
      landlord: String(auth.currentUser.uid),
      renter: null,
      tokenId,
      startingPrice: 1,
    });
  } catch (err) {
    console.log(err);
    setError(err.message);
  }
};

export default CorrectUpload;

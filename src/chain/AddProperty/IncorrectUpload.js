import { ethers } from "ethers";
import { addDoc, collection } from "firebase/firestore";
import { chain } from "../../constants";
import { db, auth } from "../../firebase";
import DepositStake from "./DepositStake";

const IncorrectUpload = async (setError) => {
  try {
    setError("");
    const { contract, propertyId, provider } = await DepositStake(setError);
    const signer = new ethers.Wallet(chain.ownerPrivateKey, provider);
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.confiscateStake(propertyId);
    await tx.wait(1);
    // Record failed transaction
    await addDoc(collection(db, `transactions`), {
      data: tx.data,
      from: tx.from,
      hash: tx.hash,
      nonce: tx.nonce,
      r: tx.r,
      s: tx.s,
      to: tx.to,
      value: chain.depositFee,
      type: "Property Failed",
      property: propertyId,
      user: String(auth.currentUser.id),
      timestamp: Date.now(),
    });
    await tx.wait(1);
  } catch (err) {
    setError(err.message);
  }
};

export default IncorrectUpload;

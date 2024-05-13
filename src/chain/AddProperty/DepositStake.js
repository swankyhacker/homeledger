import { ethers } from "ethers";
import { addDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";

import { PropertyCheckerABI } from "../abi";
import { getProvider } from "../provider";
import { chain } from "../../constants";

const DepositStake = async (setError) => {
  try {
    const provider = await getProvider();
    setError("");
    const newPropertyRef = doc(collection(db, "property"));

    // TODO: Change the address below
    const propertyCheckerContract = new ethers.Contract(
      chain.propertyCheckerContract,
      PropertyCheckerABI,
      provider
    );
    const signer = provider.getSigner();
    const contractWithSigner = propertyCheckerContract.connect(signer);
    const amount = ethers.utils.parseEther(String(chain.depositFee), 18);
    const tx = await contractWithSigner.depositStake(newPropertyRef.id, {
      value: amount,
    });
    await tx.wait(1);
    // Record transaction
    await addDoc(collection(db, `transactions`), {
      ...chain.transactionFields(
        tx,
        newPropertyRef.id,
        String(auth.currentUser.uid)
      ),
      value: chain.depositFee,
      type: "Property Deposit",
    });
    return {
      contract: contractWithSigner,
      propertyId: newPropertyRef.id,
      provider,
      landlordAddress: tx.from,
    };
  } catch (err) {
    throw err.message;
  }
};

export default DepositStake;

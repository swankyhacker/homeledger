import { Button } from "@mui/material";
import { chain } from "../../constants";
import { SignAgreement } from "../../chain/Listing";

const SignLeaseCard = ({ chosenBid, propertyData, setPropertyData }) => {
  return (
    <div className="w-full h-[65%] flex flex-col bg-white rounded-xl shadow-xl p-6">
      <p className="font-bold text-2xl mb-2">Sign Lease</p>
      <p className="font-light text-md">
        Your bid has been chosen. <br />
        <br />
        Please sign the lease and transfer the money to the landlord to rent the
        property. After payment is verified, please check your wallet to confirm
        ownership of the NFT.
      </p>
      <br />
      <div className="flex justify-between">
        <p>Bid:</p>
        <p className="font-bold">{chosenBid.value} ETH</p>
      </div>
      <div className="flex justify-between">
        <p>Stake Collected:</p>
        <p className="font-bold">
          {" "}
          {(chain.bidStakePercent * chosenBid.value).toFixed(2)} ETH
        </p>
      </div>
      <div className="flex justify-between">
        <p>Amount Payable:</p>
        <p className="font-bold">
          {(chosenBid.value - chain.bidStakePercent * chosenBid.value).toFixed(2)}{" "}
          ETH
        </p>
      </div>
      <br />
      <Button
        className="w-full bg-[#293241]"
        variant="contained"
        style={{ backgroundColor: "#293241" }}
        onClick={() => SignAgreement(chosenBid, propertyData, setPropertyData)}
      >
        Sign
      </Button>
    </div>
  );
};

export default SignLeaseCard;

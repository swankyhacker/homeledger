import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ChooseBidItem = ({
  bid,
  userIdToNames,
  propertyData,
  setPropertyData,
}) => {
  const selectBid = async () => {
    await updateDoc(doc(db, `property`, propertyData.propertyId), {
      status: "sign",
      renter: bid.userId,
    });
    setPropertyData({ ...propertyData, status: "sign", renter: bid.userId });
  };

  return (
    <div className="w-full h-[15%] flex justify-between mb-2">
      <div className="w-[50%] flex items-center">
        <AccountCircle style={{ fontSize: 45 }} color="warning" />
        <div className="flex flex-col">
          <p className="font-bold text-sm">
            {userIdToNames[bid.userId] ?? "Unnamed"}
          </p>
          <p className="font-light text-sm">{bid.value} ETH</p>
        </div>
      </div>
      <div className="w-[30%] flex items-center">
        <Button variant="contained" onClick={selectBid}>
          Choose
        </Button>
      </div>
    </div>
  );
};

export default ChooseBidItem;

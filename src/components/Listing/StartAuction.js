import Button from "@mui/material/Button";
import { auth } from "../../firebase";
import { NewAuction } from "../../chain/Listing";

const StartAuction = ({ propertyData, setPropertyData }) => {
  return (
    <>
      {propertyData.landlord === auth.currentUser.uid ? (
        <Button
          className="w-full bg-[#293241]"
          variant="contained"
          style={{ backgroundColor: "#293241" }}
          onClick={() => NewAuction(propertyData, setPropertyData)}
        >
          Start Auction
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default StartAuction;

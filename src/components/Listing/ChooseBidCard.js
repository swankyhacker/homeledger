import { List } from "@mui/material";
import ChooseBidItem from "./ChooseBidItem";

const ChooseBidCard = ({
  auctionBids,
  userIdToNames,
  propertyData,
  setPropertyData,
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl shadow-xl p-6">
      <p className="text-2xl font-bold mb-2">Choose Bid</p>
      <div className="w-full h-[90%]">
        <List
          style={{
            width: "100%",
            height: "90%",
            maxHeight: "90%",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          {auctionBids.map((bid, index) => (
            <ChooseBidItem
              key={index}
              bid={bid.data()}
              userIdToNames={userIdToNames}
              propertyData={propertyData}
              setPropertyData={setPropertyData}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

export default ChooseBidCard;

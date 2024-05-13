import List from "@mui/material/List";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

import BidItem from "./BidItem";

const AuctionBids = ({ propertyId, auctionSpecs, auctionBids }) => {
  const [userIdToNames, setUserIdToNames] = useState({});

  useEffect(() => {
    const fetchBidderProfiles = async () => {
      const allUserIds = [];
      auctionBids.forEach((bid) => {
        allUserIds.push(bid.data().userId);
      });
      if (allUserIds.length > 0) {
        const q1 = query(
          collection(db, "users"),
          where(documentId(), "in", allUserIds)
        );
        const userSnapshot = await getDocs(q1);
        const table = {};
        userSnapshot.docs.forEach((doc) => (table[doc.id] = doc.data().name));
        setUserIdToNames({ ...table });
      }
    };
    fetchBidderProfiles();
  }, [auctionBids]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[10%] flex justify-between">
        <p className="font-bold">Live Auction</p>
        <p className="font-light text-sm">{auctionBids.length} Bids Made</p>
      </div>
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
          <BidItem
            key={index}
            bid={bid.data()}
            userIdToNames={userIdToNames}
          ></BidItem>
        ))}
      </List>
    </div>
  );
};

export default AuctionBids;

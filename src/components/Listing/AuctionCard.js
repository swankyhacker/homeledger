import { Button } from "@mui/material";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";

import { EndAuction } from "../../chain/Listing";
import AuctionBids from "./AuctionBids";
import AuctionSpecs from "./AuctionSpecs";
import BidForm from "./BidForm";

const AuctionCard = ({ propertyId, propertyData, setPropertyData }) => {
  const [auctionSpecs, setAuctionSpecs] = useState({});
  const [auctionBids, setAuctionBids] = useState([]);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      // Get auction's end time
      const q1 = query(
        collection(db, "auction"),
        where("propertyId", "==", propertyId),
        where("status", "==", "ongoing")
      );
      const auctionSnapshot = await getDocs(q1);
      if (auctionSnapshot.docs.length > 0) {
        // get auction bids
        const auctionId = auctionSnapshot.docs[0].id;
        const q2 = query(
          collection(db, "auction", auctionId, "bids"),
          orderBy("value", "desc")
        );
        const auctionBidsSnapshot = await getDocs(q2);
        setAuctionSpecs({
          ...propertyData,
          ...auctionSnapshot.docs[0].data(),
          auctionId: auctionSnapshot.docs[0].id,
        });
        setAuctionBids([...auctionBidsSnapshot.docs]);
      } else {
        console.log("No auction is ongoing for this property!");
      }
    };
    fetchAuctionDetails();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl shadow-xl p-6">
      <p className="text-2xl font-bold">Biddings</p>
      <p className="text-xs mb-2">Auction ID: {auctionSpecs.auctionId}</p>
      {/* <hr className="h-0.5 border-0 bg-black rounded-md"/> */}
      <div className="w-full h-[20%] mb-4">
        <AuctionSpecs auctionSpecs={auctionSpecs} auctionBids={auctionBids} />
      </div>
      <div className="w-full h-[50%]">
        <AuctionBids
          propertyId={propertyId}
          auctionSpecs={auctionSpecs}
          auctionBids={auctionBids}
        />
      </div>
      <div className="w-full h-[20%] mb-4">
        {/* TODO: Change the condition below to !== */}
        {auth.currentUser.uid === propertyData.landlord ? (
          <Button
            className="w-full bg-[#293241]"
            variant="contained"
            style={{ backgroundColor: "#293241" }}
            onClick={() =>
              EndAuction(propertyId, propertyData, setPropertyData)
            }
          >
            End Auction
          </Button>
        ) : (
          <BidForm
            auctionBids={auctionBids}
            auctionSpecs={auctionSpecs}
            setAuctionBids={setAuctionBids}
          />
        )}
      </div>
    </div>
  );
};

export default AuctionCard;

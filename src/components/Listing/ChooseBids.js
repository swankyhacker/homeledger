import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";

import ChooseBidCard from "./ChooseBidCard";

const ChooseBids = ({ propertyId, propertyData, setPropertyData }) => {
  const [auctionBids, setAuctionBids] = useState([]);
  const [userIdToNames, setUserIdToNames] = useState({});

  useEffect(() => {
    fetchBidderProfiles();
  }, [auctionBids]);

  useEffect(() => {
    if (
      auth.currentUser.uid === propertyData.landlord &&
      propertyData.renter === null
    ) {
      fetchAuctionBids();
    }
  }, []);

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

  const fetchAuctionBids = async () => {
    // Get auction's end time
    const q1 = query(
      collection(db, "auction"),
      where("propertyId", "==", propertyId)
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
      setAuctionBids([...auctionBidsSnapshot.docs]);
    } else {
      console.log("No auction is ongoing for this property!");
    }
  };

  return (
    <>
      {auth.currentUser.uid === propertyData.landlord ? (
        propertyData.renter === null ? (
          // Choosing Bids by landlord
          <ChooseBidCard
            auctionBids={auctionBids}
            userIdToNames={userIdToNames}
            propertyData={propertyData}
            setPropertyData={setPropertyData}
          />
        ) : (
          // Landlord has chosen a bid
          <></>
        )
      ) : (
        // Default Dialog for other people
        <div className="w-full h-[30%] flex flex-col bg-white rounded-xl shadow-xl p-6">
          <p className="font-bold text-2xl mb-2">Auction has ended</p>
          <p className="font-light text-md">
            The landlord is currently choosing bids. If your bid is chosen, you
            will be notified and asked to sign the leasing agreement.
          </p>
        </div>
      )}
    </>
  );
};

export default ChooseBids;

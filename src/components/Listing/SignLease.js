import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import SignLeaseCard from "./SignLeaseCard";

const SignLease = ({ propertyId, propertyData, setPropertyData }) => {
  const [chosenBid, setChosenBid] = useState({});

  useEffect(() => {
    const getChosenBid = async () => {
      const q1 = query(
        collection(db, "auction"),
        where("propertyId", "==", propertyId)
      );
      const auctionSnapshot = await getDocs(q1);
      if (auctionSnapshot.docs.length < 1) {
        console.log("Auction does not exist");
        return;
      }
      // get chosen bid
      const auctionId = auctionSnapshot.docs[0].id;
      const q2 = query(
        collection(db, "auction", auctionId, "bids"),
        where("userId", "==", propertyData.renter)
      );
      const auctionBidsSnapshot = await getDocs(q2);
      if (auctionBidsSnapshot.docs.length < 1) {
        console.log("Bid not found");
        return;
      }
      setChosenBid({ ...auctionBidsSnapshot.docs[0].data() });
    };

    getChosenBid();
  }, []);

  return (
    <>
      {auth.currentUser.uid === propertyData.landlord ? (
        // Landlord View
        <div className="w-full h-[30%] flex flex-col bg-white rounded-xl shadow-xl p-6">
          <p className="font-bold text-2xl mb-2">Lease sent to bidder</p>
          <p className="font-light text-md">
            You have chosen the bid of{" "}
            <span className="font-bold">{chosenBid.value} ETH.</span>. The
            agreement has been sent to the bidder and you will be notifed when
            he has signed the lease
          </p>
        </div>
      ) : (
        <></>
      )}
      {auth.currentUser.uid === propertyData.renter ? (
        // Winning bidderr's view
        <SignLeaseCard
          chosenBid={chosenBid}
          propertyData={propertyData}
          setPropertyData={setPropertyData}
        />
      ) : (
        <></>
      )}
      {auth.currentUser.uid !== propertyData.renter &&
      auth.currentUser.uid !== propertyData.landlord ? (
        // Default Dialog for other people
        <div className="w-full h-[30%] flex flex-col bg-white rounded-xl shadow-xl p-6">
          <p className="font-bold text-2xl mb-2">Auction has ended</p>
          <p className="font-light text-md">
            The landlord is currently choosing bids. If you have bid for this
            property and your bid is chosen, you will be notified and asked to
            sign the leasing agreement.
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SignLease;

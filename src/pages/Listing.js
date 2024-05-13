import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

import { Wrapper } from "../components/common";
import {
  AuctionCard,
  ChooseBids,
  LeasedCard,
  ListingDetails,
  ListingDimensions,
  SignLease,
  StartAuction,
} from "../components/Listing";

import { useLocation } from "react-router-dom";
import PropertyImage from "../images/Property/Interior_2.jpg";

const Listing = () => {
  const [propertyData, setPropertyData] = useState({});
  
  const location = useLocation();
  const propertyId = location.state.propertyId;

  useEffect(() => {
    const fetchPropertyDoc = async () => {
      // check if the owner is on the listing page
      const propertyDoc = await getDoc(doc(db, "property", propertyId));
      if (propertyDoc.exists()) {
        setPropertyData({ ...propertyDoc.data(), propertyId });
      } else {
        console.log("No such property!");
      }
    };
    fetchPropertyDoc();
  }, []);

  return (
    <Wrapper>
      <div className="w-full flex mx-6 mt-6">
        <div className=" w-[70%] h-full flex flex-col">
          <img className="mr-3 w-[90%] h-[50%]" src={PropertyImage} alt="" />
          <div className="w-full h-1/5 flex flex-col mt-4">
            <ListingDimensions />
          </div>
          <div className="w-4/5 h-1/5 flex flex-wrap justify-evenly mt-6 ml-2">
            <ListingDetails />
          </div>
        </div>
        <div className=" w-[30%] h-[95%]">
          {propertyData.status === "eligible" ? (
            <StartAuction
              propertyData={propertyData}
              setPropertyData={setPropertyData}
            />
          ) : (
            <></>
          )}
          {propertyData.status === "auction" ? (
            <AuctionCard
              propertyId={propertyId}
              propertyData={propertyData}
              setPropertyData={setPropertyData}
            />
          ) : (
            <></>
          )}
          {propertyData.status === "choose" ? (
            <ChooseBids
              propertyId={propertyId}
              propertyData={propertyData}
              setPropertyData={setPropertyData}
            />
          ) : (
            <></>
          )}
          {propertyData.status === "sign" ? (
            <SignLease
              propertyId={propertyId}
              propertyData={propertyData}
              setPropertyData={setPropertyData}
            />
          ) : (
            <></>
          )}
          {propertyData.status === "leased" ? (
            <LeasedCard propertyId={propertyId} propertyData={propertyData} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Listing;

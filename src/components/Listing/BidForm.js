import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { AddBid, UpdateBid } from "../../chain/Listing";
import { isUserVerified } from "../../functions";
import { useNavigate } from "react-router-dom";

const BidForm = ({ auctionBids, auctionSpecs, setAuctionBids }) => {
  const [bidValue, setBidValue] = useState(0);
  const [previousBid, setPreviousBid] = useState({});
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auctionBids.length < 0) {
      setPreviousBid({});
      return;
    }
    auctionBids.forEach((bid) => {
      if (bid.data().userId === auth.currentUser.uid) {
        setPreviousBid({ ...bid.data() });
      }
    });
    console.log("bids", auctionBids)
  }, [auctionBids]);

  useEffect(() => {
    const userStatus = async () => {
      const verified = await isUserVerified();
      setIsVerified(verified);
    };

    userStatus();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-between mb-6">
        {[...Array(4)].map((item, index) => (
          <Button
            key={index}
            variant="outlined"
            style={{ fontSize: 12, padding: 0, marginRight: 2, marginLeft: 2 }}
            value={
              auctionBids.length > 0
                ? (auctionBids[0].data().value + 0.1 * (index + 1)).toFixed(2)
                : (auctionSpecs.startingPrice + 0.1 * (index + 1)).toFixed(2)
            }
            onClick={(event) => setBidValue(event.target.value)}
          >
            {auctionBids.length > 0
              ? (auctionBids[0].data().value + 0.1 * (index + 1)).toFixed(1)
              : (auctionSpecs.startingPrice + 0.1 * (index + 1)).toFixed(
                  1
                )}{" "}
            {"\n"}
            ETH
          </Button>
        ))}
        <TextField
          id="standard-basic"
          variant="standard"
          type="number"
          style={{ width: "20%" }}
          value={bidValue}
          onChange={(event) => setBidValue(event.target.value)}
        />
      </div>
      <Button
        className="w-full bg-[#293241]"
        variant="contained"
        style={{ backgroundColor: "#293241" }}
        onClick={
          isVerified === true
            ? previousBid.value
              ? () =>
                  UpdateBid(
                    Number(bidValue),
                    auctionSpecs,
                    setPreviousBid,
                    setError,
                    auctionBids,
                    setAuctionBids
                  )
              : () =>
                  AddBid(
                    Number(bidValue),
                    auctionSpecs,
                    setPreviousBid,
                    setError,
                    auctionBids,
                    setAuctionBids
                  )
            : () => navigate("/verify")
        }
      >
        {previousBid.value ? "Update Bid" : "Bid"}
      </Button>
      <p className=" mt-2 font-light text-red-700">{error ? error : ""}</p>
    </div>
  );
};

export default BidForm;

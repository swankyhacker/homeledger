import AccountCircle from "@mui/icons-material/AccountCircle";
import AccessTime from "@mui/icons-material/AccessTime";

const AuctionSpecs = ({ auctionSpecs, auctionBids }) => {
  const profiles = ["warning", "primary", "error", "secondary"];
  return (
    <div className="flex h-full bg-[#f3f2f2] rounded-md p-3">
      <div className="w-1/2 flex flex-col justify-between border-r-2 border-gray-200 mr-2">
        <div className="h-[70%]">
          <p className="font-bold">Starting Price</p>
          <p className="font-light text-sm">{auctionSpecs.startingPrice} ETH</p>
        </div>
        <div className="flex w-[95%] h-[30%] relative justify-between">
          <div>
            {profiles.map((profile, index) => (
              <AccountCircle
                key={index}
                fontSize="medium"
                color={profile}
                style={{
                  position: "absolute",
                  left: index * 10,
                  zIndex: index,
                }}
              />
            ))}
          </div>
          <p className="text-sm font-light">{auctionBids.length} bids made</p>
        </div>
      </div>
      <div className="w-1/2">
        <div className="h-[70%]">
          <p className="font-bold">Highest Bid Price</p>
          <p className="font-light text-sm">
            {auctionBids.length > 0 ? auctionBids[0].data().value : "- - - -"}{" "}
            {"\n"}ETH
          </p>
        </div>
        <div className="flex w-[95%] h-[30%] items-center justify-between">
          <AccessTime color="primary" />
          <p className="text-sm font-light text-center">
            Ends at {"\n"}
            {new Date(auctionSpecs.endedAt).toLocaleTimeString("default", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}{" "}
            {"\n"}
            <br />
            {new Date(auctionSpecs.endedAt).toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuctionSpecs;

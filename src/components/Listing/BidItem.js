import AccountCircle from "@mui/icons-material/AccountCircle";

const BidItem = ({ bid, userIdToNames }) => {
  return (
    <div className="w-full h-[20%] flex justify-between mb-2">
      <div className="w-[80%] flex items-center">
        <AccountCircle style={{ fontSize: 45 }} color="warning" />
        <div className="flex flex-col">
          <p className="font-bold text-sm">{userIdToNames[bid.userId]}</p>
          <p className="font-light text-sm">
            {new Date(bid.timestamp).toLocaleTimeString("default", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
            {"\n"}
            on
            {"\n"}
            {new Date(bid.timestamp).toLocaleDateString("default", {
              month: "long",
              day:'2-digit',
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="w-[20%] flex items-center">
        <p>{bid.value} ETH</p>
      </div>
    </div>
  );
};

export default BidItem;

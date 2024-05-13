import LandingItem from "./LandingItem";
const LandingPanel = () => {
  return (
    <div className="w-full h-full flex flex-col pl-14">
      <p className="h-[10%] text-2xl font-semibold"> Featured Listings</p>
      <div className="w-full h-[90%] p-5 flex justify-evenly">
        <LandingItem />
        <LandingItem />
      </div>
    </div>
  );
};

export default LandingPanel;

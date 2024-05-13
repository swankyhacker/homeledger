import Button from "@mui/material/Button";
import PropertyImage from "../../images/Property/Interior_1.jpg";

const LandingItem = () => {
  return (
    <div className="w-[30%] h-full flex flex-col bg-white rounded-xl shadow-xl">
      <div className="w-full h-[50%]">
        <img
          className="w-full h-full rounded-t-md"
          src={PropertyImage}
          alt=""
        />
      </div>
      <div className="w-full h-[40%] flex items-center  justify-between p-2">
        <div className="flex flex-col">
          <p className="text-2xl font-bold mb-2">Capital City</p>
          <p className=" w-[73%] text-sm font-light bg-[#007ae9] text-white p-0.5 rounded-md">
            Condominium
          </p>
        </div>
        <p className="text-3xl font-normal">$4500</p>
      </div>
      <Button
        className="w-full bg-[#293241]"
        variant="contained"
        style={{ backgroundColor: "#293241" }}
      >
        View
      </Button>
    </div>
  );
};

export default LandingItem;

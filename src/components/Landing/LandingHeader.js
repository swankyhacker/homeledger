import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LandingHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[50%] h-full mt-6 ml-24 flex flex-col">
      <p className="w-full text-4xl font-bold text-center mb-6">
        Let us chain you to your new home
      </p>
      <p className="w-full font-medium">
        “ Revolutionize Your Rental Experience: Secure, Transparent, and
        Hassle-Free with Blockchain-Powered Leasing Solutions. ”
      </p>
      <br />
      <div
        className="w-full bg-[#e0fbfc] p-3 rounded-md shadow-lg flex"
        style={{ marginLeft: 200, marginTop: -30, width: "120%" }}
      >
        <TextField
          className="w-[60%] bg-white "
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#293241", width: "35%", marginLeft: 10 }}
          onClick={() => navigate("/catalogue")}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default LandingHeader;

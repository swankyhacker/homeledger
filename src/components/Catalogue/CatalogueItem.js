import { useNavigate } from "react-router-dom";
import PropertyImage from "../../images/Property/Interior_2.jpg";

const CatalogueItem = ({ propertyDetails, propertyId }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-[30%] h-[70%] flex flex-col bg-white rounded-xl shadow-xl mr-8 mb-8"
      onClick={() => navigate("/listing", { state: { propertyId } })}
    >
      <div className="w-full h-[50%]">
        <img
          className="w-full h-full rounded-t-md"
          src={PropertyImage}
          alt=""
        />
        <p className="w-full text-2xl font-bold mb-4 mt-4 ml-2 text-wrap">
          {propertyDetails.name}
        </p>
      </div>
      <div className="w-full h-[40%] flex items-center  justify-between p-2">
        <div className="w-[50%] flex flex-col">
          <p className="w-[40%] text-sm font-normal bg-[#007ae9] text-white p-1 rounded-md">
            {propertyDetails.status.charAt(0).toUpperCase() +
              propertyDetails.status.slice(1).toLowerCase()}
          </p>
        </div>
        <p className="text-3xl font-normal">
          {propertyDetails.startingPrice} ETH
        </p>
      </div>
      <p className="text-sm font-light rounded-md ml-2">
        {propertyDetails.city}
      </p>
    </div>
  );
};

export default CatalogueItem;

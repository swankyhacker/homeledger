import Bed from "@mui/icons-material/Bed";
import Bathtub from "@mui/icons-material/Bathtub";
import RoundedCorner from "@mui/icons-material/RoundedCorner";
import Train from "@mui/icons-material/Train";

const PropertyDimensions = () => {
  return (
    <>
      <p className="text-sm font-normal font-color text-gray-600">
        24 Nanyang Avenue, Krishna Builders
      </p>
      <div className="flex items-center">
        <div className="w-2/5 flex justify-around items-center my-2">
          <Bed fontSize="large"></Bed>
          <p>4 Beds</p>
          <Bathtub fontSize="large"></Bathtub>
          <p>2 Baths</p>
          <RoundedCorner fontSize="large"></RoundedCorner>
          <p>1036 sqft</p>
        </div>
      </div>
      <div className="flex items-center mb-1">
        <Train fontSize="large"></Train>
        <p>Nearby stations</p>
      </div>
      <p className="text-xs font-normal font-color text-gray-600">
        7 min from Boon Lay MRT
      </p>
    </>
  );
};

export default PropertyDimensions;

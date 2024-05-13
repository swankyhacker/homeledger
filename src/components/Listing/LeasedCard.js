import { auth } from "../../firebase";

const LeasedCard = ({ propertyData }) => {
  return (
    <div className="w-full h-[20%] flex flex-col bg-white rounded-xl shadow-xl p-6">
      <p className="font-bold text-2xl mb-2">Leased Property</p>
      <p className="font-light text-md">
        {auth.currentUser.uid === propertyData.renter
          ? `You leased this property in ${"\n"}`
          : `This property was already leased in ${"\n"}
        `}

        {new Date(propertyData.lastLeasedDate).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default LeasedCard;

import { Wrapper } from "../components/common";
import { CatalogueItem } from "../components/Catalogue";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Catalogue = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      const propertySnapshot = await getDocs(collection(db, "property"));
      setProperties([...propertySnapshot.docs]);
    };

    getProperties();
  }, []);
  return (
    <Wrapper>
      <div className="w-full h-full pt-8 pl-[10%] pr-[10%] overflow-auto">
        <p className="font-bold text-3xl">Featured</p>
        <br />
        <div className="w-full h-[90%] p-8 flex flex-wrap">
          {/* ==== */}
          {properties.map((property, index) => (
            <CatalogueItem
              key={index}
              propertyDetails={property.data()}
              propertyId={property.id}
            />
          ))}
          {/* ==== */}
        </div>
      </div>
    </Wrapper>
  );
};

export default Catalogue;

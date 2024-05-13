import { Wrapper } from "../components/common";
import { LandingHeader, LandingPanel } from "../components/Landing";

import PropertyImage from "../images/Property/Interior_1.jpg";

const Landing = () => {
  return (
    <Wrapper>
      <div className="w-full h-full">
        <div className="w-full h-[40%] flex">
          <div className="w-[60%] h-full">
            <LandingHeader />
          </div>
          <div className="w-[40%] h-full pt-6 pr-6">
            <img className="w-full h-full" src={PropertyImage} alt="" />
          </div>
        </div>
        <div className="w-full h-[60%]">
          <LandingPanel />
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;

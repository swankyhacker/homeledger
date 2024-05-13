import Navbar from "./Navbar";

const Wrapper = ({ children }) => {
  return (
    <div className="flex-col w-full h-full absolute bg-[#f3f3f3]">
      <div className="w-full h-[10%]">
        <Navbar></Navbar>
      </div>
      <div className="w-full h-[90%] flex">{children}</div>
    </div>
  );
};

export default Wrapper;

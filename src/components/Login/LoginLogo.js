import Logo from "../../images/Logo.png";

const LoginLogo = () => {
  return (
    <div className="flex w-full items-center my-10">
      <img className="mr-3" src={Logo} alt="" />
      <h1 className="text-5xl font-bold">
        <span className="text-[#ee6c4d]">Home</span>
        <span className="text-[#3d5a80]">Ledger</span>
      </h1>
    </div>
  );
};

export default LoginLogo;

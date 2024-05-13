import LoginLogo from "./LoginLogo";
import LoginMessage from "./LoginMessage";
import LoginNavigate from "./LoginNavigate";

import AdWall from "./AdWall";

const LoginWrapper = ({ title, message, children, isLogin }) => {
  return (
    <div className="flex">
      <div className="flex w-1/2 h-svh border-black border-2 bg-[#e0fbfc] justify-center items-center">
        <div className="flex-column items-center w-2/3 h-full">
          <LoginLogo />
          <LoginMessage title={title} message={message} />
          <div className="flex-column my-10">{children}</div>
          <LoginNavigate isLogin={isLogin} />
        </div>
      </div>
      <AdWall />
    </div>
  );
};

export default LoginWrapper;

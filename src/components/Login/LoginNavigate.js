import { Link } from "react-router-dom";

const LoginNavigate = ({ isLogin }) => {
  return (
    <div className="flex flex-col text-center">
      {isLogin ? (
        <>
          <p className="text-[#0062ff] font-bold my-2">Forgot password?</p>
          <p className="font-light my-2">or</p>
        </>
      ) : (
        <></>
      )}
      <>
        <div className="font-bold flex justify-center">
          {isLogin
            ? "Don't have an account? \n"
            : "Already have an account? \n"}
          <p className="text-[#0062ff] ml-1">
            {isLogin ? (
              <Link to={`signUp`}>Sign up!</Link>
            ) : (
              <Link to={`/`}>Log in!</Link>
            )}
          </p>
        </div>
      </>
    </div>
  );
};

export default LoginNavigate;

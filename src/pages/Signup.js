import { LoginWrapper } from "../components/Login";
import { SignupForm } from "../components/Signup/";

const SignUp =  () => {
  return (
    <LoginWrapper
      title={"Sign Up"}
      message={"Enter details to make a new account"}
      isLogin={false}
    >
      <SignupForm />
    </LoginWrapper>
  );
};

export default SignUp

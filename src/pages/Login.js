import { LoginWrapper, LoginForm } from "../components/Login";

const Login = () => {
  return (
    <LoginWrapper
      title={"Log in"}
      message={"Enter your details to sign into your account"}
      isLogin={true}
    >
      <LoginForm />
    </LoginWrapper>
  );
};

export default Login;

const LoginMessage = ({ title, message }) => {
  return (
    <div className="flex-column w-full mx-10 my-10">
      <p className="text-xl">{title}</p>
      <p className="text-3xl">Hey, Welcome!</p>
      <p>{message}</p>
    </div>
  );
};
export default LoginMessage;

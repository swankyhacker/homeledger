import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async () => {
    setError("");
    if (!email || !email.trim()) {
      setError("Email cannot be empty");
      return;
    }
    if (!password || !password.trim()) {
      setError("Password cannot be empty");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/landing");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {" "}
      <TextField
        className="w-full m-10"
        id="outlined-basic"
        label="Email Address"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <br />
      <TextField
        className="w-full"
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error ? <p className="text-red-800 mt-1">{error}</p> : <></>}
      <br />
      <br />
      <Button
        className="w-full bg-[#293241]"
        variant="contained"
        style={{ backgroundColor: "#293241" }}
        onClick={loginUser}
      >
        Log In
      </Button>
    </>
  );
};

export default LoginForm;

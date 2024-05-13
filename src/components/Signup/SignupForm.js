import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const createNewUser = async () => {
    setError("");
    if (!email || !email.trim()) {
      setError("Email cannot be empty");
      return;
    }
    if (!password || !password.trim()) {
      setError("Password cannot be empty");
      return;
    }
    if (!confirmPassword || confirmPassword !== password) {
      setError("Passwords in both fields do not match");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, `users`, newUser.user.uid), {
        email,
        singPassVerified: false,
      });
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
      <br />
      <br />
      <TextField
        className="w-full"
        id="outlined-basic"
        label="Re-type password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      {error ? <p className="text-red-800 mt-1">{error}</p> : <></>}
      <br />
      <br />
      <Button
        className="w-full bg-[#293241]"
        variant="contained"
        style={{ backgroundColor: "#293241" }}
        onClick={createNewUser}
      >
        Sign up
      </Button>
    </>
  );
};

export default SignUpForm;

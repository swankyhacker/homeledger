import { Wrapper } from "../components/common";
import Button from "@mui/material/Button";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";

const VerifySingpass = () => {
  const navigate = useNavigate();

  const verifyIdentity = async () => {
    await updateDoc(doc(db, `users`, auth.currentUser.uid), {
      name: "Bruce Wayne",
      singPassVerified: true,
    });
    navigate(-1);
  };

  return (
    <Wrapper>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[30%] h-[45%] flex flex-col bg-white rounded-xl shadow-xl p-6">
          <p className="font-bold text-2xl text-center">Verify SingPass</p>
          <br />
          <p className="text-center">
            This is a dummy application to verify Singpass. Please click the
            button below to verify as test identity:{" "}
          </p>
          <br />
          <p className="font-bold text-center">Bruce Wayne</p>
          <br />
          <Button
            className="w-full bg-[#293241]"
            variant="contained"
            style={{ backgroundColor: "#293241" }}
            onClick={verifyIdentity}
          >
            Verify
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default VerifySingpass;

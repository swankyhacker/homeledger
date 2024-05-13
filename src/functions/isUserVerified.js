import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";

const isUserVerified = async () => {
  if (auth.currentUser) {
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (!userDoc.exists()) {
      console.log("No such user found");
      return false;
    }
    return userDoc.data().singPassVerified;
  }
  return false;
};
export default isUserVerified;

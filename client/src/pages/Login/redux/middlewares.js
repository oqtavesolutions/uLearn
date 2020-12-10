//import { Request } from "../../../utils/axios";
import firebase from "../../../config";

const userLogin = async () => {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword("oikantik+test4@gmail.com", "12345678910");

  await user.user.getIdToken();

  return {
    message: "user logged in successfully",
  };
};

export default userLogin;

//import { Request } from "../../../utils/axios";
import firebase from "../../../config";

const userLogin = async ({ email, password }) => {
  // const user = await firebase
  //   .auth()
  //   .signInWithEmailAndPassword("oikantik+test5@gmail.com", "12345678910");
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  await user.user.getIdToken();

  return {
    message: "user logged in successfully",
  };
};

export default userLogin;

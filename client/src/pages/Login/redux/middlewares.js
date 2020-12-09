//import { Request } from "../../../utils/axios";
import firebase from "../../../config";

const userLogin = async () => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword("oikantik+test4@gmail.com", "12345678910");

    await user.user.getIdToken();

    return {
      message: "user logged in successfully",
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default userLogin;

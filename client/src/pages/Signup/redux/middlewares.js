import { Request } from "../../../utils/axios";
import firebase from "../../../config";

const userSignup = async () => {
  console.log("middle");
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        "oikantik+test5@gmail.com",
        "12345678910"
      );

    //await user.user.sendVerification()

    const token = await user.user.getIdToken();

    const response = await Request.post(
      "/user",
      {},
      {
        headers: {
          firebase_token: token,
        },
      }
    );

    return {
      message: response.data.message,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default userSignup;

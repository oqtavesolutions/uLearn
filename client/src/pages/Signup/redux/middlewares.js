import { Request } from "../../../utils/axios";
import firebase from "../../../config";

const userSignup = async ({ email, password, name }) => {
  console.log("middle");
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    //await user.user.sendVerification()

    await user.user.updateProfile({
      displayName: name,
    });

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

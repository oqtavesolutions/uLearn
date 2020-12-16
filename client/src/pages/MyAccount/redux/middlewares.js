//import { Request } from "../../../utils/axios";
import firebase from "../../../config";

const changePassword = async ({ old_password, new_password }) => {
  const user = await firebase.auth().currentUser;

  const credential = await firebase
    .auth()
    .signInWithEmailAndPassword(user.email, old_password);

  await user.reauthenticateWithCredential(credential);
  await user.updatePassword(new_password);

  return {
    message: "password changed successfully",
  };
};

export { changePassword };

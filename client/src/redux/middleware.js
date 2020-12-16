import firebase from "../config";

const fetchUserStatus = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User is not logged in"));
      }
    });
  });
};

const userStatus = async () => {
  const user = await fetchUserStatus();
  console.log(user);
  return user;
};

export default userStatus;

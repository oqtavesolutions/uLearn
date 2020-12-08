import React from "react";
import "./Signup.scss";
import firebase from "../../config";
import axios from "axios";

function Signup() {
  const handleClick = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword("oikantik+test4@gmail.com", "12345678910")
      .then(
        (user) =>
          // user.user.sendEmailVerification().then((response) => {
          user.user.getIdToken().then((i) => {
            axios.defaults.headers.common["firebase_token"] = i;
            axios.post(
              "http://localhost:8080/user",
              { firebase_id: user.user.uid },
              { withCredentials: true }
            );
          })
        // })
      )
      .catch((error) => console.log(error));
  };

  return (
    <div>
      A registration form will go here
      <button onClick={handleClick}>Ok</button>
    </div>
  );
}

export default Signup;

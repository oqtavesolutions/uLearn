import React from "react";
import "./Login.scss";
import firebase from "../../config";
function Login() {
  const handleClick = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword("oikantik+test4@gmail.com", "12345678910")
      .then((user) => user.user.getIdToken().then((t) => console.log(t)))
      .catch((error) => console.log(error));
  };

  const handleClickLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => console.log(res));
  };

  return (
    <div>
      A registration form will go here
      <button onClick={handleClick}>Login</button>
      <button onClick={handleClickLogout}>logout</button>
    </div>
  );
}

export default Login;

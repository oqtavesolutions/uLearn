const admin = require("firebase-admin");
const serviceAccount = require("../key.json");
const user = require("../services/user");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const authService = admin.auth();

exports.requiresAuth = async (req, res, next) => {
  const { firebase_token } = req.headers;
  // https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken
  let decodedIdToken;
  try {
    decodedIdToken = await authService.verifyIdToken(firebase_token);
  } catch (error) {
    next(error);
    return;
  }

  // if (user.email_verified === false) {

  // }
  req.user = decodedIdToken;
  next();
};

exports.requiresAuthRegistration = async (req, res, next) => {
  const { firebase_token } = req.headers;
  // https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken
  let decodedIdToken;
  try {
    decodedIdToken = await authService.verifyIdToken(firebase_token);
  } catch (error) {
    next(error);
    return;
  }

  req.user = decodedIdToken;

  next();
};

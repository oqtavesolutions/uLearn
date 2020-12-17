const admin = require("firebase-admin");
const serviceAccount = require("../key.json");
const user = require("../services/user");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const authService = admin.auth();

exports.requiresAuth = async (req, res, next) => {
  try {
    const { firebase_token } = req.headers;

    const { email_verified, uid, email } = await authService.verifyIdToken(
      firebase_token
    );
    const authenticatedUser = await user.findById({ user_id: uid });

    req.user = {
      id: authenticatedUser.id,
      email_verified,
      user_uuid: authenticatedUser.attributes.user_id,
      email,
    };

    next();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }
};

exports.requiresAuthRegistration = async (req, res, next) => {
  // https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken
  try {
    const { firebase_token } = req.headers;
    const decodedIdToken = await authService.verifyIdToken(firebase_token);
    req.user = decodedIdToken;
    next();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }
};

const { v1: uuidv1 } = require("uuid");
const path = require("path");
const AWS = require("./aws");

const Upload = (file) => {
  console.log("I fire");
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    throw new Error("File not supported");
  }

  if (file.size > 1000000) {
    throw new Error("File is too big");
  }
  const params = {
    Bucket: "ulearn-dev",
    Key: "static/uploads/" + uuidv1() + path.extname(file.originalname), // hapi does not exist.
    Body: file.buffer,
    ACL: "public-read",
  };

  const S3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    S3.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = Upload;

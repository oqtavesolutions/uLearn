const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config({ silent: true });

// console.log(
//   process.env.AWS_IAM_ACCESS_KEY,
//   process.env.AWS_IAM_SECRET_KEY,
//   process.env.AWS_S3_REGION
// );

AWS.config.update({
  accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  region: process.env.AWS_S3_REGION,
});

module.exports = AWS;

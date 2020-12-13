import { AuthenticatedRequest } from "../../../utils/axios";

const getMyLearning = async () => {
  const response = await AuthenticatedRequest.get("/order/courses");
  return {
    message: "user logged in successfully",
    courses: response.data,
  };
};

export default getMyLearning;

import { AuthenticatedRequest } from "../../../utils/axios";

const getCoursesByUser = async () => {
  const response = await AuthenticatedRequest.get("/course/courses");
  return {
    message: "user logged in successfully",
    courses: response.data,
  };
};

export default getCoursesByUser;

import { AuthenticatedRequest } from "../../../utils/axios";

const createCourse = async (payload) => {
  console.log(AuthenticatedRequest);
  const response = await AuthenticatedRequest.post("/course/create", {
    ...payload,
  });
  return {
    message: "user logged in successfully",
    ...response.data,
  };
};

export default createCourse;

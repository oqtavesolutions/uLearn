import { AuthenticatedRequest } from "../../../utils/axios";

const getCourseEdit = async (courseId) => {
  console.log(courseId);
  const response = await AuthenticatedRequest.get(`/course/${courseId}`);
  return {
    message: "course retrieved successfully",
    course: response.data,
  };
};

export default getCourseEdit;

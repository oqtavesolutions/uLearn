import { AuthenticatedRequest } from "../../../utils/axios";

const getCourseEdit = async (courseId) => {
  console.log(courseId);
  const response = await AuthenticatedRequest.get(`/course/${courseId}`);
  return {
    message: "course retrieved successfully",
    course: response.data,
  };
};

const updateCourse = async (payload) => {
  const response = await AuthenticatedRequest.put(
    "/course/edit/" + payload.course_id,
    {
      ...payload,
    }
  );
  return {
    message: "updated course successfully",
    course: response.data,
  };
};

export { getCourseEdit, updateCourse };

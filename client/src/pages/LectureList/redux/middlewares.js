import { AuthenticatedRequest } from "../../../utils/axios";

const getCourseLectureList = async (courseId) => {
  const response = await AuthenticatedRequest.get(
    `/lecture/course/${courseId}`
  );
  return {
    message: "lectures retrieved successfully",
    lectures: response.data,
  };
};

export { getCourseLectureList };

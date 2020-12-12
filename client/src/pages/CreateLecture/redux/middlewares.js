import { AuthenticatedRequest } from "../../../utils/axios";

const createCourse = async ({
  lecture_title,
  lecture_description,
  lecture_slug,
  course_id,
}) => {
  const response = await AuthenticatedRequest.post(
    `/lecture/course/${course_id}/create`,
    {
      lecture_title,
      lecture_description,
      lecture_slug,
    }
  );
  return {
    message: "user logged in successfully",
    ...response.data,
  };
};

export default createCourse;

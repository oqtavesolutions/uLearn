import { AuthenticatedRequest } from "../../../utils/axios";

const createCourse = async ({
  lecture_title,
  lecture_slug,
  lecture_content,
  lecture_google_slide,
  lecture_video_embed,
  lecture_length,
  lecture_type,
  course_id,
}) => {
  const response = await AuthenticatedRequest.post(
    `/lecture/course/${course_id}/create`,
    {
      lecture_title,
      lecture_slug,
      lecture_content,
      lecture_google_slide,
      lecture_video_embed,
      lecture_length,
      lecture_type,
    }
  );
  return {
    message: "user logged in successfully",
    ...response.data,
  };
};

export default createCourse;

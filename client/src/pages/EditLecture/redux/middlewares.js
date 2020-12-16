import { AuthenticatedRequest } from "../../../utils/axios";

const getLectureEdit = async ({ courseId, lectureId }) => {
  console.log(courseId);
  const response = await AuthenticatedRequest.get(
    `/lecture/course/${courseId}/${lectureId}`
  );
  return {
    message: "lecture retrieved successfully",
    lecture: response.data,
  };
};

const updateLecture = async ({
  course_id,
  lecture_id,
  lecture_title,
  lecture_description,
  lecture_content,
  lecture_google_slide,
  lecture_video_embed,
  lecture_attachment,
}) => {
  const response = await AuthenticatedRequest.put(
    `/lecture/edit/course/${course_id}/${lecture_id}`,
    {
      lecture_title,
      lecture_description,
      lecture_content,
      lecture_google_slide,
      lecture_video_embed,
      lecture_attachment,
    }
  );
  return {
    message: "lecture updated successfully",
    lecture: response.data,
  };
};

export { getLectureEdit, updateLecture };

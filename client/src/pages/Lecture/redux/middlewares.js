import { AuthenticatedRequest } from "../../../utils/axios";

// router.get("/content/:courseSlug", courseControllers.findBySlug);

const getSingleLecture = async (lectureSlug) => {
  const response = await AuthenticatedRequest.get(
    `/lecture/auth/content/${lectureSlug}`
  );
  return {
    message: "user logged in successfully",
    lecture: response.data,
  };
};

export { getSingleLecture };

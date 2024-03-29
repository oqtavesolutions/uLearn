import { Request, AuthenticatedRequest } from "../../../utils/axios";

// router.get("/content/:courseSlug", courseControllers.findBySlug);

const getCourseLandingPage = async (courseSlug) => {
  const response = await Request.get(`/course/content/${courseSlug}`);
  return {
    message: "user logged in successfully",
    course: response.data,
  };
};

const getCourseLandingPageLoggedInUser = async (courseSlug) => {
  const response = await AuthenticatedRequest.get(
    `/course/auth/content/${courseSlug}`
  );
  return {
    message: "user logged in successfully",
    course: response.data,
  };
};

const enrollInCourse = async (courseSlug) => {
  const response = await AuthenticatedRequest.post(
    `/order/create/${courseSlug}`
  );
  return {
    message: "enrolled successfully",
    order: response.data,
  };
};

export {
  getCourseLandingPage,
  getCourseLandingPageLoggedInUser,
  enrollInCourse,
};

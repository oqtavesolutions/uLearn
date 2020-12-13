import { Request } from "../../../utils/axios";

const getExplorePageCourses = async () => {
  const response = await Request.get("/course/explore");
  return {
    message: "courses retreived successfully",
    courses: response.data,
  };
};

const getExplorePageCoursesByCategory = async (category) => {
  const response = await Request.get(`/course/explore/${category}`);
  return {
    message: "courses retreived successfully",
    courses: response.data,
  };
};

export { getExplorePageCourses, getExplorePageCoursesByCategory };

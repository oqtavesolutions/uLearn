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

const updateImage = async (payload) => {
  const data = new FormData();
  data.append("thumbnail", payload[0]);
  const response = await AuthenticatedRequest.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return {
    message: "file uploaded successfully",
    ...response.data,
  };
};

export { getCourseEdit, updateCourse, updateImage };

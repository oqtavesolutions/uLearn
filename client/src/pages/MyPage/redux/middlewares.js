import { AuthenticatedRequest } from "../../../utils/axios";

const getAuthorEdit = async () => {
  const response = await AuthenticatedRequest.get(`/author`);
  return {
    message: "author retrieved successfully",
    author: response.data,
  };
};

const updateAuthor = async ({ author_name, author_bio, author_slug }) => {
  const response = await AuthenticatedRequest.post(`/author`, {
    author_slug,
    author_name,
    author_bio,
  });
  return {
    message: "author updated successfully",
    author: response.data,
  };
};

export { getAuthorEdit, updateAuthor };
import axios from "axios";

import { API_URL } from "../global";

const API = axios.create({ baseURL: `${API_URL}` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createBlog = (blogData) => API.post("/blog", blogData);
export const getBlogs = () => API.get("/blog");
export const getBlog = (id) => API.get(`/blog/${id}`);
export const deleteBlog = (id) => API.delete(`/blog/${id}`);
export const updateBlog = (updatedBlogData, id) =>
  API.patch(`/blog/${id}`, updatedBlogData);
export const getBlogsByUser = (userId) => API.get(`/blog/userBlogs/${userId}`);

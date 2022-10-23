import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async ({ updatedBlogData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createBlog(updatedBlogData);
      toast.success("Blog Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getBlogs();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getBlog(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlogsByUser = createAsyncThunk(
  "blog/getBlogsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getBlogsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteBlog(id);
      toast.success("Blog  Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, updatedBlogData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateBlog(updatedBlogData, id);
      toast.success("Blog Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: {},
    blogs: [],
    userBlogs: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [createBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = [action.payload];
    },
    [createBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlogs.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    [getBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blog= action.payload;
    },
    [getBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlogsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlogsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userBlogs = action.payload;
    },
    [getBlogsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userBlogs= state.userBlogs.filter((item) => item._id !== id);
        state.blogs = state.blogs.filter((item) => item._id !== id);
      }
    },
    [deleteBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBlog.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userBlogs = state.userBlogs.map((item) =>
          item._id === id ? action.payload : item
        );
        state.blogs = state.blogs.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default blogSlice.reducer;

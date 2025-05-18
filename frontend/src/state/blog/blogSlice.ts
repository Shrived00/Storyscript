import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://default-api.com";

// Define types
interface Blog {
  _id: string;
  title: string;
  caption: string;
  desc: string;
  pic?: string;
  category: string;
  createdAt: string | Date;
  authorName?: string;
  user?: string;
}

interface BlogState {
  blogs: Blog[];
  globalBlogs: Blog[];
  selectedBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

interface BlogRequest {
  id?: string;
  title: string;
  caption: string;
  desc: string;
  pic?: string;
  category: string;
  authorName?: string;
}

export const globalListBlog = createAsyncThunk<
  Blog[],
  void,
  { state: RootState }
>("blogs/globalList", async (_, { rejectWithValue }) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(
      `${API_BASE_URL}/api/blogs/global`,
      config
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// Fetch Blogs
export const listBlog = createAsyncThunk<Blog[], void, { state: RootState }>(
  "blogs/list",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      if (!userInfo) {
        return rejectWithValue("User not authenticated");
      }

      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/api/blogs`, config);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create Blog
export const createBlog = createAsyncThunk<
  Blog,
  BlogRequest,
  { state: RootState }
>("blogs/create", async (blogData, { getState, rejectWithValue }) => {
  try {
    const {
      user: { userInfo },
    } = getState();

    if (!userInfo) {
      return rejectWithValue("User not authenticated");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${API_BASE_URL}/api/blogs/create`,
      blogData,
      config
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// Update Blog
export const updateBlog = createAsyncThunk<
  Blog,
  BlogRequest & { id: string },
  { state: RootState }
>(
  "blogs/update",
  async ({ id, ...blogData }, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      if (!userInfo) {
        return rejectWithValue("User not authenticated");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/api/blogs/${id}`,
        blogData,
        config
      );
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete Blog
export const deleteBlog = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("blogs/delete", async (id, { getState, rejectWithValue }) => {
  try {
    const {
      user: { userInfo },
    } = getState();

    if (!userInfo) {
      return rejectWithValue("User not authenticated");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${API_BASE_URL}/api/blogs/${id}`, config);
    return id;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// Get Blog By ID
export const getBlogById = createAsyncThunk<Blog, string, { state: RootState }>(
  "blogs/getById",
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(
        `${API_BASE_URL}/api/blogs/${id}`,
        config
      );
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const initialState: BlogState = {
  blogs: [],
  globalBlogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listBlog.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(listBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) state.blogs[index] = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })

      .addCase(globalListBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(globalListBlog.fulfilled, (state, action) => {
        console.log(
          "✅ Redux Action Payload Global List Fetched:",
          action.payload
        ); // ✅ Debugging step
        if (Array.isArray(action.payload)) {
          state.blogs = action.payload; //  Ensure data is assigned
        } else {
          console.error("❌ Unexpected API response format:", action.payload);
          state.blogs = [];
        }
        state.loading = false;
      })
      .addCase(globalListBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      })
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedBlog = null;
      })
      .addCase(getBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;

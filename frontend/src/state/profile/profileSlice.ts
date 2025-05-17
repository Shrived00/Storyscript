import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://default-api.com";

// Profile interface
interface Profile {
  id?: string;
  name: string;
  career: string;
  bio: string;
  work: string;
  education: string;
  skill: string;
  prof_pic?: string;
}

// State interface
interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  updateLoading: boolean;
  updateError: string | null;
}

// Get profile
export const getProfile = createAsyncThunk<
  Profile,
  string,
  { state: RootState }
>("profile/getProfile", async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/profile/${userId}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// Create profile
interface CreateProfilePayload {
  name: string;
  career: string;
  bio: string;
  work: string;
  education: string;
  skill: string;
  prof_pic?: string;
}

export const createProfile = createAsyncThunk<
  Profile,
  CreateProfilePayload,
  { state: RootState }
>(
  "profile/createProfile",
  async (profileData, { getState, rejectWithValue }) => {
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
        `${API_BASE_URL}/api/profile/create`,
        profileData,
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

interface EditProfilePayload {
  name?: string;
  career?: string;
  bio?: string;
  work?: string;
  education?: string;
  skill?: string;
  prof_pic?: string;
}

export const editProfile = createAsyncThunk<
  Profile,
  EditProfilePayload,
  { state: RootState }
>("profile/editProfile", async (profileData, { getState, rejectWithValue }) => {
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
      `${API_BASE_URL}/api/profile/edit`,
      profileData,
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

// Initial state
const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getProfile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createProfile
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profile = action.payload; // update profile state with edited data
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
      });
  },
});

export default profileSlice.reducer;

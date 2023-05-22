import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceAuth from "../../network/axiosWithAuth";
import { ApiUrl } from "../../constants/StringConstants";

export const profileRecruiter = createAsyncThunk(
  "recruiter/details",
  async () => {
    try {
      const response = await axiosInstanceAuth.get(ApiUrl.RECRUITER_PROFILE);
      return response;
    } catch (error) {}
  }
);

const ProfileRecruiterSlice = createSlice({
  name: "recruiter",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isSuccess: false,
    resMsg: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileRecruiter.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(profileRecruiter.fulfilled, (state, action) => {
        if (action.payload?.status === 200) {
          state.isLoading = false;
          state.data = action.payload?.data;
          state.isError = false;
          state.isSuccess = true;
          state.resMsg = action?.payload?.data?.msg;
        } else {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
          state.ErrorMsg = action?.payload?.msg;
        }
      })
      .addCase(profileRecruiter.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message;
      });
  },
});

export default ProfileRecruiterSlice.reducer;

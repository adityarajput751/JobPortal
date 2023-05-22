import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceAuth from "../../network/axiosWithAuth";
import { ApiUrl } from "../../constants/StringConstants";

export const deleteJob = createAsyncThunk(
  "recruiter/job/delete",
  async (item) => {
    try {
      const response = await axiosInstanceAuth.delete(
        `${ApiUrl.RECRUITER_JOB}${item.id}`
      );
      return response;
    } catch (error) {}
  }
);

const DeleteJobSlice = createSlice({
  name: "deletejobs",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        if (action.payload?.status === 204) {
          state.isLoading = false;
          state.data = action.payload;
          state.isError = false;
          state.isSuccess = true;
          state.ErrorMsg = action?.payload?.data?.msg;
        } else {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
          state.ErrorMsg = Object.values(action?.payload || {})
            .flatMap((messages) => messages)
            .join("\n");
        }
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message;
      });
  },
});

export default DeleteJobSlice.reducer;

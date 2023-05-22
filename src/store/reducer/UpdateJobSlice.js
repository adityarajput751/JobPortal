import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceAuth from "../../network/axiosWithAuth";
import { ApiUrl } from "../../constants/StringConstants";

export const updateJob = createAsyncThunk("updatejob/edit", async (payload) => {
  console.log(payload, "fimvdknm");
  try {
    const response = await axiosInstanceAuth.patch(
      `${ApiUrl.RECRUITER_JOB}${payload.id}`,
      payload
    );
    console.log(response, "responsedfjbgv");
    return response;
  } catch (error) {}
});

const UpdateJobSlice = createSlice({
  name: "updatejob",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isSuccess: false,
    resMsg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        if (action.payload?.status === 200) {
          state.isLoading = false;
          state.data = action.payload;
          state.isError = false;
          state.isSuccess = true;
          state.resMsg = action?.payload?.data?.msg;
        } else {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
          state.ErrorMsg = Object.values(action?.payload || {})
            .flatMap((messages) => messages)
            .join("\n");
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message;
      });
  },
});

export const selectUpdateJob = (state) => state.updatejob.data;
export const selectUpdateJobStatus = (state) => state.updatejob.status;
export const selectUpdateJobError = (state) => state.updatejob.error;

export default UpdateJobSlice.reducer;

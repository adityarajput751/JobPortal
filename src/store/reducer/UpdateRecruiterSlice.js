import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceAuth from "../../network/axiosWithAuth";

export const editRecruiter = createAsyncThunk(
  "recruiter/edit",
  async (payload) => {
    try {
      const response = await axiosInstanceAuth.patch(
        "/recruiter/edit/profile/",
        payload
      );
      console.log(response?.data, "jasjjhda");
      return response;
    } catch (error) {}
  }
);

const UpdateRecruiterSlice = createSlice({
  name: "recruiter",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isSuccess: false,
    resMsg: "",
    ErrorMsg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editRecruiter.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(editRecruiter.fulfilled, (state, action) => {
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
          state.ErrorMsg = action?.payload?.msg;
        }
      })
      .addCase(editRecruiter.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message;
      });
  },
});

export const selectRecruiter = (state) => state.recruiter.data;
export const selectRecruiterStatus = (state) => state.recruiter.status;
export const selectRecruiterError = (state) => state.recruiter.error;

export default UpdateRecruiterSlice.reducer;

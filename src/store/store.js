// import { configureStore } from "@reduxjs/toolkit";

// import rootReducer from "./reducer";

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./reducer/LoginSlice";
import profileSlice from "./reducer/ProfileSlice";
import candidateSlice from "./reducer/SignupSlice";
import SignupRecruiterSlice from "./reducer/signUpRecruiter";
import LoaderSlice from "./reducer/LoaderSlice";
import ToastSlice from "./reducer/ToastSlice";
import ChangePasswordSlice from "./reducer/ChangePasswordSlice";
import editSlice from "./reducer/UpdateUserSlice";
import ProfileRecruiterSlice from "./reducer/ProfileRecruiterSlice";
import UpdateRecruiterSlice from "./reducer/UpdateRecruiterSlice";
import ForgetPasswordSlice from "./reducer/ForgetPasswordSlice";
import JobPostSlice from "./reducer/JobPostSlice";
import RecruiterJobGetSlice from "./reducer/RecruiterJobGetSlice";
import CandidateJobsSlice from "./reducer/CandidateJobsSlice";
import DeleteJobSlice from "./reducer/DeleteJobSlice";
import UpdateJobSlice from "./reducer/UpdateJobSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'],
};

const rootReducer = combineReducers({
  candidate: candidateSlice,
  login: persistReducer(persistConfig, LoginSlice),
  profile: profileSlice,
  recruiterProfile: ProfileRecruiterSlice,
  recruiter: SignupRecruiterSlice,
  loader: LoaderSlice,
  toast: ToastSlice,
  changePassword: ChangePasswordSlice,
  profileUpdate: editSlice,
  updateRecruiter: UpdateRecruiterSlice,
  forgetPassword: ForgetPasswordSlice,
  jobPost: JobPostSlice,
  recruiterPosts: RecruiterJobGetSlice,
  candidateJob: CandidateJobsSlice,
  deleteJob: DeleteJobSlice,
  updateJob: UpdateJobSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

import LoginSlice from "./LoginSlice";
import profileSlice from "./ProfileSlice";
import candidateSlice from "./SignupSlice";
import SignupRecruiterSlice from "./signUpRecruiter";
import LoaderSlice from "./LoaderSlice";
import ToastSlice from "./ToastSlice";
import ChangePasswordSlice from "./ChangePasswordSlice";
import editSlice from "./UpdateUserSlice";
import ProfileRecruiterSlice from "./ProfileRecruiterSlice";
import UpdateRecruiterSlice from "./UpdateRecruiterSlice";
import ForgetPasswordSlice from "./ForgetPasswordSlice";
import JobPostSlice from "./JobPostSlice";
import RecruiterJobGetSlice from "./RecruiterJobGetSlice";
import CandidateJobsSlice from "./CandidateJobsSlice";
import DeleteJobSlice from "./DeleteJobSlice";
import UpdateJobSlice from "./UpdateJobSlice";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  candidate: candidateSlice,
  login: persistReducer(
    {
      key: "login",
      storage: storage,
    },
    LoginSlice
  ),
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
  updateJob: UpdateJobSlice,
});

export default rootReducer;

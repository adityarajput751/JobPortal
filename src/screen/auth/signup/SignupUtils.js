import * as yup from "yup";
import { NumberConstants } from "../../../constants/NumberConstants";
import {
  ErrorConstants,
  RegexConstants,
} from "../../../constants/StringConstants";

export const SignUpInitialValue = {
  fullName: "",
  email: "",
  password: "",
  mobileNumber: "",
  WorkStatus: "",
};

export const SignUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(
      3,
      ({ min }) =>
        `${ErrorConstants.NAME_MUST_BE} ${min} ${ErrorConstants.CHARACTERS}`
    )
    .required(ErrorConstants.NAME_IS_REQUIRED)
    .matches(RegexConstants.NAME, ErrorConstants.MUST_BE_CHARACTER),
  email: yup
    .string()
    .email(ErrorConstants.EMAIL)
    .required(ErrorConstants.EMAIL_REQUIRED),
  password: yup
    .string()
    .min(
      NumberConstants.VALUE_6,
      ({ min }) =>
        `${ErrorConstants.PASSWORD_MUST} ${min} ${ErrorConstants.CHARACTER}`
    )
    .required(ErrorConstants.PASSWORD_REQUIRED)
    .matches(RegexConstants.PASSWORD, ErrorConstants.PASSWORD_MATCHES),
  mobileNumber: yup
    .string()
    .min(
      10,
      ({ min }) =>
        `${ErrorConstants.MOBILE_NO_MUST_BE} ${min} ${ErrorConstants.CHARACTERS}`
    )
    .required(ErrorConstants.MOBILE_NO_REQUIRED)
    .matches(/^[789]\d{9}$/, ErrorConstants.MOBILE_NO_MUST_BE),
});

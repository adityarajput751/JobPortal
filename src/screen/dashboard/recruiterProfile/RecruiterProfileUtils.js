import * as yup from "yup";
import {
  ErrorConstants,
  RegexConstants,
} from "../../../constants/StringConstants";

export const RecruiterProfileValidationSchema = yup.object().shape({
  fullname: yup
    .string()
    .min(
      3,
      ({ min }) =>
        `${ErrorConstants.NAME_MUST_BE} ${min} ${ErrorConstants.CHARACTERS}`
    )
    .required(ErrorConstants.NAME_IS_REQUIRED)
    .matches(RegexConstants.NAME, ErrorConstants.MUST_BE_CHARACTER),
});

import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InputBox from "../../../elements/InputBox";
import CustomButton from "../../../elements/CustomButton";
import { LoginStyle } from "../../../theme/styles/LoginStyle";
import {
  InputBoxConstants,
  RouteConstants,
  StringConstants,
} from "../../../constants/StringConstants";
import { ColorConstants } from "../../../theme/ColorConstants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { loginInitialValue, loginValidationSchema } from "./LoginUtils";
import { Formik } from "formik";
import { loginCandidate } from "../../../store/reducer/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { loaderShown, loaderHide } from "../../../store/reducer/LoaderSlice";
import { toastShown } from "../../../store/reducer/ToastSlice";
import { NumberConstants } from "../../../constants/NumberConstants";
import { normalizeFont } from "../../../utils/responsive";
import { StoreDataLocally } from "../../../helper/StorageData";

const Login = ({ profileRole }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const candidate = useSelector((state) => state?.login);
  console.log(candidate?.token,'goerkmgvfdkm');
  profileRole = candidate?.data;
  const onPressHide = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const formikRef = useRef(null);
  useFocusEffect(
    useCallback(() => {
      formikRef.current?.resetForm();
    }, [])
  );
  useEffect(() => {
    if (candidate?.isLoading) {
      dispatch(loaderShown());
    } else if (loadingRef.current && !candidate.isLoading) {
      if (candidate?.isError) {
        dispatch(loaderHide());
        dispatch(
          toastShown({ isError: true, toastMessage: candidate?.ErrorMsg })
        );
      } else if (candidate?.isSuccess) {
        dispatch(loaderHide());
        StoreDataLocally("token", candidate?.token);
        dispatch(
          toastShown({ isError: false, toastMessage: candidate?.ResMsg })
        );
        navigation.navigate(RouteConstants.DRAWER_NAVIGATOR, { profileRole });
      }
    }
    loadingRef.current = candidate?.isLoading;
  }, [candidate?.isLoading, candidate?.isSuccess]);

  const postData = (values) => {
    // add resetForm parameter to access the resetForm function
    const payload = {
      email: values?.email,
      password: values?.password,
    };
    dispatch(loginCandidate(payload));
  };
  return (
    <View style={LoginStyle.mainContainer}>
      <Formik
        initialValues={loginInitialValue}
        onSubmit={(values) => {
          postData(values);
        }}
        innerRef={formikRef}
        validationSchema={loginValidationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          dirty,
          handleBlur,
          touched,
        }) => {
          return (
            <View>
              <Text style={LoginStyle.pageTitleText}>
                {StringConstants.LOGIN}
              </Text>
              <InputBox
                title={StringConstants.EMAIL_USERNAME}
                placeholder={StringConstants.ENTER_EMAIL_USERNAME}
                onBlur={handleBlur(InputBoxConstants.EMAIL)}
                errors={errors.email}
                value={values.email}
                onChangeText={handleChange(InputBoxConstants.EMAIL)}
                touched={touched?.email}
                autoCapitalize={InputBoxConstants.NONE}
              />
              <InputBox
                title={StringConstants.PASSWORD_STRING}
                placeholder={StringConstants.ENTER_PASSWORD}
                secureTextEntry={secureTextEntry}
                onPressHide={onPressHide}
                password={true}
                onBlur={handleBlur(InputBoxConstants.PASSWORD)}
                errors={errors.password}
                value={values.password}
                onChangeText={handleChange(InputBoxConstants.PASSWORD)}
                touched={touched?.password}
                autoCapitalize={InputBoxConstants.NONE}
              />
              <View style={LoginStyle.forgotPasswordView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(RouteConstants.FORGOT_PASSWORD)
                  }
                >
                  <Text style={LoginStyle.forgotPasswordText}>
                    {StringConstants.FORGOT_PASSWORD}
                  </Text>
                </TouchableOpacity>
              </View>
              <CustomButton
                onSubmit={() => handleSubmit(postData)}
                backgroundColor={
                  isValid && dirty
                    ? ColorConstants.LIGHT_BLUE
                    : ColorConstants.DARK_GREY
                }
                fontSize={normalizeFont(NumberConstants.VALUE_25)}
                title={StringConstants.LOGIN}
                // disabled={!(isValid && dirty)}
              />
              <View style={LoginStyle.signupNavigateContainer}>
                <Text>{StringConstants.DO_NOT_HAVE_ACCOUNT}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate(StringConstants.SIGNUP)}
                >
                  <Text style={LoginStyle.signupNavigateText}>
                    {StringConstants.SIGN_UP}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default Login;

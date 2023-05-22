import { View, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RecruiterProfileValidationSchema } from "./RecruiterProfileUtils";
import CustomDrawer from "../../../elements/CustomDrawer";
import InputBox from "../../../elements/InputBox";
import {
  AlignmentConstants,
  InputBoxConstants,
  StringConstants,
} from "../../../constants/StringConstants";
import { ProfileStyle } from "../../../theme/styles/ProfileStyle";
import { ColorConstants } from "../../../theme/ColorConstants";
import { NumberConstants } from "../../../constants/NumberConstants";
import { normalizeFont } from "../../../utils/responsive";
import { Formik } from "formik";
import CustomButton from "../../../elements/CustomButton";
import { profileRecruiter } from "../../../store/reducer/ProfileRecruiterSlice";
import { editRecruiter } from "../../../store/reducer/UpdateRecruiterSlice";
import { loaderHide, loaderShown } from "../../../store/reducer/LoaderSlice";
import { toastShown } from "../../../store/reducer/ToastSlice";

const RecruiterProfile = () => {
  const navigation = useNavigation();
  const loadingRef = useRef(false);
  const loadingUpdateRef = useRef(null);

  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileRecruiter());
  }, [dispatch]);
  const RecruiterProfileData = useSelector((state) => state?.recruiterProfile);
  const UpdateProfileData = useSelector((state) => state?.updateRecruiter);
  //Get Profile Data
  useEffect(() => {
    if (RecruiterProfileData.isLoading) {
      dispatch(loaderShown());
    } else if (loadingRef.current && !RecruiterProfileData.isLoading) {
      if (RecruiterProfileData?.isError) {
        dispatch(loaderHide());
        dispatch(
          toastShown({
            isError: true,
            toastMessage: RecruiterProfileData?.ErrorMsg,
          })
        );
      } else if (RecruiterProfileData?.isSuccess) {
        setData(RecruiterProfileData?.data);
        dispatch(loaderHide());
      }
    }
    loadingRef.current = RecruiterProfileData.isLoading;
  }, [RecruiterProfileData.isLoading, RecruiterProfileData?.isSuccess, data]);

  //Update Profile Data
  useEffect(() => {
    if (UpdateProfileData.isLoading) {
      dispatch(loaderShown());
    } else if (loadingUpdateRef.current && !UpdateProfileData.isLoading) {
      if (UpdateProfileData?.isError) {
        dispatch(loaderHide());
        dispatch(
          toastShown({
            isError: true,
            toastMessage: UpdateProfileData?.ErrorMsg,
          })
        );
      } else if (UpdateProfileData?.isSuccess) {
        dispatch(loaderHide());
        dispatch(
          toastShown({
            isError: false,
            toastMessage: UpdateProfileData?.resMsg,
          })
        );
      }
    }
    loadingUpdateRef.current = UpdateProfileData.isLoading;
  }, [UpdateProfileData.isLoading, UpdateProfileData?.isSuccess]);
  
  const RecruiterProfileInitialValue = {
    fullname: data ? data?.data?.user?.fullname : "",
    email: data?.data ? data?.data?.user?.email : "",
    mobile_number: data ? data?.data?.user?.mobile_number : "",
    company_name: data ? data?.data?.company_name : "",
    company_website: data ? data?.data?.company_website : "",
    company_description: data ? data?.data?.company_description : "",
    contact_person_name: data ? data?.data?.contact_person_name : "",
    contact_person_phone: data ? data?.data?.contact_person_phone : "",
  };

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };
  const updateUser = (values) => {
    const payload = {
      user: {
        fullname: values?.fullname,
        mobile_number: values?.mobile_number,
      },
      company_name: values?.company_name,
      company_website: values?.company_website,
      company_description: values?.company_description,
      contact_person_name: values?.contact_person_name,
      contact_person_phone: values?.contact_person_phone,
    };

    dispatch(editRecruiter(payload));
  };
  if (!RecruiterProfileData.isLoading && data !== null) {
    return (
      <View style={ProfileStyle.conatiner}>
        <Formik
          initialValues={RecruiterProfileInitialValue}
          onSubmit={(values) => updateUser(values)}
          validationSchema={RecruiterProfileValidationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            handleBlur,
            touched,
          }) => {
            return (
              <View style={ProfileStyle.profileMainView}>
                <CustomDrawer
                  onPress={handleOpenDrawer}
                  title={StringConstants.PROFILE}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                  <InputBox
                    title={StringConstants.FULL_NAME}
                    placeholder={StringConstants.FULL_NAME_PLACEHOLDER}
                    onBlur={handleBlur(InputBoxConstants.FULL_NAME)}
                    errors={errors.fullname}
                    onChangeText={handleChange(InputBoxConstants.FULL_NAME)}
                    touched={touched?.fullname}
                    value={values?.fullname}
                  />
                  <InputBox
                    title={StringConstants.EMAIL_ID}
                    placeholder={StringConstants.EMAIL_PLACEHOLDER}
                    onBlur={handleBlur(InputBoxConstants.EMAIL)}
                    editable={false}
                    errors={errors.email}
                    value={values?.email}
                    onChangeText={handleChange(InputBoxConstants.EMAIL)}
                    touched={touched?.email}
                  />
                  <InputBox
                    title={StringConstants.MOBILE_NUMBER}
                    placeholder={StringConstants.MOBILE_NUMBER}
                    onBlur={handleBlur(InputBoxConstants.MOBILE_NUMBER)}
                    errors={errors.mobile_number}
                    editable={false}
                    keyboardType={AlignmentConstants.NUMERIC}
                    value={values?.mobile_number}
                    onChangeText={handleChange(InputBoxConstants.MOBILE_NUMBER)}
                    touched={touched?.mobile_number}
                  />
                  <InputBox
                    title={StringConstants.COMPANY_NAME}
                    placeholder={StringConstants.ENTER_COMPANY}
                    onBlur={handleBlur(InputBoxConstants.COMPANY_NAME)}
                    errors={errors.company_name}
                    value={values?.company_name}
                    onChangeText={handleChange(InputBoxConstants.COMPANY_NAME)}
                    touched={touched?.company_name}
                  />
                  <InputBox
                    title={StringConstants.COMPANY_WEBSITE}
                    placeholder={StringConstants.ENTER_COMPANY_WEBSITE}
                    onBlur={handleBlur(InputBoxConstants.COMPANY_WEBSITE)}
                    errors={errors.company_website}
                    value={values?.company_website}
                    onChangeText={handleChange(
                      InputBoxConstants.COMPANY_WEBSITE
                    )}
                    touched={touched?.company_website}
                  />
                  <InputBox
                    title={StringConstants.COMPANY_DESC}
                    placeholder={StringConstants.ENTER_COMPANY_DESC}
                    onBlur={handleBlur(InputBoxConstants.COMPANY_DESC)}
                    errors={errors.company_description}
                    value={values?.company_description}
                    onChangeText={handleChange(InputBoxConstants.COMPANY_DESC)}
                    touched={touched?.company_description}
                  />
                  <InputBox
                    title={StringConstants.CONTACT_PERSON_NAME}
                    placeholder={StringConstants.ENTER_CONTACT_PERSON}
                    onBlur={handleBlur(InputBoxConstants.CONTACT_PERSON_NAME)}
                    errors={errors.contact_person_name}
                    value={values?.contact_person_name}
                    onChangeText={handleChange(
                      InputBoxConstants.CONTACT_PERSON_NAME
                    )}
                    touched={touched?.contact_person_name}
                  />
                  <InputBox
                    title={StringConstants.CONTACT_PERSON_PHONE}
                    placeholder={StringConstants.CONTACT_PERSON_PHONE}
                    onBlur={handleBlur(InputBoxConstants.CONTACT_PERSON_NUMBER)}
                    maxLength={NumberConstants.VALUE_10}
                    errors={errors.contact_person_phone}
                    value={values?.contact_person_phone}
                    onChangeText={handleChange(InputBoxConstants.CONTACT_PERSON_NUMBER)}
                    touched={touched?.contact_person_phone}
                  />
                  <View style={ProfileStyle.customButtonView}>
                    <CustomButton
                      backgroundColor={ColorConstants.LIGHT_BLUE}
                      fontSize={normalizeFont(NumberConstants.VALUE_25)}
                      title={StringConstants.SAVE}
                      onSubmit={() => handleSubmit(updateUser)}
                    />
                  </View>
                </ScrollView>
              </View>
            );
          }}
        </Formik>
      </View>
    );
  } else {
    return null;
  }
};

export default RecruiterProfile;

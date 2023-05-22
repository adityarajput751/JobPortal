import { View, Text, ScrollView } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ImagePickerComponent from "../../../elements/ImagePickerComponent";
import { SignupStyle } from "../../../theme/styles/SignupStyle";
import InputBox from "../../../elements/InputBox";
import RadioForm from "react-native-simple-radio-button";
import {
  AlignmentConstants,
  InputBoxConstants,
  RouteConstants,
  StringConstants,
  ToastConstants,
} from "../../../constants/StringConstants";
import CustomButton from "../../../elements/CustomButton";
import { ColorConstants } from "../../../theme/ColorConstants";
import { useNavigation } from "@react-navigation/native";
import { NumberConstants } from "../../../constants/NumberConstants";
import { InputBoxStyle } from "../../../theme/styles/CustomElementStyle";
import DocumentPicker from "react-native-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { profileCandidate } from "../../../store/reducer/ProfileSlice";
import { Formik } from "formik";
import { profileValidationSchema } from "./profileUtils";
import { editCandidate } from "../../../store/reducer/UpdateUserSlice";
import { loaderHide, loaderShown } from "../../../store/reducer/LoaderSlice";
import { toastShown } from "../../../store/reducer/ToastSlice";
import CustomDrawer from "../../../elements/CustomDrawer";
import { ProfileStyle } from "../../../theme/styles/ProfileStyle";
import { dynamicSize, normalizeFont } from "../../../utils/responsive";

const Profile = () => {
  const navigation = useNavigation();
  const loadingRef = useRef(false);
  const loadingUpdateRef = useRef(false);
  const [fileResponse, setFileResponse] = useState([]);
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileCandidate());
  }, [dispatch]);
  const profileData = useSelector((state) => state?.profile);
  const UpdateProfileData = useSelector((state) => state?.profileUpdate);
  useEffect(() => {
    if (profileData.isLoading) {
      dispatch(loaderShown());
    } else if (loadingRef.current && !profileData.isLoading) {
      const errorMessage = profileData?.ErrorMsg
        ? profileData?.ErrorMsg
        : ToastConstants.INVALID_SERVER;
      if (profileData?.isError) {
        dispatch(loaderHide());
        dispatch(toastShown({ isError: true, toastMessage: errorMessage }));
      } else if (profileData?.isSuccess) {
        dispatch(loaderHide());
        setData(profileData?.data);
        navigation.navigate(RouteConstants.PROFILE);
      }
    }
    loadingRef.current = profileData.isLoading;
  }, [profileData.isLoading, profileData?.isSuccess]);

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

  const profileInitialValue = {
    fullname: data ? data?.fullname : "",
    email: data ? data?.email : value?.email,
    gender: data ? data?.gender : value?.gender,
    mobile_number: data ? data?.mobile_number : value?.mobile_number,
    resume: data ? data?.resume : value?.resume,
    skills: data ? data?.skills : value?.skills,
    work_status: data ? data?.work_status : value?.work_status,
    address: data ? data?.address : value?.address,
    image: data ? data?.image : value?.image,
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
        size:
          NumberConstants.VALUE_2 *
          NumberConstants.VALUE_1024 *
          NumberConstants.VALUE_1024,
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  const Gender = [
    { label: StringConstants.MALE, value: NumberConstants.VALUE_1 },
    { label: StringConstants.FEMALE, value: NumberConstants.VALUE_2 },
  ];

  const updateUser = (values) => {
    const formData = new FormData();
    formData.append("fullname", values?.fullname);
    formData.append("skills", values?.skills);
    formData.append("address", values?.address);
    formData.append("gender", value);
    formData.append("image", {
      name: values?.image?.filename,
      type: values?.image.mime,
      uri: values?.image?.path,
    });
    dispatch(editCandidate(formData));
  };

  if (!profileData.isLoading && data !== null) {
    return (
      <View style={ProfileStyle.conatiner}>
        <Formik
          initialValues={profileInitialValue}
          onSubmit={(values) => updateUser(values)}
          validationSchema={profileValidationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            setFieldValue,
            handleBlur,
            touched,
          }) => {
            return (
              <View style={ProfileStyle.profileMainView}>
                <CustomDrawer onPress={handleOpenDrawer} title={"Profile"} />
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View>
                    <ImagePickerComponent
                      onSelect={(item) => {
                        setFieldValue("image", item);
                      }}
                      value={values?.image}
                      initialImage={values.image}
                    />
                  </View>
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
                    errors={errors.email}
                    value={values?.email}
                    editable={false}
                    onChangeText={handleChange(InputBoxConstants.EMAIL)}
                    touched={touched?.email}
                  />
                  <InputBox
                    title={StringConstants.MOBILE_NUMBER}
                    placeholder={StringConstants.MOBILE_NUMBER}
                    onBlur={handleBlur(InputBoxConstants.MOBILE_NUMBER)}
                    errors={errors.mobile_number}
                    maxLength={10}
                    editable={false}
                    keyboardType={AlignmentConstants.NUMERIC}
                    value={values?.mobile_number}
                    onChangeText={handleChange(InputBoxConstants.MOBILE_NUMBER)}
                    touched={touched?.mobile_number}
                  />
                  <InputBox
                    title={StringConstants.SKILLS}
                    placeholder={StringConstants.ADD_ADDRESS}
                    onBlur={handleBlur(InputBoxConstants.SKILLS)}
                    errors={errors.skills}
                    value={values?.skills}
                    onChangeText={handleChange(InputBoxConstants.SKILLS)}
                    touched={touched?.skills}
                  />
                  <InputBox
                    title={StringConstants.ADDRESS}
                    placeholder={StringConstants.ADDRESS}
                    onBlur={handleBlur(InputBoxConstants.ADDRESS)}
                    errors={errors.address}
                    value={values?.address}
                    onChangeText={handleChange(InputBoxConstants.ADDRESS)}
                    touched={touched?.address}
                  />
                  <View style={ProfileStyle.radioButtonView}>
                    <Text style={ProfileStyle.radioText}>
                      {StringConstants.GENDER}
                    </Text>
                    <RadioForm
                      radio_props={Gender}
                      buttonColor={ColorConstants.BLACK}
                      labelColor={ColorConstants.BLACK}
                      initial={values?.gender ? values?.gender - 1 : -1}
                      onPress={(value) => setValue(value)}
                      labelHorizontal={false}
                      formHorizontal
                    />
                  </View>
                  <Text
                    style={[InputBoxStyle.inputTitle, SignupStyle.resumeText]}
                  >
                    {StringConstants.RESUME}
                  </Text>
                  <View style={SignupStyle.resumeMainContainer}>
                    <View style={SignupStyle.resumeView}>
                      <CustomButton
                        width={dynamicSize(NumberConstants.VALUE_130)}
                        onSubmit={handleDocumentSelection}
                        fontSize={normalizeFont(NumberConstants.VALUE_15)}
                        backgroundColor={ColorConstants.ORANGE}
                        title={StringConstants.UPLOAD_RESUME}
                        borderRadius={dynamicSize(NumberConstants.VALUE_20)}
                      />
                      <Text style={SignupStyle.documentUploadText}>
                        {StringConstants.DOCUMENT_TYPE_TEXT}
                      </Text>
                    </View>
                    {fileResponse.map((file, index) => (
                      <Text
                        key={index.toString()}
                        numberOfLines={NumberConstants.VALUE_1}
                        ellipsizeMode={StringConstants.MIDDLE}
                      >
                        {file?.name}
                      </Text>
                    ))}
                  </View>
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

export default Profile;

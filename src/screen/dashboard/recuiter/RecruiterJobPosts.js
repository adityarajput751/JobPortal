import { View, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../../elements/CustomButton";
import { ColorConstants } from "../../../theme/ColorConstants";
import { NumberConstants } from "../../../constants/NumberConstants";
import { InputBoxConstants, StringConstants } from "../../../constants/StringConstants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../../../elements/InputBox";
import { normalizeFont } from "../../../utils/responsive";
import { ProfileStyle } from "../../../theme/styles/ProfileStyle";
import { loaderHide, loaderShown } from "../../../store/reducer/LoaderSlice";
import { toastShown } from "../../../store/reducer/ToastSlice";
import { jobPostRecruiter } from "../../../store/reducer/JobPostSlice";
import { updateJob } from "../../../store/reducer/UpdateJobSlice";
import CustomHeader from "../../../elements/CustomHeader";

const RecruiterJobPost = ({ route }) => {
  const isEditPost = route?.params?.isEdit;
  const editItem = route?.params?.jobItemData;
  const [inputTitile, setTitle] = useState(isEditPost ? editItem?.title : "");
  const [inputCompany, setCompany] = useState(
    isEditPost ? editItem?.company : ""
  );
  const [inputLocation, setLocation] = useState(
    isEditPost ? editItem?.location : ""
  );
  const [inputSalary, setSalary] = useState(isEditPost ? editItem?.salary : "");
  const [inputExperience, setExperience] = useState(
    isEditPost ? editItem?.experience_required : ""
  );
  const [inputSkills, setSkills] = useState(
    isEditPost ? editItem?.skills_required : ""
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const updateLoadingRef = useRef(false);
  const jobPost = useSelector((state) => state?.jobPost);
  const jobUpdate = useSelector((state) => state?.updateJob);

  useEffect(() => {
    if (jobPost.isLoading) {
      dispatch(loaderShown());
    } else if (loadingRef.current && !jobPost.isLoading) {
      if (jobPost?.isError) {
        dispatch(loaderHide());
        dispatch(
          toastShown({ isError: true, toastMessage: jobPost?.ErrorMsg })
        );
      } else if (jobPost?.isSuccess) {
        dispatch(loaderHide());
        dispatch(
          toastShown({ isError: false, toastMessage: jobPost?.RessMsg })
        );
        navigation.goBack();
      }
    }
    loadingRef.current = jobPost.isLoading;
  }, [jobPost.isLoading, jobPost?.isSuccess]);

  useEffect(() => {
    if (jobUpdate.isLoading) {
      dispatch(loaderShown());
    } else if (updateLoadingRef.current && !jobUpdate.isLoading) {
      if (jobUpdate?.isError) {
        dispatch(loaderHide());
        dispatch(
          toastShown({ isError: true, toastMessage: jobUpdate?.ErrorMsg })
        );
      } else if (jobUpdate?.isSuccess) {
        dispatch(loaderHide());
        dispatch(
          toastShown({ isError: false, toastMessage: jobUpdate?.ErrorMsg })
        );
        navigation.goBack();
      }
    }
    updateLoadingRef.current = jobUpdate.isLoading;
  }, [jobUpdate.isLoading, jobUpdate?.isSuccess]);

  const handleSave = () => {
    const payload = {
      title: inputTitile,
      company: inputCompany,
      location: inputLocation,
      salary: inputSalary,
      experience_required: inputExperience,
      skills_required: inputSkills,
    };
    dispatch(jobPostRecruiter(payload));
  };

  const handleEdit = () => {
    const payload = {
      title: inputTitile,
      company: inputCompany,
      location: inputLocation,
      salary: inputSalary,
      experience_required: inputExperience,
      skills_required: inputSkills,
      id: editItem?.id,
    };
    dispatch(updateJob(payload));
  };

  return (
    <View style={ProfileStyle.profileMainView}>
      {/* <CustomDrawer onPress={handleOpenDrawer} title={"Post Job"} /> */}
      <CustomHeader
        onPress={() => navigation.goBack()}
        title={StringConstants.POST_JOBS}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputBox
          title={StringConstants.JOB_TITLE}
          placeholder={StringConstants.JOB_PLACEHOLDER}
          value={inputTitile}
          onChangeText={(text) => setTitle(text)}
        />
        <InputBox
          title={StringConstants.COMPANY_NAME}
          placeholder={StringConstants.COMPANY_PLACEHOLDER}
          value={inputCompany}
          onChangeText={(text) => setCompany(text)}
        />
        <InputBox
          title={StringConstants.LOCATION}
          placeholder={StringConstants.LOCATION}
          value={inputLocation}
          onChangeText={(text) => setLocation(text)}
        />
        <InputBox
          title={StringConstants.SALARY}
          placeholder={StringConstants.SALARY}
          value={inputSalary}
          onChangeText={(text) => setSalary(text)}
          keyboardType={InputBoxConstants.NUMBER_PAD}
        />
        <InputBox
          title={StringConstants.EXPERIENCE}
          placeholder={StringConstants.EXPERIENCE}
          value={inputExperience}
          onChangeText={(text) => setExperience(text)}
          keyboardType={InputBoxConstants.NUMBER_PAD}
        />
        <InputBox
          title={StringConstants.SKILLS}
          placeholder={StringConstants.SKILLS}
          value={inputSkills}
          onChangeText={(text) => setSkills(text)}
        />
        <CustomButton
          onSubmit={isEditPost ? handleEdit : handleSave}
          backgroundColor={ColorConstants.LIGHT_BLUE}
          fontSize={normalizeFont(NumberConstants.VALUE_20)}
          title={StringConstants.POST_JOBS}
        />
      </ScrollView>
    </View>
  );
};

export default RecruiterJobPost;

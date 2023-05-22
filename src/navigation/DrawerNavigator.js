import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import JobSeeker from "../screen/dashboard/jobSeeker/JobSeeker";
import Profile from "../screen/dashboard/profile/Profile";
import RecuiterDashBoard from "../screen/dashboard/recuiter/RecuiterDashBoard";
import { Image, Text, View } from "react-native";
import { AppImages } from "../theme/AppImages";
import { DrawerStyle } from "../theme/styles/CustomElementStyle";
import Setting from "../screen/drawerScreen/Setting";
import ChangePassword from "../screen/auth/changePassword/ChangePassword";
import { RouteConstants } from "../constants/StringConstants";
import { NumberConstants } from "../constants/NumberConstants";
import RecruiterProfile from "../screen/dashboard/recruiterProfile/RecruiterProfile";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const CustomDrawerHeader = ({ ProfileType }) => {
  const profileData = useSelector((state) => state?.profile);
  const RecruiterProfileData = useSelector((state) => state?.recruiterProfile);
  const [recData, setRecData] = useState("");
  const data = profileData?.data;
  useEffect(() => {
    setRecData(RecruiterProfileData);
  }, []);

  return (
    <View style={DrawerStyle.drawerHeader}>
      {ProfileType == 2 ? (
        <Image source={AppImages.USER} style={DrawerStyle.profilePicture} />
      ) : data == undefined ? (
        <Image source={AppImages.USER} style={DrawerStyle.profilePicture} />
      ) : (
        <Image
          source={{ uri: data?.image }}
          style={DrawerStyle.profilePicture}
        />
      )}

      <Text style={DrawerStyle.drawerNavName}>
        {ProfileType == 2
          ? recData?.data?.data?.contact_person_name
          : data?.fullname}
      </Text>
    </View>
  );
};

const DrawerNavigator = ({ route }) => {
  const ProfileType = route?.params?.profileRole;
  const navigation = useNavigation();
  const LogOut = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        ProfileType === 1
          ? RouteConstants.JOB_SEEKER
          : RouteConstants.RECRUITER_DASHBOARD
      }
      drawerContent={(props) => (
        <View>
          <CustomDrawerHeader ProfileType={ProfileType} />
          <DrawerItemList {...props} />
        </View>
      )}
    >
      <Drawer.Screen
        name={RouteConstants.HOME}
        component={
          ProfileType == NumberConstants.VALUE_1 ? JobSeeker : RecuiterDashBoard
        }
      />
      <Drawer.Screen
        name={RouteConstants.PROFILE}
        component={
          ProfileType == NumberConstants.VALUE_1 ? Profile : RecruiterProfile
        }
      />
      <Drawer.Screen name={RouteConstants.SETTING} component={Setting} />
      <Drawer.Screen
        name={RouteConstants.CHANGE_PASSWORD}
        component={ChangePassword}
      />
      <Drawer.Screen name="Log Out" component={LogOut} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

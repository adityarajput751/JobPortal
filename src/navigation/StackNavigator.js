import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/auth/login/Login";
import Signup from "../screen/auth/signup/Signup";
import { RouteConstants } from "../constants/StringConstants";
import DrawerNavigator from "./DrawerNavigator";
import ForgotPassword from "../screen/auth/forgotPassword/ForgotPassword";
import TermAndCond from "../screen/drawerScreen/TermAndCond";
import PrivacyAndPolicy from "../screen/drawerScreen/PrivacyAndPolicy";
import RecruiterJobPost from "../screen/dashboard/recuiter/RecruiterJobPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getDataFomLocalStore } from "../helper/StorageData";
import _ from "lodash";
import { updateToken } from "../store/reducer/LoginSlice";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const candidate = useSelector((state) => state);
  const [Token, setToken] = useState("");
  const [loggedIn, setLogged] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getDataFomLocalStore("token").then((token) => {
      dispatch(updateToken(token?.token));
      setToken(token?.token);
      console.log(token, "itogjsssijg");
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(Token) || Token != null) {
      console.log(Token, "Token");
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [Token]);

  console.log(loggedIn, "ferifndjsn");

  return (
    <Stack.Navigator
      initialRouteName={
        loggedIn ? RouteConstants.DRAWER_NAVIGATOR : RouteConstants.LOGIN
      }
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={RouteConstants.LOGIN} component={Login} />
      <Stack.Screen name={RouteConstants.SIGNUP} component={Signup} />
      <Stack.Screen
        name={RouteConstants.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={RouteConstants.TERM_CONDITION}
        component={TermAndCond}
      />
      <Stack.Screen
        name={RouteConstants.PRIVACY_AND_POLICY}
        component={PrivacyAndPolicy}
      />
      <Stack.Screen name={"JobPost"} component={RecruiterJobPost} />
      <Stack.Screen
        name={RouteConstants.DRAWER_NAVIGATOR}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

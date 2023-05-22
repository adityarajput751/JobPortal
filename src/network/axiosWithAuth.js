import axios from "axios";
import { ApiUrl } from "../constants/StringConstants";
import _ from "lodash";
import { updateToken } from "../store/reducer/LoginSlice";
import jwt_decode from "jwt-decode";
import { store } from "../store/store";
import { getDataFomLocalStore } from "../helper/StorageData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstanceAuth = axios.create({
  baseURL: ApiUrl.BASEURL,
});

let isRefreshing = false;
let refreshSubscribers = [];

axiosInstanceAuth.interceptors.request.use(
  async (config) => {
    const token = store.getState().login.token;

    let tokens;

const retrieveToken =async()=> {
  try {
    tokens = await AsyncStorage.getItem("token");
    console.log(tokens,'figjdf');
  } catch (error) {
    console.log(error);
  }
}

retrieveToken();

// Now you can access the value of tokens outside of the function
console.log("tokenAccess", tokens);

    if (token) {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken, "decodedToken");
      const currentTime = Date.now() / 1000;
      console.log(decodedToken.exp < currentTime, "isExpireeee");
      if (decodedToken.exp < currentTime) {
        // Token has expired, refresh it
        const refreshToken = store.getState().login.refresh;
        if (!isRefreshing) {
          isRefreshing = true;
          axios
            .post(`${ApiUrl.BASEURL}${ApiUrl.REFRESH_TOKEN}`, {
              refresh: refreshToken,
            })
            .then((response) => {
              // handle success
              console.log(response.data, "responseData");
              config.headers.Authorization = `Bearer ${response?.data?.access}`;
              store.dispatch(updateToken(response?.data));
              refreshSubscribers.forEach((callback) =>
                callback(response?.data)
              );
              refreshSubscribers = [];
              isRefreshing = false;
            })
            .catch((error) => {
              // handle error
              console.log(error.message, "error handle");
            });
        } else {
          // Wait for token refresh
          const accessToken = await new Promise((resolve) => {
            refreshSubscribers.push((token) => {
              resolve(token);
            });
          });
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanceAuth.interceptors.response.use(
  (response) => {
    console.log(response, "responsedatatdd");
    return response;
  },
  async function (error) {
    console.log(error?.response?.data?.error, "error_message");
    const originalRequest = error.config;
    console.log(error?.response?.status, "error.response.status");
    console.log(originalRequest, "originalRequest");
    return error?.response?.data?.error;
  }
);

export default axiosInstanceAuth;

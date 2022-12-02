import React, { useState, useEffect } from "react";
import axios from "axios";

// COnstants
import { BASE_URL } from "../Config";

export const DContext = React.createContext();

export const DProvider = (props) => {
  // State variables
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setUserToken(accessToken);
  }, []);

  // Global Functions
  const userLogin = async ({ email, password }) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/auth/login`,
        // headers: { Authorization: "Bearer " + authState.user.access_token },
        data: {
          email: email,
          password: password,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  const userSignup = async ({ email, password }) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/auth/signup`,
        // headers: { Authorization: "Bearer " + authState.user.access_token },
        data: {
          email: email,
          password: password,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  const userResetPassword = async ({ password, confirmPassword }) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/auth/reset-password`,
        data: {
          email: localStorage.getItem("email"),
          password: password,
          confirmPassword: confirmPassword,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  const userGetOtp = async ({ email }) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/auth/forgot-password`,
        data: {
          email: email,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  const userEnterOtp = async ({ otp }) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/auth/verify-otp`,
        data: {
          email: localStorage.getItem("email"),
          otp: otp,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  const getGenInformationDContext = async () => {
    // console.log('getGenInformationDContext')
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/profile/get-general-info`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });

      // console.log('axiosRes=========',axiosRes)
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  const updateGenInformationDContext = async (bodyFormData) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/update-general-info`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: bodyFormData,
      });
      console.log("axiosRes=========", axiosRes);
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  const getPersonalInformationDContext = async () => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/profile/get-personal-info`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get personal info (DContext.js) - ",
        err
      );
    }
  };

  const updatePersonalInformationDContext = async (bodyFormData) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/update-personal-info`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: bodyFormData,
      });
      console.log("axiosRes=========", axiosRes);
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while Update Personal Info (DContext.js) - ",
        err
      );
    }
  };

  const changePasswordDContext = async ({ currentPassword, newPassword }) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/change-password`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      });
      console.log("axiosRes=========", axiosRes);
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while change Password (DContext.js) - ", err);
    }
  };

  const getEmailOtpInsideLoginDContext = async (email) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/auth/forgot-password`,
        data: {
          email: email,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while get otp inside login api (DContext.js) - ",
        err
      );
    }
  };

  const verifyOtpInsideLoginDContext = async (email, otp) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/auth/verify-otp`,
        data: {
          email: email,
          otp: otp,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  // Variables and methods to be shared globally
  const value = {
    // State Variables
    user,
    setUser,
    userToken,
    setUserToken,
    // Methods
    userLogin,
    userSignup,
    userResetPassword,
    userGetOtp,
    userEnterOtp,
    getGenInformationDContext,
    updateGenInformationDContext,
    getPersonalInformationDContext,
    updatePersonalInformationDContext,
    changePasswordDContext,
    getEmailOtpInsideLoginDContext,
    verifyOtpInsideLoginDContext,
  };
  return (
    <DContext.Provider value={{ ...value }}>{props.children}</DContext.Provider>
  );
};

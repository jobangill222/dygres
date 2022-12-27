import React, { useState, useEffect } from "react";
import axios from "axios";

// COnstants
import { BASE_URL } from "../Config";
// import { isCompositeComponent } from "react-dom/test-utils";

export const DContext = React.createContext();

export const DProvider = (props) => {
  // State variables
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userStats, setUserStats] = useState(null);

  //State for postList
  const [postList, setPostList] = useState([]);

  //State For Popup UserList
  const [selectedPostIDForPopup, setSelectedPostIDForPopup] = useState(null);
  const [popupType, setPopupType] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setUserToken(accessToken);
      const checkAuth = async () => {
        const userDetails = await getUserDetailsDContext();
        setUser(userDetails.data);
        setUserStats(userDetails.userStats);
      };
      checkAuth();
    }
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

      const updatedDetails = await getUserDetailsDContext();
      setUser(updatedDetails.data);
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
      const updatedDetails = await getUserDetailsDContext();
      setUser(updatedDetails.data);

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

      const updatedDetails = await getUserDetailsDContext();
      setUser(updatedDetails.data);
      return axiosRes.data;

    } catch (err) {
      console.log("Some issue while login (DContext.js) - ", err);
    }
  };

  const createPostDContext = async (content) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/create-post`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          content: content,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while create Post api (DContext.js) - ", err);
    }
  };

  const getGlobalPostDContext = async (pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/post/get-global-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get global post api (DContext.js) - ",
        err
      );
    }
  };

  const getFollowingPostDContext = async (pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/post/get-following-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get following post api (DContext.js) - ",
        err
      );
    }
  };

  const getUserDetailsDContext = async () => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/profile/get-user-details`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      // console.log("get user detail api hit:", axiosRes.data);
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get user detail api (DContext.js) - ",
        err
      );
    }
  };

  const agreeUnagreePost = async (postID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/agree-post`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID,
        },
      });
      // console.log("get user detail api hit:", axiosRes.data);
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit agree un agree api (DContext.js) - ",
        err
      );
    }
  };

  const disAgreeUnDisAgreePost = async (postID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/disagree-post`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID,
        },
      });
      // console.log("get user detail api hit:", axiosRes.data);
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit dis agree un-disagree api (DContext.js) - ",
        err
      );
    }
  };

  const reportPostDContext = async (postID, reportReason, reportDescription) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/report-post`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID,
          reportReason: reportReason,
          description: reportDescription,
        },
      });
      // console.log("get user detail api hit:", axiosRes.data);
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit report and unreport api (DContext.js) - ",
        err
      );
    }
  };

  const deletePostDContext = async (postID) => {
    try {
      const axiosRes = await axios({
        method: "delete",
        url: `${BASE_URL}/post/delete-post`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID,
        },
      });
      return axiosRes.data;
    }
    catch (err) {
      console.log("Some issue while hit delete post api in (DContext.js)", err);
    }
  }

  const editPostDContext = async (postID, editContent) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/edit-post`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID,
          content: editContent,
        },
      });
      return axiosRes.data;
    }
    catch (err) {
      console.log("Some issue while hit edit post api in (DContext.js)", err);
    }
  }

  const followUnfollowDContext = async (userID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/follow-unfollow`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          userID: userID,
        },
      });
      return axiosRes.data;
    }
    catch (err) {
      console.log("Some issue while hit follow un follow api in (DContext.js)", err);
    }
  }

  const getMyPostsDContext = async (pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/post/get-my-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get my post api (DContext.js) - ",
        err
      );
    }
  };

  const getMostVotedPostDContext = async (pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/post/most-voted-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get most voted post api (DContext.js) - ",
        err
      );
    }
  };

  const getHotPostDContext = async (pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/post/hot-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get hot post api (DContext.js) - ",
        err
      );
    }
  };

  const getNotVotedPostDContext = async (pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/post/not-voted-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get not voted post api (DContext.js) - ",
        err
      );
    }
  };

  const getAgreedPostUserDContext = async (selectedPostID, PageNumber) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/agreed-post-user?page=${PageNumber}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: selectedPostID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get agreed post user api (DCOntext.js) - ", err);
    }
  };

  const getDisAgreedPostUserDContext = async (selectedPostID, PageNumber) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/disagreed-post-user?page=${PageNumber}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: selectedPostID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get dis-agreed post user api (DCOntext.js) - ", err);
    }
  };

  const getReportedPostUserDContext = async (selectedPostID, PageNumber) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/reported-post-user?page=${PageNumber}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: selectedPostID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get reported post user api (DCOntext.js) - ", err);
    }
  };

  const getPostCommentDContext = async (PostID, pageNumberOfComment) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-post-comments?page=${pageNumberOfComment}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: PostID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get 2 latest comment of post api (DCOntext.js) - ", err);
    }
  };


  const createCommentDContext = async (postID, comment) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/add-comment`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID,
          comment: comment,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while create comment api (DContext.js) - ", err);
    }
  };


  // Variables and methods to be shared globally
  const value = {
    // State Variables
    user,
    setUser,
    userToken,
    setUserToken,
    userStats,
    setUserStats,
    postList,
    setPostList,
    selectedPostIDForPopup,
    setSelectedPostIDForPopup,
    popupType,
    setPopupType,
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
    createPostDContext,
    getGlobalPostDContext,
    getFollowingPostDContext,
    agreeUnagreePost,
    disAgreeUnDisAgreePost,
    reportPostDContext,
    deletePostDContext,
    editPostDContext,
    followUnfollowDContext,
    getMyPostsDContext,
    getMostVotedPostDContext,
    getHotPostDContext,
    getNotVotedPostDContext,
    getAgreedPostUserDContext,
    getDisAgreedPostUserDContext,
    getReportedPostUserDContext,
    getPostCommentDContext,
    createCommentDContext,
  };
  return (
    <>
      {/* {console.log("updated user state", user)}
      {console.log("updated user stats state", userStats)} */}

      <DContext.Provider value={{ ...value }}>
        {props.children}
      </DContext.Provider>
    </>
  );
};

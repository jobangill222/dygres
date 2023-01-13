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

  //Notifications
  const [notificationList, setNotificationList] = useState([]);

  //State For Popup UserList
  const [selectedIDForPopup, setSelectedIDForPopup] = useState(null); //Either be postID or comment ID to get user list whom agree or disagree and modal will open if there is any value change in this state(Define in component/DigitalTabs , Pages/Hot,new,Notvoted etc)
  const [popupType, setPopupType] = useState(null); // like popup for user agreed or disagreed to comment or user agree disagree to post based on this hit api in component/modal/User list





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

  const createCommentDContext = async (postID, commentID, comment) => {
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
          parentCommentID: commentID,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while create comment api (DContext.js) - ", err);
    }
  };

  const agreeUnagreeCommentDContext = async (commentID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/agree-comment`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          commentID: commentID,
        },
      });
      // console.log("get user detail api hit:", axiosRes.data);
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit agree un agree comment api (DContext.js) - ",
        err
      );
    }
  };

  const disagreeUnDisagreeCommentDContext = async (commentID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/disagree-comment`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          commentID: commentID,
        },
      });
      // console.log("get user detail api hit:", axiosRes.data);
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit agree un agree comment api (DContext.js) - ",
        err
      );
    }
  };

  const getAgreedCommentUserDContext = async (selectedPostID, PageNumber) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/agreed-comment-user-list?page=${PageNumber}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          commentID: selectedPostID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get agreed comment user api (DCOntext.js) - ", err);
    }
  };

  const getDisagreedCommentUserDContext = async (selectedPostID, PageNumber) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/disagreed-comment-user-list?page=${PageNumber}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          commentID: selectedPostID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get disagreed comment user api (DCOntext.js) - ", err);
    }
  };

  const getCommentOfCommentDContext = async (commentID, pageNumberOfComment) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-child-comments?page=${pageNumberOfComment}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          parentCommentID: commentID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get child comment of post api (DCOntext.js) - ", err);
    }
  }


  const getAwardListToSendDContext = async (selectedPostIDForAwardPopup) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/user/award/award-list-to-send`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: selectedPostIDForAwardPopup,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get award list to send api (DCOntext.js) - ", err);
    }
  };


  const getPackagesToBuyDContext = async () => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/user/award/get-package-list`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get pckage list api (DCOntext.js) - ", err);
    }
  };


  const BuyAwardDContext = async (packageID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/user/award/create-payment-link`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          packageID: packageID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting payment link api (DCOntext.js) - ", err);
    }
  };

  const SendAwardDContext = async (postID, awardID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/user/award/send-award`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID,
          awardID: awardID,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while send award api (DCOntext.js) - ", err);
    }
  };


  const getOtherUserDetailByUsernameContext = async (username) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/get-other-user-details-by-username`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          username: username,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get other user detail api (DContext.js) - ",
        err
      );
    }
  };

  const getOtherUserPostsByUsernameDContext = async (username, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-other-user-posts-by-username?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          username: username,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get other user post api (DContext.js) - ",
        err
      );
    }
  };


  const getpostsByHashTagDContext = async (hashtagName, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-posts-by-hashtag?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          hashtagName: hashtagName,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get hashtag post api (DContext.js) - ",
        err
      );
    }
  };

  const getSinglePostDetailDContext = async (postID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/single-post-detail`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID
        }
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get single post detail api (DContext.js) - ",
        err
      );
    }
  };


  const getNotificationDContext = async (pageNumberOfNotificationList) => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/user/notification/get-notifications?page=${pageNumberOfNotificationList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get notification list api (DContext.js) - ",
        err
      );
    }
  };


  const deleteNotificationDContext = async (notificationID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/user/notification/delete-notification`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          notificationID: notificationID
        }
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while delete notification api (DContext.js) - ",
        err
      );
    }
  };


  const deleteAllNotificationDContext = async (notificationID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/user/notification/delete-all-notification`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while delete all notification api (DContext.js) - ",
        err
      );
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
    notificationList,
    setNotificationList,
    selectedIDForPopup,
    setSelectedIDForPopup,
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
    agreeUnagreeCommentDContext,
    disagreeUnDisagreeCommentDContext,
    getAgreedCommentUserDContext,
    getDisagreedCommentUserDContext,
    getCommentOfCommentDContext,
    getAwardListToSendDContext,
    getPackagesToBuyDContext,
    BuyAwardDContext,
    SendAwardDContext,
    getOtherUserDetailByUsernameContext,
    getOtherUserPostsByUsernameDContext,
    getpostsByHashTagDContext,
    getSinglePostDetailDContext,
    getNotificationDContext,
    deleteNotificationDContext,
    deleteAllNotificationDContext
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

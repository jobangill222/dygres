import React, { useState, useEffect } from "react";
import axios from "axios";

// COnstants
import { BASE_URL } from "../Config";
// import { isCompositeComponent } from "react-dom/test-utils";
// import { useNavigate } from "react-router-dom";

export const DContext = React.createContext();

export const DProvider = (props) => {

  // const navigate = useNavigate();

  // State variables
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(true);
  const [userStats, setUserStats] = useState(null);

  //State for postList
  const [postList, setPostList] = useState([]);

  //Notifications
  const [notificationList, setNotificationList] = useState([]);

  //State for is post or not to paas dependency in use effect for render updated list when post 
  const [isPostState, setIsPostState] = useState("0");

  //State For Popup UserList
  const [popupType, setPopupType] = useState(null); // like popup for user agreed or disagreed to comment or user agree disagree to post based on this hit api in component/modal/User list
  const [selectedIDForPopup, setSelectedIDForPopup] = useState(null); //Either be postID or comment ID to get user list whom agree or disagree and modal will open if there is any value change in this state(Define in component/DigitalTabs , Pages/Hot,new,Notvoted etc or either userID to get following followers)
  const [postIDForAwardOfPost, setPostIDForAwardOfPost] = useState(null); //postID for show all awards of posts in post Head component

  //Retweet PostID
  const [postIDForRetweet, setPostIDForRetweet] = useState(null); //store post id for retweet

  //For loading 
  const [isLoading, setIsLoading] = useState(false);


  //FOr search
  const [searchState, setSearchState] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);


  //For paas dependency when click on same page
  const [postIDForSinglePostState, setPostIDForSinglePostState] = useState(null);
  const [hashTagClickState, setHashTagClickState] = useState(false);


  //Font Size
  const [fontSizeState, setFontSizeState] = useState(null);


  useEffect(() => {

    const fontSize = localStorage.getItem("fontSize");
    if (fontSize) {
      setFontSizeState(fontSize)
    } else {
      setFontSizeState('medium')
    }

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setUserToken(accessToken);
      const checkAuth = async () => {
        const userDetails = await getUserDetailsDContext();
        // console.log('userDetails,userDetails', userDetails);
        if (userDetails.status === "error") {
          localStorage.removeItem("accessToken");
          setUser(null);
          setUserStats(null);
          // navigate("/login");
        }
        else {
          setUser(userDetails.data);
          setUserStats(userDetails.userStats);
        }
      };
      checkAuth();
    } else {
      setUserToken(false);
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

  const userSignup = async ({ email, username, password }) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/auth/signup`,
        // headers: { Authorization: "Bearer " + authState.user.access_token },
        data: {
          email: email,
          username: username,
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

  const createPostDContext = async (content, parentPostID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/create-post`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          content: content,
          parentPostID: parentPostID
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while create Post api (DContext.js) - ", err);
    }
  };

  const getGlobalPostDContext = async (search, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-global-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          search: search
        }
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get global post api (DContext.js) - ",
        err
      );
    }
  };

  const getFollowingPostDContext = async (search, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-following-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          search: search
        }
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



  const followUserDContext = async (userID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/follow-user`,
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

  const unFollowUserDContext = async (userID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/un-follow-user`,
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

  const getMostVotedPostDContext = async (search, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/most-voted-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          search: search
        }
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get most voted post api (DContext.js) - ",
        err
      );
    }
  };

  const getHotPostDContext = async (search, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/hot-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          search: search
        }
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get hot post api (DContext.js) - ",
        err
      );
    }
  };

  const getNotVotedPostDContext = async (search, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/not-voted-posts?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          search: search
        }
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


  const getOtherUserDetailByUserIDDContext = async (userID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/get-other-user-details-by-userID`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          userID: userID,
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

  const getOtherUserPostsByUserIDDContext = async (userID, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-other-user-posts-by-userID?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          userID: userID,
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


  const getpostsByHashTagDContext = async (search, hashtagName, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-posts-by-hashtag?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          search: search,
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


  const getAwardOfPostDContext = async (postID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/post/get-post-awards`,
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
        "Some issue while hit get award of post api (DContext.js) - ",
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


  const checkUsernameExistDContext = async (username) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/check-username-exist`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          username: username
        }
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while check username exist api (DContext.js) - ",
        err
      );
    }
  };


  const getFollowersDContext = async (selectedIDForPopup, PageNumber) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/follwer-following-list-by-userID?page=${PageNumber}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          type: "followers",
          userID: selectedIDForPopup,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get followers user api (DCOntext.js) - ", err);
    }
  };

  const getFollowingDContext = async (selectedIDForPopup, PageNumber) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/follwer-following-list-by-userID?page=${PageNumber}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          type: "following",
          userID: selectedIDForPopup,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hitting get following user api (DCOntext.js) - ", err);
    }
  };



  const getUsersAllAwardsTheyGet = async () => {
    try {
      const axiosRes = await axios({
        method: "get",
        url: `${BASE_URL}/post/get-users-all-award-they-get`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log(
        "Some issue while hit get all award of user api (DContext.js) - ",
        err
      );
    }
  };


  const updateCoverImageDContext = async (bodyFormData) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/upload-cover-image`,
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
      console.log("Some issue while upload cover image (DContext.js) - ", err);
    }
  };


  const searchSuggestionDContext = async (search) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/profile/search-suggestion`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          search: search,
        }
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while hit search suggestion api (DContext.js) - ", err);
    }
  };




  //Admin
  const allUserListDContext = async (search, pageNumber) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/user/all-user-list?page=${pageNumber}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          search: search
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while get all user api (DContext.js) - ", err);
    }
  }

  const sendNotificationToAllDContext = async (data) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/notification/send-notification-to-all-user`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          notification: data.notification
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while get all user api (DContext.js) - ", err);
    }
  }


  const humanVerificationDetailDContext = async (userID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/user/userDetail-for-verification`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          userID: userID
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while get human verification detail api (DContext.js) - ", err);
    }
  }


  const acceptRejectHumanVerificationDContext = async (userID, action) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/user/accept-reject-human-verification`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          userID: userID,
          action: action
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while accept reject human verification (DContext.js) - ", err);
    }
  }


  const blockUnblockUserDContext = async (userID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/user/block-unblock-user`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          userID: userID,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while block user (DContext.js) - ", err);
    }
  }


  const flagUnflagPostDContext = async (postID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/posts/flag-unflag-post`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          postID: postID,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while flag unflag post (DContext.js) - ", err);
    }
  }


  const getUsersFlaggedPostDContext = async (userID, pageNumberOfPostList) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/posts/users-flagged-post?page=${pageNumberOfPostList}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          userID: userID,
        },
      });

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while get flagged post of user (DContext.js) - ", err);
    }
  }


  const getAwardListDContext = async (type) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/award/award-list`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          type: type,
        },
      });
      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while get all awards (DCOntext.js) - ", err);
    }
  }


  const addAwardDContext = async (bodyFormData) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/award/add-award`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: bodyFormData,
      });

      console.log("axiosRes=========", axiosRes);

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while add award (DContext.js) - ", err);
    }
  };


  const awardDetailByIdDContext = async (awardID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/award/award-detail-by-id`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          awardID: awardID,
        }
      });

      console.log("axiosRes=========", axiosRes);

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while get single ward detail (DContext.js) - ", err);
    }
  };


  const editAwardDContext = async (bodyFormData) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/award/edit-award`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: bodyFormData
      });

      console.log("axiosRes=========", axiosRes);

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while edit award (DContext.js) - ", err);
    }
  };


  const deleteAwardDContext = async (awardID) => {
    try {
      const axiosRes = await axios({
        method: "post",
        url: `${BASE_URL}/admin/award/delete-award`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: {
          awardID: awardID,
        }
      });

      console.log("axiosRes=========", axiosRes);

      return axiosRes.data;
    } catch (err) {
      console.log("Some issue while delete award (DContext.js) - ", err);
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
    isPostState,
    setIsPostState,
    postList,
    setPostList,
    notificationList,
    setNotificationList,
    selectedIDForPopup,
    setSelectedIDForPopup,
    popupType,
    setPopupType,
    postIDForAwardOfPost,
    setPostIDForAwardOfPost,
    postIDForRetweet,
    setPostIDForRetweet,
    isLoading,
    setIsLoading,
    searchState,
    setSearchState,
    showSuggestions,
    setShowSuggestions,
    postIDForSinglePostState,
    setPostIDForSinglePostState,
    hashTagClickState,
    setHashTagClickState,
    fontSizeState,
    setFontSizeState,
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
    followUserDContext,
    unFollowUserDContext,
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
    getOtherUserDetailByUserIDDContext,
    getOtherUserPostsByUserIDDContext,
    getpostsByHashTagDContext,
    getSinglePostDetailDContext,
    getAwardOfPostDContext,
    getNotificationDContext,
    deleteNotificationDContext,
    deleteAllNotificationDContext,
    checkUsernameExistDContext,
    getFollowersDContext,
    getFollowingDContext,
    getUsersAllAwardsTheyGet,
    updateCoverImageDContext,
    searchSuggestionDContext,
    allUserListDContext,
    sendNotificationToAllDContext,
    humanVerificationDetailDContext,
    acceptRejectHumanVerificationDContext,
    blockUnblockUserDContext,
    flagUnflagPostDContext,
    getUsersFlaggedPostDContext,
    getAwardListDContext,
    addAwardDContext,
    awardDetailByIdDContext,
    editAwardDContext,
    deleteAwardDContext
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

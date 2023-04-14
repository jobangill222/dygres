import React, { useContext, useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { DContext } from "../../Context/DContext";

import Countdown from 'react-countdown';
import PostHeadAward from "./PostHeadAward";
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';


import { useNavigate, useLocation } from "react-router-dom";

import moment from "moment";
import TimeAgo from 'javascript-time-ago'
import { levelBelowPost } from "../../helper/levelBelowPost";
// import en from 'javascript-time-ago/locale/en'
// TimeAgo.addDefaultLocale(en)



const PostHead = (props) => {

  const navigate = useNavigate();
  const location = useLocation();


  //Context
  const { user, setUserStats, postList, setPostList, followUserDContext, unFollowUserDContext, setPostIDForAwardOfPost, setIsShowRulesModal, setIsFollowOnUserProfileState, setOtherUserStats, isDummyUser } = useContext(DContext);

  //Props
  const { postUserDetails, is_follow, postUserID, created_at, isPostDisable, setIsPostDisable, postAward, postID, isPostByOfficial } = props;

  //State
  const [isFollowState, setIsFollowState] = useState(0);

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US')

  //Follow to user and update post Listing
  const followUser = async () => {


    if (isDummyUser()) {
      // console.log("user is not logged in");
      navigate('/login')
    } else {
      let newPostList = postList;
      postList.forEach((post, index) => {
        if (post.userID === postUserID) {
          console.log('condition hit of follow user');
          newPostList[index] = { ...post, is_follow: 1 }
        }
      })
      setPostList([...newPostList, { ...newPostList[0] }]);
      // setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)
      setTimeout(() => setPostList((prevState) => prevState.slice(0, -1)), 100)

      // Update user stats state
      setUserStats((previousState) => {
        return {
          ...previousState,
          totalFollowing: previousState.totalFollowing + 1,
        };
      });

      //When on other user profile page change main follow unfollow which are showing right side of stats
      let pathName = location.pathname;
      if (pathName.includes("UsersProfile")) {
        setIsFollowOnUserProfileState(1);

        //Update other user stats
        setOtherUserStats((previousState) => {
          return {
            ...previousState,
            totalFollowers: previousState.totalFollowers + 1,
          };
        });
      }

      await followUserDContext(postUserID);
    }


  }


  //Un-follow user and update Post Listing
  const UnfollowUser = async () => {

    if (isDummyUser()) {
      navigate('/login')
    } else {
      let newPostList = postList;
      postList.forEach((post, index) => {
        if (post.userID === postUserID) {
          console.log('condition hit of unfollow user');
          newPostList[index] = { ...post, is_follow: 0 }
        }
      })
      setPostList([...newPostList, { ...newPostList[0] }]);
      // setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)
      setTimeout(() => setPostList((prevState) => prevState.slice(0, -1)), 100)

      // Update user stats state
      setUserStats((previousState) => {
        return {
          ...previousState,
          totalFollowing: previousState.totalFollowing - 1,
        };
      });


      //When on other user profile page change main follow unfollow which are showing right side of stats
      let pathName = location.pathname;
      if (pathName.includes("UsersProfile")) {
        setIsFollowOnUserProfileState(0);

        //Update other user stats
        setOtherUserStats((previousState) => {
          return {
            ...previousState,
            totalFollowers: previousState.totalFollowers - 1,
          };
        });
      }

      await unFollowUserDContext(postUserID);
    }


  }


  // When is_follow change or new list come then set in state
  useEffect(() => {
    if (is_follow === 1) {
      setIsFollowState(1);
    } else {
      setIsFollowState(0);
    }
  }, [is_follow]);


  const [verificationLevelState, setVerificationLevelState] = useState(false);
  //Verification Level
  useEffect(() => {
    getLevel();
  }, [postUserDetails])

  const getLevel = async () => {
    // const res = await verificationLevel(postUserDetails?.isEmailVerify, postUserDetails?.isPhotoVerify);
    const res = await levelBelowPost(isPostByOfficial, postUserDetails?.level, postUserDetails?.isOfficial);

    setVerificationLevelState(res);
  }


  const verificationtooltip = (
    <Tooltip id="verificationtooltip">
      {verificationLevelState && verificationLevelState === 4 ? 'Verified official account' : verificationLevelState === 1 ? 'Verified Email' : verificationLevelState === 2 ? "Verified Human" : "New account"}
    </Tooltip>
  );

  // const timerToolTip = () => {
  //   if (isPostDisable) {
  //     <Tooltip id="timerToolTip">
  //       Time Over
  //     </Tooltip>
  //   } else {
  //     < Tooltip id="timerToolTip" >
  //       Voting over after times up
  //     </Tooltip >
  //   }
  // };
  const timerOngoingToolTip = (
    <Tooltip id="timerOngoingToolTip">
      Voting is locked when the timer runs out
    </Tooltip>
  );

  const timerOverToolTip = (
    <Tooltip id="timerOverToolTip">
      Voting is now locked
    </Tooltip>
  );


  const userThoughtToolTip = (
    <Tooltip id="timerOverToolTip">
      {postUserDetails?.thoughts ? postUserDetails.thoughts : '*crickets*'}
    </Tooltip>
  )

  // const Completionist = () => console.log('You are good to go!')

  // Random component
  const Completionist = () => <span style={{ color: "red" }}><MdOutlineTimer />Time over</span>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setIsPostDisable(true)
      return <Completionist />;
    } else {
      let colour;
      // Render a countdown
      if (days === 0) {
        colour = "red";
      }
      else if (days === 1) {
        colour = "#FFBF00";
      }
      else {
        colour = "green";
      }
      return <span style={{ color: colour }}> <MdOutlineTimer />{days}:{hours}:{minutes}:{seconds}</span>;
    }
  };


  const viewAllAwardsOfPost = async () => {
    setPostIDForAwardOfPost(postID)
  }

  const userProfileDetail = async (username) => {
    // localStorage.setItem('sessionUserID', userID);
    if (isDummyUser()) {
      navigate('/login')
    } else {
      navigate('/UsersProfile/' + username)
    }

  }

  return (
    <>
      <div className="user-detail-bar">
        <div className="detailleft">
          <div className="userleftside">
            <OverlayTrigger placement="top" overlay={userThoughtToolTip} >
              <div className="avatar-img active">
                <img src={postUserDetails?.profileImage ? postUserDetails?.profileImage : `/images/user.png`} alt="user-img" />
              </div>
            </OverlayTrigger>
            <div className="user-detail">
              <div className="follow-bar">
                <h4 className="text-secondry" onClick={() => userProfileDetail(postUserDetails?.username)}>
                  {postUserDetails?.name ? postUserDetails.name : postUserDetails?.username}
                </h4>
                {user?._id !== postUserID &&
                  <>
                    {isFollowState === 0 && <button className='followbtn' onClick={followUser} type='button'>Follow</button>}
                    {isFollowState === 1 && <button className='followbtn' onClick={UnfollowUser} type='button'>Unfollow</button>}
                  </>
                }

              </div>


              <div className="user-availbility">
                <h6 className="text-lightgray">@{postUserDetails?.username}</h6>
                <h5 className="text-lightgray greentime">{timeAgo.format(moment(created_at)._d.getTime())}</h5>
              </div>
              <div className="rules-tag" onClick={() => setIsShowRulesModal(true)}>
                <OverlayTrigger placement="top" overlay={verificationtooltip} >
                  {verificationLevelState === 4 ?
                    <div className="levelbar text-darkwhite level1">
                      Official
                    </div> :
                    <div className="levelbar text-darkwhite level1">
                      Level {verificationLevelState}
                    </div>
                  }
                </OverlayTrigger>
              </div>
            </div>
          </div>


          <ul className="awards-bar bg-darkgray">
            {postAward?.length ?
              postAward.map((award, index) => {

                if (index < 4) {
                  return <PostHeadAward
                    key={index * Math.random(100)}
                    award={award}
                  />
                }
              })
              : ""
            }


            {postAward?.length > 4 ?
              <>
                <button type='button' className="viewmorebtn" onClick={viewAllAwardsOfPost} >View more</button>
              </> : ""
            }

          </ul>




        </div>
        <div className="user-active-timer">
          <ul>

            <li className="text-green ">

              <OverlayTrigger placement="top" overlay={isPostDisable ? timerOverToolTip : timerOngoingToolTip} >
                <div>
                  <Countdown date={moment(created_at) + 259200 * 1000} renderer={renderer}>
                  </Countdown>
                </div>
              </OverlayTrigger>

            </li>

          </ul>
        </div>
      </div>
    </>
  );
};

export default PostHead;

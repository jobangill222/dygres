import React, { useContext, useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { DContext } from "../../Context/DContext";

import Countdown from 'react-countdown';
import PostHeadAward from "./PostHeadAward";
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';


import { useNavigate } from "react-router-dom";

import moment from "moment";
import TimeAgo from 'javascript-time-ago'
import { verificationLevel } from "../../helper/verificationLevel";
// import en from 'javascript-time-ago/locale/en'
// TimeAgo.addDefaultLocale(en)



const PostHead = (props) => {

  const navigate = useNavigate();

  //Context
  const { user, setUserStats, postList, setPostList, followUserDContext, unFollowUserDContext, setPostIDForAwardOfPost } = useContext(DContext);

  //Props
  const { postUserDetails, is_follow, postUserID, created_at, setIsPostDisable, postAward, postID } = props;

  //State
  const [isFollowState, setIsFollowState] = useState(0);

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US')

  //Follow to user and update post Listing
  const followUser = async () => {
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

    await followUserDContext(postUserID);
  }


  //Un-follow user and update Post Listing
  const UnfollowUser = async () => {
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

    await unFollowUserDContext(postUserID);
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
    const res = await verificationLevel(postUserDetails?.isEmailVerify, postUserDetails?.isPhotoVerify);
    setVerificationLevelState(res);
  }


  const verificationtooltip = (
    <Tooltip id="verificationtooltip">
      {verificationLevelState && verificationLevelState === '1' ? 'Verified Email' : verificationLevelState === '2' ? "Verified Human" : "No Verification"}
    </Tooltip>
  );

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

  const userProfileDetail = async (userID) => {
    localStorage.setItem('sessionUserID', userID);
    navigate('/UsersProfile')
  }

  return (
    <>
      <div className="user-detail-bar">
        <div className="detailleft">
          <div className="userleftside">
            <div className="avatar-img active">
              <img src={postUserDetails?.profileImage ? postUserDetails?.profileImage : `/images/user.png`} alt="user-img" />
            </div>
            <div className="user-detail">
              <div className="follow-bar">
                <h4 className="text-secondry" onClick={() => userProfileDetail(postUserDetails?._id)}>
                  {postUserDetails?.name ? postUserDetails.name : postUserDetails?.username}
                </h4>
                {user?._id !== postUserID &&
                  <>
                    {isFollowState === 0 && <button className='followbtn' onClick={followUser} type='button'>Follow</button>}
                    {isFollowState === 1 && <button className='followbtn' onClick={UnfollowUser} type='button'>Un-Follow</button>}
                  </>
                }

              </div>


              <div className="user-availbility">
                <h6 className="text-lightgray">@{postUserDetails?.username}</h6>
                <h5 className="text-lightgray greentime">{timeAgo.format(moment(created_at)._d.getTime())}</h5>
              </div>
              <OverlayTrigger placement="top" overlay={verificationtooltip}>
                <div className="levelbar text-darkwhite level1">
                  Level {verificationLevelState}
                  {/* <h6 className="level1-circle">
                  <span className="text-white lvlstar">{postUserDetails?.isEmailVerify === 1 && postUserDetails?.isPhotoVerify === 0 ? '1' : postUserDetails?.isPhotoVerify === 1 ? "2" : "0"}</span>
                </h6> */}
                </div>
              </OverlayTrigger>
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

            <li className="text-green">
              {/* <MdOutlineTimer /> */}
              {/* 3 day timer from post date */}
              <Countdown date={moment(created_at) + 259200 * 1000} renderer={renderer}>
              </Countdown>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
};

export default PostHead;

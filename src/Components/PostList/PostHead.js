import React, { useContext, useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { DContext } from "../../Context/DContext";

import Countdown from 'react-countdown';
import PostHeadAward from "./PostHeadAward";

import moment from "moment";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)



const PostHead = (props) => {

  //Context
  const { user, setUserStats, postList, setPostList, followUnfollowDContext } = useContext(DContext);

  //Props
  const { postUserDetails, is_follow, postUserID, created_at, setIsPostDisable, postAward } = props;

  //State
  const [isFollowState, setIsFollowState] = useState(0);

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US')

  //Userlevel verification
  let userVerificationLevel;
  if (user?.isEmailVerify === 1 && user?.isPhotoVerify === 0) {
    userVerificationLevel = 1;
  }
  else if (user?.isPhotoVerify === 1) {
    userVerificationLevel = 2;
  }
  else {
    userVerificationLevel = 0;
  }


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

    await followUnfollowDContext(postUserID);
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

    await followUnfollowDContext(postUserID);
  }


  // When is_follow change or new list come then set in state
  useEffect(() => {
    if (is_follow === 1) {
      setIsFollowState(1);
    } else {
      setIsFollowState(0);
    }
  }, [is_follow]);



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
        colour = "yellow";
      }
      else {
        colour = "green";
      }
      return <span style={{ color: colour }}> <MdOutlineTimer />{days}:{hours}:{minutes}:{seconds}</span>;
    }
  };


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
                <h4 className="text-secondry">
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
              <div className="levelbar text-darkwhite level1">
                Level {userVerificationLevel}{" "}
                <h6 className="level1-circle">
                  <span className="text-white lvlstar">{userVerificationLevel}</span>
                </h6>
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
                } else {
                  return <p>More</p>
                }

              })
              : ""
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

import React, { useContext, useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { DContext } from "../../Context/DContext";

import { BASE_URL } from '../../Config/index';

import moment from "moment";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)



const PostHead = (props) => {

  const { user, postList, setPostList, followUnfollowDContext } = useContext(DContext);

  const { postUserDetails, is_follow, postUserID, created_at } = props;

  const [isFollowState, setIsFollowState] = useState(0);

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US')

  let userVerificationLevel;
  if (user.isEmailVerify === 1 && user.isPhotoVerify === 0) {
    userVerificationLevel = 1;
  }
  else if (user.isPhotoVerify === 1) {
    userVerificationLevel = 2;
  }
  else {
    userVerificationLevel = 0;
  }

  const followUser = async () => {
    let newPostList = postList;
    postList.forEach((post, index) => {
      if (post.userID === postUserID) {
        console.log('condition hit of follow user');
        newPostList[index] = { ...post, is_follow: 1 }
      }
    })
    setPostList([...newPostList, { ...newPostList[0] }]);
    setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)
    await followUnfollowDContext(postUserID);
  }

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
    await followUnfollowDContext(postUserID);
  }

  useEffect(() => {
    if (is_follow === 1) {
      setIsFollowState(1);
    } else {
      setIsFollowState(0);
    }
  }, [is_follow]);


  return (
    <>
      <div className="user-detail-bar">
        <div className="detailleft">
          <div className="userleftside">
            <div className="avatar-img active">
              <img src={postUserDetails[0]?.profileImage ? BASE_URL + `/` + postUserDetails[0]?.profileImage : `/images/user.png`} alt="user-img" />
            </div>
            <div className="user-detail">
              <div className="follow-bar">
                <h4 className="text-secondry">
                  {postUserDetails[0].name ? postUserDetails[0].name : postUserDetails[0].username}
                </h4>


                {user._id !== postUserID &&
                  <>
                    {isFollowState === 0 && <button className='followbtn' onClick={followUser} type='button'>Follow</button>}
                    {isFollowState === 1 && <button className='followbtn' onClick={UnfollowUser} type='button'>Un-Follow</button>}
                  </>
                }

              </div>


              <div className="user-availbility">
                <h6 className="text-lightgray">@{postUserDetails[0]?.username}</h6>
                <h5 className="text-lightgray greentime">{timeAgo.format(moment(created_at)._d.getTime())}</h5>
              </div>
              <div className="levelbar text-darkwhite level1">
                Level{userVerificationLevel}{" "}
                <h6 className="level1-circle">
                  <span className="text-white lvlstar">{userVerificationLevel}</span>
                </h6>
              </div>
            </div>
          </div>
          <ul className="awards-bar bg-darkgray">
            <li className="text-whitesure">
              <img src="/images/award1.png" alt="awards" />5
            </li>
            <li className="text-whitesure">
              <img src="/images/award2.png" alt="awards" />4
            </li>
            <li className="text-whitesure">
              <img src="/images/award3.png" alt="awards" />6
            </li>
            <li className="text-whitesure">
              <img src="/images/award4.png" alt="awards" />9
            </li>
          </ul>
        </div>
        <div className="user-active-timer">
          <ul>
            <li className="text-green">
              <MdOutlineTimer />
              22hrs 20mins
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PostHead;

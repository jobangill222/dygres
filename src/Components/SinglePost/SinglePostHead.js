import React from "react";
import { MdOutlineTimer } from "react-icons/md";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)



const SinglePostHead = () => {


  return (
    <>
      <div className="user-detail-bar">
        <div className="detailleft">
          <div className="userleftside">
            <div className="avatar-img active">
              <img src="/images/user.png" alt="user-img" />
            </div>
            <div className="user-detail">
              <div className="follow-bar">
                <h4 className="text-secondry">
                  abc
                </h4>
                <button className='followbtn' type='button'>Follow</button>
              </div>


              <div className="user-availbility">
                <h6 className="text-lightgray">@abc</h6>
                <h5 className="text-lightgray greentime">1 hour</h5>
              </div>
              <div className="levelbar text-darkwhite level1">
                Level 0
                <h6 className="level1-circle">
                  <span className="text-white lvlstar">0</span>
                </h6>
              </div>
            </div>
          </div>
          <ul className="awards-bar bg-darkgray">
            <li className="text-whitesure">
              <img src="/gif/thumbsdown2.gif" alt="awards" />5
            </li>
            <li className="text-whitesure">
              <img src="/gif/thumbsdown2.gif" alt="awards" />4
            </li>
            <li className="text-whitesure">
              <img src="/gif/thumbsdown2.gif" alt="awards" />6
            </li>
            <li className="text-whitesure">
              <img src="/gif/thumbsdown2.gif" alt="awards" />9
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

export default SinglePostHead;

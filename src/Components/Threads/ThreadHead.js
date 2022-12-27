import React from 'react'
// import { MdOutlineTimer } from 'react-icons/md';

import { BASE_URL } from '../../Config/index';


import moment from "moment";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export default function ThreadHead(props) {

    const { user, created_at } = props;

    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')

    let userVerificationLevel;
    if (user?.isEmailVerify === 1 && user?.isPhotoVerify === 0) {
        userVerificationLevel = 1;
    }
    else if (user.isPhotoVerify === 1) {
        userVerificationLevel = 2;
    }
    else {
        userVerificationLevel = 0;
    }


    return (
        <>
            <div className="user-detail-bar">
                <div className="detailleft">
                    <div className="userleftside">
                        <div className="avatar-img active">
                            <img src={user?.profileImage ? BASE_URL + `/` + user?.profileImage : `/images/user.png`} alt="user-img" />
                        </div>
                        <div className="user-detail">
                            <div className='follow-bar'>
                                <h4 className="text-secondry">{user?.name ? user?.name : user?.username}</h4>
                                {/* <button className='followbtn' type='button'>Follow</button> */}
                            </div>
                            <div className="user-availbility">
                                <h6 className="text-lightgray">@{user?.username}</h6>
                                <h5 className="text-lightgray redtime">{timeAgo.format(moment(created_at)._d.getTime())}</h5>
                            </div>
                            <div className="levelbar text-darkwhite level2">Level {userVerificationLevel}{" "} <h6 className="level2-circle"><span className="text-white lvlstar">{userVerificationLevel}</span></h6></div>
                        </div>
                    </div>
                </div>
                {/* <div className="user-active-timer">
                    <ul>
                        <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                    </ul>
                </div> */}
            </div>
        </>
    )
}

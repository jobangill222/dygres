import React from 'react'
import moment from "moment";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
// TimeAgo.addDefaultLocale(en)

export default function SingleNotificationHead(props) {

    const { singleNotification } = props;


    //Userlevel verification
    let userVerificationLevel;
    if (singleNotification.fromUserID?.isEmailVerify === 1 && singleNotification.fromUserID?.isPhotoVerify === 0) {
        userVerificationLevel = 1;
    }
    else if (singleNotification.fromUserID?.isPhotoVerify === 1) {
        userVerificationLevel = 2;
    }
    else {
        userVerificationLevel = 0;
    }

    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')

    return (
        <>
            <div className="userleftside">
                <div className="avatar-img active">
                    <img src={singleNotification.fromUserID?.profileImage ? singleNotification.fromUserID?.profileImage : "/images/user.png"} alt="user-img" />
                </div>
                <div className="user-detail">
                    <h4 className="text-secondry">{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</h4>
                    <div className="user-availbility">
                        <h6 className="text-lightgray">@{singleNotification.fromUserID?.username}</h6>
                        <h5 className="text-lightgray greentime">{timeAgo.format(moment(singleNotification.created_at)._d.getTime())}</h5>
                    </div>
                    <div className="levelbar text-darkwhite level1">Level {userVerificationLevel}{" "} <h6 className="level1-circle"><span className="text-white lvlstar">{userVerificationLevel}</span></h6></div>
                </div>
            </div>
        </>
    )
}

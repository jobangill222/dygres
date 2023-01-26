import React, { useEffect, useState } from 'react'
import moment from "moment";
import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
import { useNavigate } from "react-router-dom";
// TimeAgo.addDefaultLocale(en)

export default function SingleNotificationHead(props) {

    const { singleNotification } = props;


    //Userlevel verification


    const [verificationLevelState, setVerificationLevelState] = useState(0);
    //Verification Level
    useEffect(() => {
        setVerificationLevelState(singleNotification.fromUserID?.isEmailVerify === 1 && singleNotification.fromUserID?.isPhotoVerify === 0 ? '1' : singleNotification.fromUserID?.isPhotoVerify === 1 ? "2" : "0");
    }, [singleNotification])


    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')

    const navigate = useNavigate();

    const viewUsersProfile = async (userID) => {
        localStorage.setItem('sessionUserID', userID);
        navigate('/UsersProfile')
    }


    return (
        <>
            <div className="userleftside">
                <div className="avatar-img active">
                    <img src={singleNotification.fromUserID?.profileImage ? singleNotification.fromUserID?.profileImage : "/images/user.png"} alt="user-img" />
                </div>
                <div className="user-detail">
                    <h4 className="text-secondry" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</h4>
                    <div className="user-availbility">
                        <h6 className="text-lightgray">@{singleNotification.fromUserID?.username}</h6>
                        <h5 className="text-lightgray greentime">{timeAgo.format(moment(singleNotification.created_at)._d.getTime())}</h5>
                    </div>
                    <div className="levelbar text-darkwhite level1">Level {verificationLevelState}
                        {/* <h6 className="level1-circle"><span className="text-white lvlstar">{userVerificationLevel}</span></h6> */}
                    </div>
                </div>
            </div>
        </>
    )
}

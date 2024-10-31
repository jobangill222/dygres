import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import moment from "moment";
import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
// TimeAgo.addDefaultLocale(en)
import { verificationLevel } from '../../helper/verificationLevel';

import { DContext } from "../../Context/DContext";


export default function SingleNotificationHead(props) {

    const { singleNotification } = props;

    const { setIsShowRulesModal } = useContext(DContext);


    //Userlevel verification
    const [verificationLevelState, setVerificationLevelState] = useState(0);
    //Verification Level
    useEffect(() => {
        getLevel();
    }, [singleNotification])

    const getLevel = async () => {
        // const res = await verificationLevel(singleNotification.fromUserID?.isEmailVerify, singleNotification.fromUserID?.isPhotoVerify);
        const res = await verificationLevel(singleNotification.fromUserID?.level, singleNotification.fromUserID?.isOfficial);

        setVerificationLevelState(res);
    }

    const verificationtooltip = (
        <Tooltip id="verificationtooltip">
            {/* {user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? 'Verified Email' : user?.isPhotoVerify === 1 ? "Verified Human" : "No Verification"} */}
            {verificationLevelState && verificationLevelState === 4 ? 'Verified official account' : verificationLevelState === 1 ? 'Verified Email' : verificationLevelState === 2 ? "Verified Human" : "New account"}
        </Tooltip>
    );

    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')

    const navigate = useNavigate();

    const viewUsersProfile = async (username) => {
        // localStorage.setItem('sessionUserID', userID);
        navigate('/UsersProfile/' + username)
    }


    const userThoughtToolTip = (
        <Tooltip id="timerOverToolTip">
            {singleNotification.fromUserID?.thoughts ? singleNotification.fromUserID.thoughts : '*crickets*'}
        </Tooltip>
    )


    return (
        <>
            <div className="userleftside">
                <OverlayTrigger placement="top" overlay={userThoughtToolTip}>
                    <div className="avatar-img active">
                        <img src={singleNotification?.fromUserID?.profileImage ? singleNotification.fromUserID?.profileImage : "/images/user.png"} alt="user-img" />
                    </div>
                </OverlayTrigger>
                <div className="user-detail">
                    <h4 className="text-secondry" onClick={() => viewUsersProfile(singleNotification?.fromUserID?.username)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</h4>
                    <div className="user-availbility">
                        <h6 className="text-lightgray">@{singleNotification?.fromUserID?.username}</h6>
                        <h5 className="text-lightgray greentime">{timeAgo.format(moment(singleNotification.created_at)._d.getTime())}</h5>
                    </div>
                    <div className="rules-tag" onClick={() => setIsShowRulesModal(true)}>
                        <OverlayTrigger placement="top" overlay={verificationtooltip}>
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
        </>
    )
}

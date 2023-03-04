import React, { useState, useEffect } from 'react'
// import { MdOutlineTimer } from 'react-icons/md';

import { BASE_URL } from '../../../Config/index';
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';

import moment from "moment";
import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
// TimeAgo.addDefaultLocale(en)
import { verificationLevel } from '../../../helper/verificationLevel';
import { useNavigate } from "react-router-dom";

export default function ThreadHead(props) {

    const navigate = useNavigate();

    const { user, created_at } = props;

    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')

    // let userVerificationLevel;
    // if (user?.isEmailVerify === 1 && user?.isPhotoVerify === 0) {
    //     userVerificationLevel = 1;
    // }
    // else if (user.isPhotoVerify === 1) {
    //     userVerificationLevel = 2;
    // }
    // else {
    //     userVerificationLevel = 0;
    // }



    const [verificationLevelState, setVerificationLevelState] = useState(0);
    //Verification Level
    useEffect(() => {
        getLevel();
    }, [user])

    const getLevel = async () => {
        // const res = await verificationLevel(user?.isEmailVerify, user?.isPhotoVerify);
        const res = await verificationLevel(user?.level, user?.isOfficial);

        setVerificationLevelState(res);
    }


    const verificationtooltip = (
        <Tooltip id="verificationtooltip">
            {/* {user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? 'Verified Email' : user?.isPhotoVerify === 1 ? "Verified Human" : "No Verification"} */}
            {verificationLevelState && verificationLevelState === 4 ? 'Verified official account' : verificationLevelState === 1 ? 'Verified Email' : verificationLevelState === 2 ? "Verified Human" : "New account"}
        </Tooltip>
    );


    const viewUsersProfileFromComments = async (userID) => {
        // localStorage.setItem('sessionUserID', userID);
        navigate('/admin/post/' + userID)
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
                            <div className='follow-bar' onClick={() => viewUsersProfileFromComments(user._id)}>
                                <h4 className="text-secondry">{user?.name ? user?.name : user?.username}</h4>
                                {/* <button className='followbtn' type='button'>Follow</button> */}
                            </div>
                            <div className="user-availbility">
                                <h6 className="text-lightgray">@{user?.username}</h6>
                                <h5 className="text-lightgray redtime">{timeAgo.format(moment(created_at)._d.getTime())}</h5>
                            </div>
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
                {/* <div className="user-active-timer">
                    <ul>
                        <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                    </ul>
                </div> */}
            </div>
        </>
    )
}

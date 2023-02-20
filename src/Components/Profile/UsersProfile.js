import React, { useContext, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import UsersProfileTabs from "./UsersProfileTabs";
import { DContext } from "../../Context/DContext";
import { verificationLevel } from "../../helper/verificationLevel";

import { useParams } from "react-router-dom";

const UsersProfile = () => {

    let { userIDForProfile } = useParams();

    const { getOtherUserDetailByUserIDDContext, setSelectedIDForPopup, setPopupType } = useContext(DContext);

    const [user, setUser] = useState();
    const [userStats, setUserStats] = useState();


    useEffect(() => {
        getData();
    }, [])


    const myFollowers = async () => {
        setPopupType('followers-list');
        setSelectedIDForPopup(user._id)
    }

    const myFollowing = async () => {
        setPopupType('following-list');
        setSelectedIDForPopup(user._id)
    }



    const getData = async () => {
        try {
            //Api call
            // const sessionUserID = localStorage.getItem('sessionUserID');

            const axiosRes = await getOtherUserDetailByUserIDDContext(userIDForProfile);
            console.log("axiosRes==========********* data", axiosRes);
            if (axiosRes.status === "success") {
                setUser(axiosRes.data)
                setUserStats(axiosRes.userStats)
            }
        } catch (error) {
            console.log('err');
        }
    }


    const tooltip = (
        <Tooltip id="tooltip">
            {user?.thoughts ? user.thoughts : "crickets"}
        </Tooltip>
    );


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

    return (
        <>
            {console.log('check,check', user)}
            <div className="profile-feature-image">
                <img src={user && user?.coverImage ? user.coverImage : "/images/feature.png"} alt="feature-img" />
            </div>
            <div className="profile-user-detail">
                <Container>
                    <div className="user-detail-bar">
                        <div className="detailleft">
                            <OverlayTrigger placement="top" overlay={tooltip}>
                                <div className="avatar-img">
                                    <img src={user?.profileImage ? user.profileImage : `/images/u100.png`} alt="user-img" />
                                </div>
                            </OverlayTrigger>

                            <div className="user-detail">

                                <h4 className="text-secondry">{user?.name ? user.name : ""}</h4>
                                <div className="user-availbility">
                                    <h6 className="text-lightgray">@{user?.username}</h6>
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
                                <ul className="user-detail-listing">
                                    <li>
                                        <p className="text-secondry">{userStats?.totalPosts}</p>
                                        <h6 className="text-offwhite">Posts</h6>
                                    </li>
                                    <li onClick={myFollowing}>
                                        <p className="text-secondry">{userStats?.totalFollowing}</p>
                                        <h6 className="text-offwhite">Following</h6>
                                    </li>
                                    <li onClick={myFollowers}>
                                        <p className="text-secondry">{userStats?.totalFollowers}</p>
                                        <h6 className="text-offwhite">Followers</h6>
                                    </li>
                                    <li>
                                        <p className="text-secondry">{userStats?.totalAwards}</p>
                                        <h6 className="text-offwhite">Awards</h6>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className="user-edit-cover">
                            <ul>
                                <li>
                                    {/* <Link to="/"><BsFillImageFill />Edit Cover</Link> */}
                                </li>
                                <li>
                                    {/* <Link to="/editprofile"><BsPencil />Edit profile</Link> */}
                                </li>
                            </ul>
                        </div>
                    </div>

                </Container>
            </div>
            <Container>
                <UsersProfileTabs user={user} />
            </Container>
        </>
    );
}

export default UsersProfile;
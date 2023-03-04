import React, { useContext, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import UsersProfileTabs from "./UsersProfileTabs";
import { DContext } from "../../Context/DContext";
import { verificationLevel } from "../../helper/verificationLevel";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import { useParams } from "react-router-dom";
import Loader from "../Loader";

const UsersProfile = () => {

    let { userIDForProfile } = useParams();

    const { getOtherUserDetailByUserIDDContext, setSelectedIDForPopup, setPopupType, setIsShowRulesModal, isLoading, setIsLoading } = useContext(DContext);

    const [user, setUser] = useState();
    const [userStats, setUserStats] = useState();


    useEffect(() => {

        //Hide userlist modal
        setSelectedIDForPopup(null);
        setPopupType(null)

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


    const [isUserDeletedState, setIsUserDeletedState] = useState(0);


    const getData = async () => {
        try {
            setIsLoading(true);
            //Api call
            // const sessionUserID = localStorage.getItem('sessionUserID');

            const axiosRes = await getOtherUserDetailByUserIDDContext(userIDForProfile);
            console.log("axiosRes==========********* data", axiosRes);
            if (axiosRes.status === "success") {
                if (axiosRes.data.isDeleted === 1) {
                    setIsUserDeletedState(1)
                } else {
                    setIsUserDeletedState(2)
                }
                setUser(axiosRes.data)
                setUserStats(axiosRes.userStats)
            }
            setIsLoading(false);

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

            {isLoading && <Loader />}
            {/* {console.log('check,check', user)} */}
            {isUserDeletedState === 1 ?
                <div className="notfound">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="notfound-content">
                                    <h2>404</h2>
                                    <h4>Opps! User Not Found</h4>
                                    <p>Sorry, the user you're looking for doesn't exist.</p>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                : isUserDeletedState === 2 ?
                    <>
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
                    : null
            }

        </>
    );
}

export default UsersProfile;
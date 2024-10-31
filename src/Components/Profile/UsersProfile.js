import React, { useContext, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import UsersProfileTabs from "./UsersProfileTabs";
import { DContext } from "../../Context/DContext";
import { verificationLevel } from "../../helper/verificationLevel";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const UsersProfile = () => {

    const navigate = useNavigate();

    let { userIDForProfile } = useParams();

    const { user, getOtherUserDetailByUserIDDContext, setSelectedIDForPopup, setPopupType, setIsShowRulesModal, isLoading, setIsLoading, postList, setPostList, followUserDContext, unFollowUserDContext, setUserStats, isFollowOnUserProfileState, setIsFollowOnUserProfileState, othetUserStats, setOtherUserStats } = useContext(DContext);

    const [otherUser, setOtherUser] = useState();

    useEffect(() => {

        //Make userlst modal type and id null
        setSelectedIDForPopup(null);
        setPopupType(null)

        //if My profile
        if (user.username === userIDForProfile) {
            navigate("/profile");
        } else {
            getData();
        }

    }, [userIDForProfile])


    const followersList = async () => {
        setPopupType('followers-list');
        setSelectedIDForPopup(otherUser._id)
    }

    const followingList = async () => {
        setPopupType('following-list');
        setSelectedIDForPopup(otherUser._id)
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
                setOtherUser(axiosRes.data)
                setOtherUserStats(axiosRes.userStats)
            }
            setIsLoading(false);

        } catch (error) {
            console.log('err');
        }
    }


    const tooltip = (
        <Tooltip id="tooltip">
            {otherUser?.thoughts ? otherUser.thoughts : "*crickets*"}
        </Tooltip>
    );


    const [verificationLevelState, setVerificationLevelState] = useState(0);
    //Verification Level
    useEffect(() => {
        getLevel();
    }, [otherUser])

    const getLevel = async () => {
        // const res = await verificationLevel(user?.isEmailVerify, user?.isPhotoVerify);
        const res = await verificationLevel(otherUser?.level, otherUser?.isOfficial);

        setVerificationLevelState(res);
    }


    const verificationtooltip = (
        <Tooltip id="verificationtooltip">
            {/* {user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? 'Verified Email' : user?.isPhotoVerify === 1 ? "Verified Human" : "No Verification"} */}
            {verificationLevelState && verificationLevelState === 4 ? 'Verified official account' : verificationLevelState === 1 ? 'Verified Email' : verificationLevelState === 2 ? "Verified Human" : "New account"}
        </Tooltip>
    );



    // When is_follow change or new list come then set in state
    useEffect(() => {
        if (otherUser?.is_follow === 1) {
            setIsFollowOnUserProfileState(1);
        } else {
            setIsFollowOnUserProfileState(0);
        }
    }, [otherUser?.is_follow]);



    //Follow to user and update post Listing
    const followUser = async () => {
        let newPostList = postList;
        postList.forEach((post, index) => {
            if (post.userID === otherUser?._id) {
                console.log('condition hit of follow user');
                newPostList[index] = { ...post, is_follow: 1 }
            }
        })
        setPostList([...newPostList, { ...newPostList[0] }]);
        // setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)
        setTimeout(() => setPostList((prevState) => prevState.slice(0, -1)), 100)

        setIsFollowOnUserProfileState(1);


        //Update my stats
        setUserStats((previousState) => {
            return {
                ...previousState,
                totalFollowing: previousState.totalFollowing + 1,
            };
        });

        //Update other user stats
        setOtherUserStats((previousState) => {
            return {
                ...previousState,
                totalFollowers: previousState.totalFollowers + 1,
            };
        });

        await followUserDContext(otherUser?._id);
    }


    //Un-follow user and update Post Listing
    const UnfollowUser = async () => {
        let newPostList = postList;
        postList.forEach((post, index) => {
            if (post.userID === otherUser?._id) {
                console.log('condition hit of unfollow user');
                newPostList[index] = { ...post, is_follow: 0 }
            }
        })
        setPostList([...newPostList, { ...newPostList[0] }]);
        // setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)
        setTimeout(() => setPostList((prevState) => prevState.slice(0, -1)), 100)

        setIsFollowOnUserProfileState(0);


        //Update my stats
        setUserStats((previousState) => {
            return {
                ...previousState,
                totalFollowing: previousState.totalFollowing - 1,
            };
        });

        //Update other user stats
        setOtherUserStats((previousState) => {
            return {
                ...previousState,
                totalFollowers: previousState.totalFollowers - 1,
            };
        });

        await unFollowUserDContext(otherUser?._id);
    }

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
                            <img src={otherUser && otherUser?.coverImage ? otherUser.coverImage : "/images/feature.png"} alt="feature-img" />
                        </div>
                        <div className="profile-user-detail">
                            <Container>
                                <div className="user-detail-bar">
                                    <div className="detailleft user_profile">
                                        <OverlayTrigger placement="top" overlay={tooltip}>
                                            <div className="avatar-img">
                                                <img src={otherUser?.profileImage ? otherUser.profileImage : `/images/u100.png`} alt="user-img" />
                                            </div>
                                        </OverlayTrigger>

                                        <div className="user-detail">

                                            <h4 className="text-secondry">{otherUser?.name ? otherUser.name : ""}</h4>
                                            <div className="user-availbility">
                                                <h6 className="text-lightgray">@{otherUser?.username}</h6>
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
                                                    <p className="text-secondry">{othetUserStats?.totalPosts}</p>
                                                    <h6 className="text-offwhite">Posts</h6>
                                                </li>
                                                <li onClick={followingList}>
                                                    <p className="text-secondry">{othetUserStats?.totalFollowing}</p>
                                                    <h6 className="text-offwhite">Following</h6>
                                                </li>
                                                <li onClick={followersList}>
                                                    <p className="text-secondry">{othetUserStats?.totalFollowers}</p>
                                                    <h6 className="text-offwhite">Followers</h6>
                                                </li>
                                                <li>
                                                    <p className="text-secondry">{othetUserStats?.totalAwards}</p>
                                                    <h6 className="text-offwhite">Awards</h6>
                                                </li>
                                                <li>
                                                    <div className="follow-bar">
                                                        {isFollowOnUserProfileState === 0 && <button className='followbtn' onClick={followUser} type='button'>Follow</button>}
                                                        {isFollowOnUserProfileState === 1 && <button className='followbtn' onClick={UnfollowUser} type='button'>Unfollow</button>}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                   
                                </div>

                            </Container>
                        </div>
                        <Container>
                            <UsersProfileTabs otherUser={otherUser} />
                        </Container>
                    </>
                    : null
            }

        </>
    );
}

export default UsersProfile;
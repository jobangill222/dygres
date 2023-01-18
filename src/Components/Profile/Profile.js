import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import { BsFillImageFill, BsPencil } from 'react-icons/bs';
import ProfileTabs from "./ProfileTabs";
import { Link } from "react-router-dom";
import { DContext } from "../../Context/DContext";

const Profile = () => {

    const { user, userStats } = useContext(DContext);

    const tooltip = (
        <Tooltip id="tooltip">
            {user?.thoughts ? user.thoughts : "No thoughts"}
        </Tooltip>
    );

    // console.log('user', user)


    return (
        <>
            <div className="profile-feature-image">
                <img src="/images/feature.png" alt="feature-img" />
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
                                {console.log('useruseruser', user)}
                                <div className="levelbar text-darkwhite level1">Level {user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? '1' : user?.isPhotoVerify === 1 ? "2" : "0"}
                                    <h6 className="level1-circle"><span className="text-white lvlstar">{user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? '1' : user?.isPhotoVerify === 1 ? "2" : "0"}</span></h6></div>
                                <ul className="user-detail-listing">
                                    <li>
                                        <p className="text-secondry">{userStats?.totalPosts}</p>
                                        <h6 className="text-offwhite">Posts</h6>
                                    </li>
                                    <li>
                                        <p className="text-secondry">{userStats?.totalFollowing}</p>
                                        <h6 className="text-offwhite">Following</h6>
                                    </li>
                                    <li>
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
                                    <Link to="/"><BsFillImageFill />Edit Cover</Link>
                                </li>
                                <li>
                                    <Link to="/editprofile"><BsPencil />Edit profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </Container>
            </div>
            <Container>
                <ProfileTabs user={user} />
            </Container>
        </>
    );
}

export default Profile;
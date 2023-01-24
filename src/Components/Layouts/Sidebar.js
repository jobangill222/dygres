import React, { useContext, useState, useEffect } from "react";
import { BsPencil, BsFileMedicalFill, BsBell } from 'react-icons/bs';
import { BiSearch, BiLayerMinus } from 'react-icons/bi';
import { MdHowToVote, MdOutlineWhatshot } from 'react-icons/md';
import { Link } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import { useNavigate } from "react-router-dom";
// import UserListModal from "../Modals/UserListModal";

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, userStats, setSelectedIDForPopup, setPopupType } = useContext(DContext);

    const tooltip = (
        <Tooltip id="tooltip">
            {user?.thoughts ? user.thoughts : "crickets"}
        </Tooltip>
    );

    // console.log('user', user);

    const openViewProfile = async () => {
        navigate("/profile");
    }



    const myFollowers = async () => {
        setPopupType('followers-list');
        setSelectedIDForPopup(user._id)
    }

    const myFollowing = async () => {
        setPopupType('following-list');
        setSelectedIDForPopup(user._id)
    }

    return (
        <>

            <div className="sidebar-profile">
                <div className="feature-image">
                    <img src="/images/feature-img.png" alt="feature-img" />
                    <div className="edit-bar">
                        {/* <input type="file" className="uploadimg-input" /> */}
                        <Link to="/profile">
                            <BsPencil className="text-primary" />
                        </Link>
                    </div>
                </div>
                <div className="User-detail">
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <div className="usermain-img">
                            <img src={user?.profileImage ? user.profileImage : `/images/user-120.png`} alt="user-main-img" />
                        </div>
                    </OverlayTrigger>
                    <ul className="user-detail-listing">
                        <li onClick={openViewProfile}>
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
                    <h4 className="text-secondry username text-center">{user ? user?.name : user?.username}</h4>
                    {/* <h4 className="text-secondry username text-center">Amanpreet</h4> */}

                    <ul className="user-detaiting-listing">
                        {/* <li>UI/UX Designer <img src="/images/ui-ux.png" alt="icons" /></li>
                        <li>Workoholic <img src="/images/workholic.png" alt="icons" /></li>
                        <li>Begginer <img src="/images/beginer.png" alt="icons" /></li> */}
                        <li>{user?.bio ? user.bio : 'No bio'}</li>
                    </ul>
                    <div className="search-input-form">
                        <form className="user-searchform">
                            <input type="text" className="bg-gray" placeholder="Search" />
                            <button className="bg-lightgray text-lightgray"><BiSearch /></button>
                        </form>
                    </div>
                </div>
                {/* Menu start here */}
                <ul className="sidebar-menu">
                    <li><Link exact to="/new"><BsFileMedicalFill /> New</Link></li>
                    <li><Link to="/hot"><MdOutlineWhatshot />Hot</Link></li>
                    <li><Link to="/most-voted"><MdHowToVote />Most Votes</Link></li>
                    <li><Link to="/not-voted"><BiLayerMinus />Least Votes</Link></li>
                    <li><Link to="/notification"><BsBell />Notifications</Link></li>
                </ul>
                {/* Menu ends here */}
            </div>
        </>
    );
}

export default Sidebar;
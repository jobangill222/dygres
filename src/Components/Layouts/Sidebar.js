import React, { useContext } from "react";
import { BsPencil, BsFileMedicalFill, BsBell } from 'react-icons/bs';
import { BiSearch, BiLayerMinus } from 'react-icons/bi';
import { MdHowToVote, MdOutlineWhatshot } from 'react-icons/md';
import { Link } from "react-router-dom";
import { DContext } from "../../Context/DContext";

const Sidebar = () => {

    const { user, userStats } = useContext(DContext);

    return (
        <>
            <div className="sidebar-profile">
                <div className="feature-image">
                    <img src="/images/feature-img.png" alt="feature-img" />
                    <div className="edit-bar">
                        {/* <input type="file" className="uploadimg-input" /> */}
                        <Link to="/editprofile">
                            <BsPencil className="text-primary" />
                        </Link>
                    </div>
                </div>
                <div className="User-detail">
                    <div className="usermain-img">
                        <img src={user?.profileImage ? user.profileImage : `/images/user-120.png`} alt="user-main-img" />
                    </div>
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
                            <p className="text-secondry">578</p>
                            <h6 className="text-offwhite">Awards</h6>
                        </li>
                    </ul>
                    <h4 className="text-secondry username text-center">Amanpreet Singh</h4>
                    <ul className="user-detaiting-listing">
                        <li>UI/UX Designer <img src="/images/ui-ux.png" alt="icons" /></li>
                        <li>Workoholic <img src="/images/workholic.png" alt="icons" /></li>
                        <li>Begginer <img src="/images/beginer.png" alt="icons" /></li>
                    </ul>
                    <div className="search-input-form">
                        <form className="user-searchform">
                            <input type="text" className="bg-gray" placeholder="Search users...." />
                            <button className="bg-lightgray text-lightgray"><BiSearch /></button>
                        </form>
                    </div>
                </div>
                {/* Menu start here */}
                <ul className="sidebar-menu">
                    <li><Link exact to="/new"><BsFileMedicalFill /> New</Link></li>
                    <li><Link to="/most-voted"><MdHowToVote />Most Voted</Link></li>
                    <li><Link to="/hot"><MdOutlineWhatshot />hot</Link></li>
                    <li><Link to="/not-voted"><BiLayerMinus />not voted</Link></li>
                    <li><Link to="/notification"><BsBell />notification</Link></li>
                </ul>
                {/* Menu ends here */}
            </div>
        </>
    );
}

export default Sidebar;
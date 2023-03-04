import React, { useContext, useState, useEffect } from 'react'
import { BASE_URL } from '../../../Config/index';
// import { DContext } from "../../../Context/DContext";
import { useNavigate } from "react-router-dom";

export default function SingleUserList(props) {

    const navigate = useNavigate();

    //props
    const { userListing } = props;


    const viewUsersProfileFromListing = async (userID) => {
        // localStorage.setItem('sessionUserID', userID);
        navigate('/admin/post/' + userID)
    }

    return (
        <>

            <ul key={userListing?.user?._id} className="aggree-li">
                <li>
                    <img src={userListing?.user?.profileImage ? userListing.user?.profileImage : `/images/user.png`} alt="userimg" />
                    <div className="user-del cursor-pointer" onClick={() => viewUsersProfileFromListing(userListing.user._id)} >
                        <h4>{userListing.user.name ? userListing.user.name : userListing.user.username}</h4>
                        <h6>@{userListing?.user?.username}</h6>
                    </div>
                </li>
            </ul>

        </>
    )
}

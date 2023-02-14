import React, { useContext, useState, useEffect } from 'react'
import { BASE_URL } from '../../../Config/index';
// import { DContext } from "../../../Context/DContext";

export default function SingleUserList(props) {

    //props
    const { userListing } = props;

    return (
        <>

            <ul key={userListing?.user?._id} className="aggree-li">
                <li>
                    <img src={userListing.user?.profileImage ? BASE_URL + `/` + userListing.user?.profileImage : `/images/user.png`} alt="userimg" />
                    <div className="user-del">
                        <h4>{userListing.user.name ? userListing.user.name : userListing.user.username}</h4>
                        <h6>@{userListing?.user?.username}</h6>
                    </div>
                </li>
            </ul>

        </>
    )
}

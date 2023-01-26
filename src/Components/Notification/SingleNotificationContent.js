import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function SingleNotificationContent(props) {

    const { singleNotification } = props;

    const navigate = useNavigate();

    const viewUsersProfile = async (userID) => {
        localStorage.setItem('sessionUserID', userID);
        navigate('/UsersProfile')
    }


    const viewPost = async (postID) => {
        localStorage.setItem('PostIdForSinglePost', postID);
        navigate('/SinglePostDetail')
    }



    return (
        <>
            {
                singleNotification.actionPerformed === "tag_in_post" ?
                    <>
                        <div>
                            <p onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                            <p className="notify">tag you in a post</p>
                            <p onClick={() => viewPost(singleNotification?.postID)}>post</p>
                        </div>
                    </>
                    :
                    singleNotification.actionPerformed === "follow" ?
                        <>
                            <div>
                                <p onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                <p className="notify">start following you.</p>
                            </div>
                        </>
                        :
                        singleNotification.actionPerformed === "agree_post" ?
                            <>
                                <div>
                                    <p onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                    <p className="notify">agree with your</p>
                                    <p onClick={() => viewPost(singleNotification?.postID)}>post</p>
                                </div>
                            </>
                            :
                            singleNotification.actionPerformed === "disagree_post" ?
                                <>
                                    <div>
                                        <p onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                        <p className="notify">disagree with your</p>
                                        <p onClick={() => viewPost(singleNotification?.postID)}>post</p>
                                    </div>
                                </>
                                // :
                                // singleNotification.actionPerformed === "comment_on_post" ?
                                //     <>
                                //         <div>
                                //             <p onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                //             <p className="notify">comment on your</p>
                                //             <p onClick={() => viewPost(singleNotification?.postID)}>post</p>
                                //         </div>
                                //     </>
                                //     :
                                //     singleNotification.actionPerformed === "agree_comment" ?
                                //         <>
                                //             <div>
                                //                 <p onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                //                 <p className="notify">agree with your comment.</p>
                                //                 <p onClick={() => viewPost(singleNotification?.postID)}>view post</p>
                                //             </div>
                                //         </>
                                //         :
                                //         singleNotification.actionPerformed === "disagree_comment" ?
                                //             <>
                                //                 <div>
                                //                     <p onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                //                     <p className="notify">disagree with your comment.</p>
                                //                     <p onClick={() => viewPost(singleNotification?.postID)}>view post</p>
                                //                 </div>
                                //             </>
                                : ''
            }

        </>
    )
}

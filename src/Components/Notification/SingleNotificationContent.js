import React from 'react'
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
                        <div className='notification-text'>
                            <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                            <p>tag you in a </p>
                            <p className="notify" onClick={() => viewPost(singleNotification?.postID)}>post.</p>
                        </div>
                    </>
                    :
                    singleNotification.actionPerformed === "follow" ?
                        <>
                            <div className='notification-text'>
                                <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                <p>start following you.</p>
                            </div>
                        </>
                        :
                        singleNotification.actionPerformed === "agree_post" ?
                            <>
                                <div className='notification-text'>
                                    <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                    <p>agree with your</p>
                                    <p className="notify" onClick={() => viewPost(singleNotification?.postID)}>post.</p>
                                </div>
                            </>
                            :
                            singleNotification.actionPerformed === "disagree_post" ?
                                <>
                                    <div className='notification-text'>
                                        <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                        <p>disagree with your</p>
                                        <p className="notify" onClick={() => viewPost(singleNotification?.postID)}>post.</p>
                                    </div>
                                </>
                                // :
                                // singleNotification.actionPerformed === "comment_on_post" ?
                                //     <>
                                //         <div className='notification-text'>
                                //             <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                //             <p>comment on your</p>
                                //             <p onClick={() => viewPost(singleNotification?.postID)}>post</p>
                                //         </div>
                                //     </>
                                //     :
                                //     singleNotification.actionPerformed === "agree_comment" ?
                                //         <>
                                //             <div className='notification-text'>
                                //                 <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                //                 <p>agree with your comment.</p>
                                //                 <p onClick={() => viewPost(singleNotification?.postID)}>view post</p>
                                //             </div>
                                //         </>
                                //         :
                                //         singleNotification.actionPerformed === "disagree_comment" ?
                                //             <>
                                //                 <div className='notification-text'>
                                //                     <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                //                     <p>disagree with your comment.</p>
                                //                     <p onClick={() => viewPost(singleNotification?.postID)}>view post</p>
                                //                 </div>
                                //             </>
                                : ''
            }

        </>
    )
}

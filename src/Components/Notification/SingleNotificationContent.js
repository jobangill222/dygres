import React from 'react'
import { useNavigate } from "react-router-dom";
export default function SingleNotificationContent(props) {

    const { singleNotification } = props;

    const navigate = useNavigate();

    const viewUsersProfile = async (userID) => {
        // localStorage.setItem('sessionUserID', userID);
        navigate('/UsersProfile/' + userID)
    }


    const viewPost = async (postID) => {
        navigate('/SinglePostDetail/' + postID)
    }


    const viewPostSpecificCommentFirst = async (postID, commentID) => {
        navigate('/SinglePostDetail/' + postID + '/' + commentID)
    }



    return (
        <>
            {
                singleNotification.actionPerformed === "tag_in_post" ?
                    <>
                        <div className='notification-text'>
                            <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                            <p>tagged you in a </p>
                            <p className="notify" onClick={() => viewPost(singleNotification?.postID)}>dygression!</p>
                        </div>
                    </>
                    :
                    singleNotification.actionPerformed === "follow" ?
                        <>
                            <div className='notification-text'>
                                <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                <p>is now following you!</p>
                            </div>
                        </>
                        :
                        singleNotification.actionPerformed === "agree_post" ?
                            <>
                                <div className='notification-text'>
                                    <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                    <p>agrees with your</p>
                                    <p className="notify" onClick={() => viewPost(singleNotification?.postID)}>dygression.</p>
                                </div>
                            </>
                            :
                            singleNotification.actionPerformed === "disagree_post" ?
                                <>
                                    <div className='notification-text'>
                                        <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                        <p>disagrees with your</p>
                                        <p className="notify" onClick={() => viewPost(singleNotification?.postID)}>dygression.</p>
                                    </div>
                                </>
                                :
                                singleNotification.actionPerformed === "got_award" ?
                                    <>
                                        <div className='notification-text'>
                                            <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                            <p>has given your</p>
                                            <p className="notify" onClick={() => viewPost(singleNotification?.postID)}>dygression</p>
                                            <p>an award</p>
                                            <img src={singleNotification?.awards?.image}></img>
                                        </div>
                                    </>
                                    :
                                    singleNotification.actionPerformed === "comment_on_post" ?
                                        <>
                                            <div className='notification-text'>
                                                <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                                <p>comment on your</p>
                                                <p className="notify" onClick={() => viewPostSpecificCommentFirst(singleNotification?.postID, singleNotification?.commentID)}>dygression</p>
                                            </div>
                                        </>
                                        :
                                        singleNotification.actionPerformed === "agree_comment" ?
                                            <>
                                                <div className='notification-text'>
                                                    <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                                    <p>agrees with your</p>
                                                    <p className="notify" onClick={() => viewPostSpecificCommentFirst(singleNotification?.postID, singleNotification?.commentID)}>dygression</p>
                                                    <p>comment.</p>
                                                </div>
                                            </>
                                            :
                                            singleNotification.actionPerformed === "disagree_comment" ?
                                                <>
                                                    <div className='notification-text'>
                                                        <p className="notify" onClick={() => viewUsersProfile(singleNotification?.fromUserID._id)}>{singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username}</p>
                                                        <p>disagrees with your</p>
                                                        <p className="notify" onClick={() => viewPostSpecificCommentFirst(singleNotification?.postID, singleNotification?.commentID)}>dygression</p>
                                                        <p>comment.</p>
                                                    </div>
                                                </>
                                                : ''
            }

        </>
    )
}

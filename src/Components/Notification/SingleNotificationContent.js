import React, { useEffect, useState } from 'react'

export default function SingleNotificationContent(props) {

    const { singleNotification } = props;

    const [notificationMessage, setNotificationMessage] = useState("");


    useEffect(() => {
        var name;
        var text;

        if (singleNotification.actionPerformed == "tag_in_post") {
            name = singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username;
            text = "tag you in a post.";
            setNotificationMessage(name + " " + text)
        }
        else if (singleNotification.actionPerformed == "follow") {
            name = singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username;
            text = "start follow you.";
            setNotificationMessage(name + " " + text)
        }
        else if (singleNotification.actionPerformed == "agree_post") {
            name = singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username;
            text = "agree with your post.";
            setNotificationMessage(name + " " + text)
        }
        else if (singleNotification.actionPerformed == "disagree_post") {
            name = singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username;
            text = "disagree with your post.";
            setNotificationMessage(name + " " + text)
        }
        else if (singleNotification.actionPerformed == "comment_on_post") {
            name = singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username;
            text = "comment on your post.";
            setNotificationMessage(name + " " + text)
        }
        else if (singleNotification.actionPerformed == "agree_comment") {
            name = singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username;
            text = "agree with your comment.";
            setNotificationMessage(name + " " + text)
        }
        else if (singleNotification.actionPerformed == "disagree_comment") {
            name = singleNotification.fromUserID?.name ? singleNotification.fromUserID?.name : singleNotification.fromUserID?.username;
            text = "disagree with your comment.";
            setNotificationMessage(name + " " + text)
        }
        else {
            setNotificationMessage('sss');
        }
    })


    return (
        <>
            <p className="notify">{notificationMessage}</p>
        </>
    )
}

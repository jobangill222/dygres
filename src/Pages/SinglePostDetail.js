import React, { useEffect, useContext, useState } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import { toast } from "react-toastify";

// Import Modals
import UserListModal from "../Components/Modals/UserListModal";
import ViewPostsAwardModal from "../Components/Modals/ViewPostsAwardModal";
import RetweetModal from "../Components/Modals/RetweetModal";

const MostVoted = () => {

    const { getSinglePostDetailDContext, postList, setPostList, selectedIDForPopup, postIDForAwardOfPost, postIDForRetweet } = useContext(DContext);

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getPostDetail();
    }, []);

    const getPostDetail = async () => {
        try {
            //Api call
            const postID = "63c548a229cbcf4c40a86695";
            const axiosRes = await getSinglePostDetailDContext(postID);
            console.log("axiosRes******** after get hashtag posts", axiosRes);
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
            else {
                toast(axiosRes.message);
            }
        } catch (err) {
            console.log(err);
        }
    };



    // Change state when click on count of agree disagree etc and change popupstate to true to open
    const [popupOpenStatus, setPopupOpenStatus] = useState(false);
    useEffect(() => {
        if (selectedIDForPopup) {
            setPopupOpenStatus(true);
        }
    }, [selectedIDForPopup])

    const [viewMoreAwardOfPost, setViewMoreAwardOfPost] = useState(false);
    useEffect(() => {
        if (postIDForAwardOfPost) {
            setViewMoreAwardOfPost(true);
        }
    }, [postIDForAwardOfPost])

    const [viewRetweetPopup, setViewRetweetPopup] = useState(false);
    useEffect(() => {
        if (postIDForRetweet) {
            setViewRetweetPopup(true);
        }
    }, [postIDForRetweet])

    return (
        <>


            {/* Modal */}
            {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}

            {viewMoreAwardOfPost && <ViewPostsAwardModal viewMoreAwardOfPost={viewMoreAwardOfPost} setViewMoreAwardOfPost={setViewMoreAwardOfPost} />}

            {viewRetweetPopup && <RetweetModal viewRetweetPopup={viewRetweetPopup} setViewRetweetPopup={setViewRetweetPopup} />}

            <h4 className="pagetitle">Post Detail</h4>

            {
                postList.length ?
                    postList.map((post) => (
                        <DigitalTabContent
                            key={post._id}
                            post={post}
                        />
                    ))
                    :
                    <div className="empty-bar">
                        <img src="/images/empty.png" alt='dummy' />
                        <h4>No Post</h4>
                    </div>
            }
        </>
    );
}

export default MostVoted;
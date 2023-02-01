import React, { useEffect, useContext, useState } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

// Import Modals
import UserListModal from "../Components/Modals/UserListModal";
import ViewPostsAwardModal from "../Components/Modals/ViewPostsAwardModal";
import RetweetModal from "../Components/Modals/RetweetModal";

const MostVoted = () => {

    const { popupType, getSinglePostDetailDContext, postList, setPostList, postIDForAwardOfPost, postIDForRetweet, isLoading, setIsLoading, postIDForSinglePostState, setSearchState } = useContext(DContext);


    useEffect(() => {
        setSearchState(null)
        // localStorage.setItem("currentPage", 1);
        getPostDetail();
    }, [postIDForSinglePostState]);

    const getPostDetail = async () => {
        try {
            setIsLoading(true);
            //Api call
            const PostIdForSinglePost = localStorage.getItem('PostIdForSinglePost');

            // const postID = "63c7c179d5618a6185825361";
            const axiosRes = await getSinglePostDetailDContext(PostIdForSinglePost);
            console.log("axiosRes******** after get hashtag posts", axiosRes);
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
            else {
                toast(axiosRes.message);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };



    // Change state when click on count of agree disagree etc and change popupstate to true to open
    const [popupOpenStatus, setPopupOpenStatus] = useState(false);
    useEffect(() => {
        if (popupType) {
            setPopupOpenStatus(true);
        }
    }, [popupType])

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
            {isLoading && <Loader />}

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
                            postListingType='singlePost'
                        />
                    ))
                    :
                    <div className="empty-bar">
                        <img src="/images/empty.png" alt='dummy' />
                        <h4>No Posts</h4>
                    </div>
            }
        </>
    );
}

export default MostVoted;
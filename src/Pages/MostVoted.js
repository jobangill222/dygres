import React, { useEffect, useContext, useState } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader";

// Import Modals
import UserListModal from "../Components/Modals/UserListModal";
import ViewPostsAwardModal from "../Components/Modals/ViewPostsAwardModal";
import { useNavigate } from "react-router-dom";
// import RetweetModal from "../Components/Modals/RetweetModal";

const MostVoted = () => {

    const { popupType, getMostVotedPostDContext, postList, setPostList, postIDForAwardOfPost, isLoading, setIsLoading, setSearchState,isDummyUser } = useContext(DContext);
    const navigate = useNavigate();
    useEffect(() => {
 
        setSearchState(null)

        localStorage.setItem("currentPage", 1);
        getMostVotedPosts();
    }, []);

    const getMostVotedPosts = async () => {
        try {
            setIsLoading(true);
            //Api call
            let pageNumberOfPostList = 1;
            const search = null;
            const axiosRes = await getMostVotedPostDContext(search, pageNumberOfPostList);
            // console.log("axiosRes******** after get most votes posts", axiosRes);
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };


    //Append next post list
    const appendNextList = async () => {
        let currentPage = localStorage.getItem("currentPage");
        let pageNumberOfPostList = parseInt(currentPage) + 1;
        // console.log("appendNextList function call", pageNumberOfPostList);
        const search = null;
        const axiosRes = await getMostVotedPostDContext(search, pageNumberOfPostList);
        // console.log(
        //     "axiosRes********* after get most voted posts on page",
        //     pageNumberOfPostList,
        //     axiosRes
        // );
        if (axiosRes.status === "success") {
            setPostList((current) => [...current, ...axiosRes.list]);
            localStorage.setItem("currentPage", pageNumberOfPostList);
        }
    };



    // Change state when click on award in foot section and change popupstate to true to open
    // const [awardPopupOpenStatus, setAwardPopupOpenStatus] = useState(false);
    // useEffect(() => {
    //     if (selectedPostIDForAwardPopup) {
    //         setAwardPopupOpenStatus(true);
    //     }
    // }, [selectedPostIDForAwardPopup])

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


    return (
        <>
            {isLoading && <Loader />}

            <InfiniteScroll
                dataLength={postList.length}
                next={appendNextList}
                hasMore={true}
            >
                {/* {postList} */}
            </InfiniteScroll>

            {/* Modal */}
            {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}

            {viewMoreAwardOfPost && <ViewPostsAwardModal viewMoreAwardOfPost={viewMoreAwardOfPost} setViewMoreAwardOfPost={setViewMoreAwardOfPost} />}

            {/* {viewRetweetPopup && <RetweetModal viewRetweetPopup={viewRetweetPopup} setViewRetweetPopup={setViewRetweetPopup} />} */}

            <h4 className="pagetitle">Most Voted</h4>

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
                        <h4>No Posts</h4>
                    </div>
            }
        </>
    );
}

export default MostVoted;
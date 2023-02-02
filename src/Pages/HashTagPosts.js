import React, { useEffect, useContext, useState } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader";

// Import Modals
import UserListModal from "../Components/Modals/UserListModal";
import ViewPostsAwardModal from "../Components/Modals/ViewPostsAwardModal";
import RetweetModal from "../Components/Modals/RetweetModal";

const HashTagPosts = () => {

    const { popupType, getpostsByHashTagDContext, postList, setPostList, postIDForAwardOfPost, postIDForRetweet, isLoading, setIsLoading, hashTagClickState, setHashTagClickState } = useContext(DContext);

    useEffect(() => {
        // setPostList([]);
        localStorage.setItem("currentPage", 1);
        getposts();
        setHashTagClickState(false);

    }, [hashTagClickState]);

    const getposts = async () => {
        try {
            setIsLoading(true);
            //Api call
            let pageNumberOfPostList = 1;

            const hashtagName = localStorage.getItem('hashTagName')
            const search = null;
            const axiosRes = await getpostsByHashTagDContext(search, hashtagName, pageNumberOfPostList);
            console.log("axiosRes******** after get hashtag posts", axiosRes);
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
            else {
                setPostList([]);
            }
            setIsLoading(false);
            //Move to top
            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
        }
    };


    //Append next post list
    const appendNextList = async () => {
        let currentPage = localStorage.getItem("currentPage");
        let pageNumberOfPostList = parseInt(currentPage) + 1;
        // console.log("appendNextList function call", pageNumberOfPostList);


        const hashtagName = localStorage.getItem('hashTagName')
        const search = null;
        const axiosRes = await getpostsByHashTagDContext(search, hashtagName, pageNumberOfPostList);
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

    const [viewRetweetPopup, setViewRetweetPopup] = useState(false);
    useEffect(() => {
        if (postIDForRetweet) {
            setViewRetweetPopup(true);
        }
    }, [postIDForRetweet])

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

            {viewRetweetPopup && <RetweetModal viewRetweetPopup={viewRetweetPopup} setViewRetweetPopup={setViewRetweetPopup} />}

            <h4 className="pagetitle">HashTag</h4>

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

export default HashTagPosts;
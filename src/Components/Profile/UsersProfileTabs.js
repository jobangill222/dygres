import React, { useEffect, useContext, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersAbout from "./UsersAbout";
// import ProfileTabTimeline from "./ProfileTabTimeline";
import { DContext } from "../../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import DigitalTabContent from "../DigitalTabContent";
import UserListModal from "../Modals/UserListModal";
import ViewPostsAwardModal from "../Modals/ViewPostsAwardModal";
import RetweetModal from "../Modals/RetweetModal";

import Loader from "../Loader";
import { useParams } from "react-router-dom";

const UsersProfileTabs = (props) => {

    let { userIDForProfile } = useParams();

    const { otherUser } = props;

    const { postList, popupType, setPostList, getOtherUserPostsByUserIDDContext, postIDForAwardOfPost, isLoading, setIsLoading } = useContext(DContext);

    useEffect(() => {

        //Hide popup
        setPopupOpenStatus(false)

        // setPostList([]);
        localStorage.setItem("currentPage", 1);
        getMyPosts();
    }, [userIDForProfile])

    const getMyPosts = async () => {
        // console.log('sss');
        try {
            setIsLoading(true);
            //Api call
            let pageNumberOfPostList = 1;
            // const userID = "newuse1r674";
            // const sessionUserID = localStorage.getItem('sessionUserID');
            const axiosRes = await getOtherUserPostsByUserIDDContext(userIDForProfile, pageNumberOfPostList);
            // console.log("axiosRes********* after get my posts", axiosRes);
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
            //Move to top
            window.scrollTo(0, 0);

            setIsLoading(false);
        } catch (error) {
            console.log('err');
        }
    }

    //Append next post list
    const appendNextList = async () => {
        let currentPage = localStorage.getItem("currentPage");
        let pageNumberOfPostList = parseInt(currentPage) + 1;
        // console.log("appendNextList function call", pageNumberOfPostList);

        let axiosRes;

        // const userID = "newuse1r674";
        // const sessionUserID = localStorage.getItem('sessionUserID');
        axiosRes = await getOtherUserPostsByUserIDDContext(userIDForProfile, pageNumberOfPostList);
        // console.log(
        //     "axiosRes********* after get my posts on page",
        //     pageNumberOfPostList,
        //     axiosRes
        // );
        if (axiosRes.status === "success") {
            setPostList((current) => [...current, ...axiosRes.list]);
            localStorage.setItem("currentPage", pageNumberOfPostList);
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



    return (
        <>
            {isLoading && <Loader />}

            <InfiniteScroll
                dataLength={postList.length}
                next={appendNextList}
                hasMore={true}
                // loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {/* {postList} */}
            </InfiniteScroll>


            {/* Modal */}
            {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}

            {viewMoreAwardOfPost && <ViewPostsAwardModal viewMoreAwardOfPost={viewMoreAwardOfPost} setViewMoreAwardOfPost={setViewMoreAwardOfPost} />}

            {/* {viewRetweetPopup && <RetweetModal viewRetweetPopup={viewRetweetPopup} setViewRetweetPopup={setViewRetweetPopup} />} */}

            <Tabs defaultActiveKey="Timeline" id="" className="digital-tabs" >

                {/* Post List */}
                <Tab eventKey="Timeline" title="Timeline">
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
                </Tab>

                {/* About section */}
                <Tab eventKey="About" title="About">
                    <UsersAbout otherUser={otherUser} />
                </Tab>
            </Tabs>
        </>
    );
}

export default UsersProfileTabs;
import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/esm/Container";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DContext } from "../../Context/DContext";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import SinglePostList from "./SinglePostList";
import UserListModal from "./Modals/UserListModal";
// import ViewPostsAwardModal from "./Modals/ViewPostsAwardModal";

const HashtagPostsAdmin = () => {

    const { popupType, getpostsByHashTagDContext, postList, setPostList, postIDForAwardOfPost, isLoading, setIsLoading, hashTagClickState, setHashTagClickState } = useContext(DContext);

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

    return (
        <>

            {isLoading && <Loader />}
            {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}
            {/* {viewMoreAwardOfPost && <ViewPostsAwardModal viewMoreAwardOfPost={viewMoreAwardOfPost} setViewMoreAwardOfPost={setViewMoreAwardOfPost} />} */}


            <>
                <Container>
                    <div className="dashboard-title-bar">
                        <Row>
                            <Col lg="12">
                                <h4>{localStorage.getItem('hashTagName')}</h4>
                            </Col>
                            <Col lg="12">
                                <div className="Username-titlebar">
                                    {/* <h6><FaUser />{user?.name ? user.name : user?.username}</h6> */}
                                </div>
                            </Col>
                        </Row>
                    </div>

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


                    {
                        postList.length ?
                            postList.map((post) => (
                                <SinglePostList
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

                </Container>

            </>

        </>
    );
}

export default HashtagPostsAdmin;
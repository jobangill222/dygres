import React, { useEffect, useContext, useState } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

// Import Modals
import UserListModal from "../Components/Modals/UserListModal";
import ViewPostsAwardModal from "../Components/Modals/ViewPostsAwardModal";
import RetweetModal from "../Components/Modals/RetweetModal";
import { useParams } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const SinglePostDetail = () => {

    let { postIdForSinglePost, specificCommentFirst } = useParams();

    // console.log("SinglePostID", SinglePostID);

    const { popupType, getSinglePostDetailDContext, postList, setPostList, postIDForAwardOfPost, isLoading, setIsLoading, postIDForSinglePostState, setSearchState } = useContext(DContext);


    useEffect(() => {
        setSearchState(null)
        // localStorage.setItem("currentPage", 1);
        getPostDetail();

    }, [postIDForSinglePostState]);


    const [isPostDeletedState, setIsPostDeletedState] = useState(0);

    const getPostDetail = async () => {
        try {
            setIsLoading(true);
            //Api call
            // const PostIdForSinglePost = localStorage.getItem('PostIdForSinglePost');

            // const postID = "63c7c179d5618a6185825361";
            const axiosRes = await getSinglePostDetailDContext(postIdForSinglePost);
            // console.log("axiosRes******** after single post detail posts", axiosRes);
            if (axiosRes.status === "success") {
                if (axiosRes.list[0]?.isDeleted === 1) {
                    setIsPostDeletedState(1)
                } else {
                    setIsPostDeletedState(2);
                }
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



    return (
        <>
            {isLoading && <Loader />}

            {/* Modal */}
            {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}

            {viewMoreAwardOfPost && <ViewPostsAwardModal viewMoreAwardOfPost={viewMoreAwardOfPost} setViewMoreAwardOfPost={setViewMoreAwardOfPost} />}

            {/* {viewRetweetPopup && <RetweetModal viewRetweetPopup={viewRetweetPopup} setViewRetweetPopup={setViewRetweetPopup} />} */}
            {isPostDeletedState === 1 ?
                <div className="notfound">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="notfound-content">
                                    <h2>404</h2>
                                    <h4>Opps! Post Not Found</h4>
                                    <p>Sorry, the post you're looking for doesn't exist.</p>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                :

                isPostDeletedState === 2 ?
                    <>
                        <h4 className="pagetitle">Post Detail</h4>

                        {
                            postList.length ?
                                postList.map((post) => (
                                    <DigitalTabContent
                                        key={post._id}
                                        post={post}
                                        postListingType='singlePost'
                                        specificCommentFirst={specificCommentFirst}
                                    />
                                ))
                                :
                                <div className="empty-bar">
                                    <img src="/images/empty.png" alt='dummy' />
                                    <h4>No Posts</h4>
                                </div>
                        }
                    </>
                    : null
            }

        </>
    );
}

export default SinglePostDetail;
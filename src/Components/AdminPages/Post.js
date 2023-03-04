import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/esm/Container";

import { FaUser } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useParams } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import SinglePostList from "./SinglePostList";
import UserListModal from "./Modals/UserListModal";
// import ViewPostsAwardModal from "./Modals/ViewPostsAwardModal";

const Post = () => {

    const { postList, popupType, setPostList, setSelectedIDForPopup, setPopupType, getOtherUserPostsByUserIDDContext, postIDForAwardOfPost, isLoading, setIsLoading, getOtherUserDetailByUserIDDContext } = useContext(DContext);

    let { userID } = useParams();


    // Award of posts
    // const [viewMoreAwardOfPost, setViewMoreAwardOfPost] = useState(false);
    // useEffect(() => {
    //     if (postIDForAwardOfPost) {
    //         setViewMoreAwardOfPost(true);
    //     }
    // }, [postIDForAwardOfPost])


    const [isUserDeletedState, setIsUserDeletedState] = useState(0);


    useEffect(() => {

        //Hide userlist modal
        setSelectedIDForPopup(null);
        setPopupType(null)

        // setPostList([]);
        localStorage.setItem("currentAdminUserListPage", 1);
        getUserDetails();
        getUserPost();
    }, [userID])

    const [user, setUser] = useState(null);

    const getUserDetails = async () => {
        try {
            const axiosRes = await getOtherUserDetailByUserIDDContext(userID);
            // console.log("axiosRes==========********* data", axiosRes);
            if (axiosRes.status === "success") {
                if (axiosRes.data.isDeleted === 1) {
                    setIsUserDeletedState(1)
                } else {
                    setIsUserDeletedState(2)
                }
                setUser(axiosRes.data)
            }
        } catch (error) {
            console.log('err');
        }
    }

    const getUserPost = async () => {
        try {
            setIsLoading(true);
            let pageNumberOfPostList = 1;
            const axiosRes = await getOtherUserPostsByUserIDDContext(userID, pageNumberOfPostList);
            console.log('axiosRes', axiosRes)
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
            setIsLoading(false);
        } catch (error) {
            console.log('err');
        }
    }

    //Append next post list
    const appendNextList = async () => {
        let currentAdminUserListPage = localStorage.getItem("currentAdminUserListPage");
        let pageNumberOfPostList = parseInt(currentAdminUserListPage) + 1;
        let axiosRes;
        axiosRes = await getOtherUserPostsByUserIDDContext(userID, pageNumberOfPostList);
        if (axiosRes.status === "success") {
            setPostList((current) => [...current, ...axiosRes.list]);
            localStorage.setItem("currentAdminUserListPage", pageNumberOfPostList);
        }
    };


    // Change state when click on count of agree disagree etc and change popupstate to true to open
    const [popupOpenStatus, setPopupOpenStatus] = useState(false);
    useEffect(() => {
        if (popupType) {
            setPopupOpenStatus(true);
        } else {
            setPopupOpenStatus(false)
        }
    }, [popupType])


    return (
        <>

            {isLoading && <Loader />}
            {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}
            {/* {viewMoreAwardOfPost && <ViewPostsAwardModal viewMoreAwardOfPost={viewMoreAwardOfPost} setViewMoreAwardOfPost={setViewMoreAwardOfPost} />} */}


            {isUserDeletedState === 1 ?
                <div className="notfound">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="notfound-content">
                                    <h2>404</h2>
                                    <h4>Opps! User Not Found</h4>
                                    <p>Sorry, the user you're looking for doesn't exist.</p>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                : isUserDeletedState === 2 ?
                    <>
                        <Container>
                            <div className="dashboard-title-bar">
                                <Row>
                                    <Col lg="12">
                                        <h4>Post</h4>
                                    </Col>
                                    <Col lg="12">
                                        <div className="Username-titlebar">
                                            {console.log('useruser', user)}
                                            <h6><FaUser />{user?.name ? user.name : user?.username}</h6>
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
                    : null}



        </>
    );
}

export default Post;
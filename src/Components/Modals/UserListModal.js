import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { DContext } from "../../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
// import { BASE_URL } from '../../Config/index';
import SingleUserList from "./SingleUserList";

const UserListModal = (props) => {

    const { popupOpenStatus, setPopupOpenStatus } = props;

    const { selectedIDForPopup, setSelectedIDForPopup, popupType, getAgreedPostUserDContext, getDisAgreedPostUserDContext, getReportedPostUserDContext, getAgreedCommentUserDContext, getDisagreedCommentUserDContext } = useContext(DContext);
    // console.log('user', user._id);

    const [userList, setUserList] = useState([]);

    // Aggree Modal
    const AggreeListClose = () => {
        setPopupOpenStatus(false);
        setSelectedIDForPopup(null);
    }

    useEffect(() => {
        localStorage.setItem('userListPageNumber', 1);
        UserList();
    }, []);

    //Get User list post
    const UserList = async () => {
        try {
            //Api call
            let PageNumber = 1;
            let axiosRes;
            if (popupType === 'agree-post-user-list') {
                axiosRes = await getAgreedPostUserDContext(selectedIDForPopup, PageNumber);
            }
            if (popupType === 'disagree-post-user-list') {
                axiosRes = await getDisAgreedPostUserDContext(selectedIDForPopup, PageNumber);
            }
            if (popupType === 'report-post-user-list') {
                axiosRes = await getReportedPostUserDContext(selectedIDForPopup, PageNumber);
            }
            if (popupType === 'agreed-comment-user-list') {
                axiosRes = await getAgreedCommentUserDContext(selectedIDForPopup, PageNumber);
            }
            if (popupType === 'disagreed-comment-user-list') {
                axiosRes = await getDisagreedCommentUserDContext(selectedIDForPopup, PageNumber);
            }
            // console.log("axiosRes********* User List", axiosRes);
            if (axiosRes.status === "success") {
                console.log('axiosRes.listaxiosRes.list', axiosRes.list);
                setUserList(axiosRes.list);
            }
        } catch (err) {
            console.log(err);
        }
    };


    //Append next user list
    const appendNextList = async () => {
        let currentPage = localStorage.getItem("userListPageNumber");
        let PageNumber = parseInt(currentPage) + 1;
        // console.log("appendNextList function call", pageNumberOfPostList);

        let axiosRes;
        if (popupType === 'agree-post-user-list') {
            axiosRes = await getAgreedPostUserDContext(selectedIDForPopup, PageNumber);
        }
        if (popupType === 'disagree-post-user-list') {
            axiosRes = await getDisAgreedPostUserDContext(selectedIDForPopup, PageNumber);
        }
        if (popupType === 'report-post-user-list') {
            axiosRes = await getReportedPostUserDContext(selectedIDForPopup, PageNumber);
        }
        if (popupType === 'agreed-comment-user-list') {
            axiosRes = await getAgreedCommentUserDContext(selectedIDForPopup, PageNumber);
        }
        if (popupType === 'disagreed-comment-user-list') {
            axiosRes = await getDisagreedCommentUserDContext(selectedIDForPopup, PageNumber);
        }


        console.log(
            "axiosRes********* after get user list on page",
            PageNumber,
            axiosRes
        );
        if (axiosRes.status === "success") {
            setUserList((current) => [...current, ...axiosRes.list]);
            localStorage.setItem("userListPageNumber", PageNumber);
        }
    };


    return (
        <>

            <InfiniteScroll
                dataLength={userList.length}
                next={appendNextList}
                hasMore={true}
                scrollableTarget="scrollableDiv"
            >
            </InfiniteScroll>

            {/* Aggree modal */}
            <Modal className="Actions-modal" show={popupOpenStatus} onHide={AggreeListClose} centered >

                <Modal.Header closeButton>
                    <Modal.Title>{popupType === 'agree-post-user-list' ?
                        "Agree By" : popupType === 'disagree-post-user-list' ?
                            "Disagree By" : popupType === 'report-post-user-list' ?
                                "Report By" : popupType === 'agreed-comment-user-list' ?
                                    "Agree By" : popupType === 'disagreed-comment-user-list' ?
                                        "Disagree By" : ""}</Modal.Title>
                </Modal.Header>


                <Modal.Body id="scrollableDiv">
                    {userList.length ? userList.map((userListing) => (
                        <SingleUserList userListing={userListing} />
                    )) : <div className="empty-bar">
                        <img src="/images/empty.png" alt='dummy' />
                        <h4>There is nothing here :(</h4>
                    </div>}
                </Modal.Body>

            </Modal>
        </>
    );
}

export default UserListModal;
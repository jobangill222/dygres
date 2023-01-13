import React, { useEffect, useContext, useState } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";

// Import Modals
import UserListModal from "../Components/Modals/UserListModal";
import { toast } from "react-toastify";
import ViewPostsAwardModal from "../Components/Modals/ViewPostsAwardModal";


const MostVoted = () => {

    const { getSinglePostDetailDContext, postList, setPostList, selectedIDForPopup, postIDForAwardOfPost } = useContext(DContext);

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getPostDetail();
    }, []);

    const getPostDetail = async () => {
        try {
            //Api call
            const postID = "63bd0d2088c93064c87b89ff";
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

    return (
        <>


            {/* Modal */}
            {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}

            {viewMoreAwardOfPost && <ViewPostsAwardModal viewMoreAwardOfPost={viewMoreAwardOfPost} setViewMoreAwardOfPost={setViewMoreAwardOfPost} />}



            <h4 className="pagetitle">Post Detail</h4>

            {
                postList.length ?
                    postList.map((post) => (
                        <DigitalTabContent
                            key={post._id}
                            post={post}
                            listingType="single"
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
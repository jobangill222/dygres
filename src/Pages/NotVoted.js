import React, { useEffect, useContext, useState } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";

// Import Modals
import UserListModal from "../Components/Modals/UserListModal";

const NotVoted = () => {


    const { getNotVotedPostDContext, postList, setPostList, selectedPostIDForPopup } =
        useContext(DContext);

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getNotVotedPosts();
    }, []);

    const getNotVotedPosts = async () => {
        try {
            //Api call
            let pageNumberOfPostList = 1;
            const axiosRes = await getNotVotedPostDContext(pageNumberOfPostList);
            // console.log("axiosRes******** after get not voted posts", axiosRes);
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
        } catch (err) {
            console.log(err);
        }
    };


    //Append next post list
    const appendNextList = async () => {
        let currentPage = localStorage.getItem("currentPage");
        let pageNumberOfPostList = parseInt(currentPage) + 1;
        // console.log("appendNextList function call", pageNumberOfPostList);

        const axiosRes = await getNotVotedPostDContext(pageNumberOfPostList);
        // console.log(
        //     "axiosRes********* after get not voted posts on page",
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
        if (selectedPostIDForPopup) {
            setPopupOpenStatus(true);
        }
    }, [selectedPostIDForPopup])

    return (
        <>

            <InfiniteScroll
                dataLength={postList.length}
                next={appendNextList}
                hasMore={true}
            >
                {/* {postList} */}
            </InfiniteScroll>

            {/* Modal */}
            {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}

            <h4 className="pagetitle">Not Voted</h4>
            {postList.map((post) => (
                <DigitalTabContent
                    key={post._id}
                    post={post}
                />
            ))}
        </>
    );
}

export default NotVoted;
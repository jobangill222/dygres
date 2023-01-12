import React, { useEffect, useContext, useState } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";

// Import Modals
import UserListModal from "../Components/Modals/UserListModal";
// import AwardModal from "../Components/Modals/AwardModal";

const HashTagPosts = () => {

    const { getpostsByHashTagDContext, postList, setPostList, selectedIDForPopup } =
        useContext(DContext);

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getposts();
    }, []);

    const getposts = async () => {
        try {
            //Api call
            let pageNumberOfPostList = 1;

            const hashtagName = localStorage.getItem('hashTagName')
            const axiosRes = await getpostsByHashTagDContext(hashtagName, pageNumberOfPostList);
            console.log("axiosRes******** after get hashtag posts", axiosRes);
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
            else {
                setPostList([]);
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


        const hashtagName = localStorage.getItem('hashTagName')
        const axiosRes = await getpostsByHashTagDContext(hashtagName, pageNumberOfPostList);
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
        if (selectedIDForPopup) {
            setPopupOpenStatus(true);
        }
    }, [selectedIDForPopup])

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

            {/* {awardPopupOpenStatus && <AwardModal awardPopupOpenStatus={awardPopupOpenStatus} setAwardPopupOpenStatus={setAwardPopupOpenStatus} />} */}


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
                        <h4>No Post</h4>
                    </div>
            }
        </>
    );
}

export default HashTagPosts;
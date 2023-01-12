import React, { useEffect, useContext, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProfileAbout from "./ProfileAbout";
// import ProfileTabTimeline from "./ProfileTabTimeline";
import { DContext } from "../../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import DigitalTabContent from "../DigitalTabContent";
import UserListModal from "../Modals/UserListModal";
// import AwardModal from "../Modals/AwardModal";


const UsersProfileTabs = (props) => {

    const { user } = props;

    const { postList, setPostList, getOtherUserPostsByUsernameDContext, selectedIDForPopup } = useContext(DContext);

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getMyPosts();
    }, [])

    const getMyPosts = async () => {
        // console.log('sss');
        try {
            //Api call
            let pageNumberOfPostList = 1;
            // const username = "newuse1r674";
            const username = localStorage.getItem('username');
            const axiosRes = await getOtherUserPostsByUsernameDContext(username, pageNumberOfPostList);
            // console.log("axiosRes********* after get my posts", axiosRes);
            if (axiosRes.status === "success") {
                setPostList(axiosRes.list);
            }
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

        // const username = "newuse1r674";
        const username = localStorage.getItem('username');
        axiosRes = await getOtherUserPostsByUsernameDContext(username, pageNumberOfPostList);
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

            {/* {awardPopupOpenStatus && <AwardModal awardPopupOpenStatus={awardPopupOpenStatus} setAwardPopupOpenStatus={setAwardPopupOpenStatus} />} */}

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
                                <h4>No Post</h4>
                            </div>
                    }
                </Tab>

                {/* ABout section */}
                <Tab eventKey="About" title="About">
                    <ProfileAbout user={user} />
                </Tab>
            </Tabs>
        </>
    );
}

export default UsersProfileTabs;
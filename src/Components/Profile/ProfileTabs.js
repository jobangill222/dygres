import React, { useEffect, useContext } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProfileAbout from "./ProfileAbout";
// import ProfileTabTimeline from "./ProfileTabTimeline";
import { DContext } from "../../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import DigitalTabContent from "../DigitalTabContent";


const ProfileTabs = () => {

    const { postList, setPostList, getMyPostsDContext } = useContext(DContext);

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getMyPosts();
    }, [])

    const getMyPosts = async () => {
        // console.log('sss');
        try {
            //Api call
            let pageNumberOfPostList = 1;
            const axiosRes = await getMyPostsDContext(pageNumberOfPostList);
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

        axiosRes = await getMyPostsDContext(pageNumberOfPostList);
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

            <Tabs defaultActiveKey="Timeline" id="" className="digital-tabs" >
                {/* <Tab eventKey="Timeline" title="Timeline">
                    <ProfileTabTimeline />
                </Tab> */}

                <Tab eventKey="Timeline" title="Timeline">
                    {postList.map((post) => (
                        <DigitalTabContent
                            key={post._id}
                            post={post}
                        />
                    ))}
                </Tab>


                <Tab eventKey="About you" title="About you">
                    <ProfileAbout />
                </Tab>
            </Tabs>
        </>
    );
}

export default ProfileTabs;
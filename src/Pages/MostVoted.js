import React, { useEffect, useContext } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";


const MostVoted = () => {

    const { getMostVotedPostDContext, postList, setPostList } =
        useContext(DContext);

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getMostVotedPosts();
    }, []);

    const getMostVotedPosts = async () => {
        try {
            //Api call
            let pageNumberOfPostList = 1;
            const axiosRes = await getMostVotedPostDContext(pageNumberOfPostList);
            // console.log("axiosRes******** after get most votes posts", axiosRes);
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

        const axiosRes = await getMostVotedPostDContext(pageNumberOfPostList);
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

    return (
        <>
            <InfiniteScroll
                dataLength={postList.length}
                next={appendNextList}
                hasMore={true}
            >
                {/* {postList} */}
            </InfiniteScroll>

            <h4 className="pagetitle">Most Voted</h4>
            {postList.map((post) => (
                <DigitalTabContent
                    key={post._id}
                    post={post}
                />
            ))}
        </>
    );
}

export default MostVoted;
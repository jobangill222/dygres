import React, { useEffect, useContext } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";


const NotVoted = () => {


    const { getNotVotedPostDContext, postList, setPostList } =
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

    return (
        <>

            <InfiniteScroll
                dataLength={postList.length}
                next={appendNextList}
                hasMore={true}
            >
                {/* {postList} */}
            </InfiniteScroll>

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
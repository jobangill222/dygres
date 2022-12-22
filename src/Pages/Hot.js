import React, { useEffect, useContext } from "react";
import DigitalTabContent from "../Components/DigitalTabContent";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";

const Hot = () => {

    const { getHotPostDContext, postList, setPostList } =
        useContext(DContext);

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getHotPosts();
    }, []);

    const getHotPosts = async () => {
        try {
            //Api call
            let pageNumberOfPostList = 1;
            const axiosRes = await getHotPostDContext(pageNumberOfPostList);
            // console.log("axiosRes******** after get hot posts", axiosRes);
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

        const axiosRes = await getHotPostDContext(pageNumberOfPostList);
        // console.log(
        //     "axiosRes********* after get hot posts on page",
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

            <h4 className="pagetitle">Hot</h4>
            {postList.map((post) => (
                <DigitalTabContent
                    key={post._id}
                    post={post}
                />
            ))}
        </>
    );
}

export default Hot;
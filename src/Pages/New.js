import React, { useEffect, useContext, useState } from "react";
import DigitalTabs from "../Components/DigitalTabs";
import WhatsMind from "../Components/WhatsMind";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";

const New = () => {
  //Functions to call api
  const { getGlobalPostDContext, getFollowingPostDContext } =
    useContext(DContext);

  //State for postList
  const [postList, setPostList] = useState([]);
  //State for active tab like: global , follwing, officials
  const [activeTabState, setActiveTabState] = useState("Global");
  //State for is post or not to paas dependency in use effect
  const [isPostState, setIsPostState] = useState("0");

  // useEffect(() => {
  //   componentDidMount();
  // }, []);

  //For render post list render when change tab and post something
  useEffect(() => {
    localStorage.setItem("currentPage", 1);
    if (activeTabState === "Global") {
      getGlobalPosts();
    }
    if (activeTabState === "Following") {
      getFollowingPosts();
    }
    setIsPostState("0");
  }, [activeTabState, isPostState]);

  //Get global post
  const getGlobalPosts = async () => {
    try {
      //Api call
      let pageNumberOfPostList = 1;
      const axiosRes = await getGlobalPostDContext(pageNumberOfPostList);
      console.log("axiosRes********* after get global posts", axiosRes);
      if (axiosRes.status === "success") {
        setPostList(axiosRes.list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Get Following post
  const getFollowingPosts = async () => {
    try {
      //Api call
      let pageNumberOfPostList = 1;
      const axiosRes = await getFollowingPostDContext(pageNumberOfPostList);
      console.log("axiosRes********* after get following posts", axiosRes);
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
    console.log("appendNextList function call", pageNumberOfPostList);

    let axiosRes;

    if (activeTabState === "Global") {
      axiosRes = await getGlobalPostDContext(pageNumberOfPostList);
    }
    if (activeTabState === "Following") {
      axiosRes = await getFollowingPostDContext(pageNumberOfPostList);
    }
    console.log(
      "axiosRes********* after get global posts on page",
      pageNumberOfPostList,
      axiosRes
    );
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

      <WhatsMind setIsPostState={setIsPostState} />
      <DigitalTabs setActiveTabState={setActiveTabState} postList={postList} />
    </>
  );
};

export default New;

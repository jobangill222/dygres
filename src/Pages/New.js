import React, { useEffect, useContext, useState } from "react";
import DigitalTabs from "../Components/DigitalTabs";
import WhatsMind from "../Components/WhatsMind";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from 'react-bootstrap/Spinner';

const New = () => {
  //Functions to call api
  const { getGlobalPostDContext, getFollowingPostDContext, postList, setPostList, isPostState, setIsPostState } = useContext(DContext);


  //State for active tab like: global , follwing, officials
  const [activeTabState, setActiveTabState] = useState("Global");


  const [isLoding, setIsLoading] = useState(false);


  //For render post list render when change tab and post something
  useEffect(() => {
    localStorage.setItem("currentPage", 1);
    if (activeTabState === "Global") {
      getGlobalPosts();
    }
    if (activeTabState === "Following") {
      getFollowingPosts();
    }
  }, [activeTabState]);



  useEffect(() => {
    localStorage.setItem("currentPage", 1);
    if (activeTabState === "Global") {
      getGlobalPosts();
    }
    setIsPostState("0");
  }, [isPostState]);


  //Get global post
  const getGlobalPosts = async () => {
    try {
      setIsLoading(true);
      //Api call
      setPostList([]);
      let pageNumberOfPostList = 1;
      const axiosRes = await getGlobalPostDContext(pageNumberOfPostList);
      console.log("axiosRes********* after get global posts on page 1", axiosRes);
      if (axiosRes.status === "success") {
        setPostList(axiosRes.list);
      }
      setIsLoading(false);

      //Move to top
      window.scrollTo(0, 0);

    } catch (err) {
      console.log(err);
    }
  };

  //Get Following post
  const getFollowingPosts = async () => {
    try {
      setIsLoading(true);
      //Api call
      let pageNumberOfPostList = 1;
      const axiosRes = await getFollowingPostDContext(pageNumberOfPostList);
      console.log("axiosRes********* after get following posts", axiosRes);
      if (axiosRes.status === "success") {
        setPostList(axiosRes.list);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Append next post list
  const appendNextList = async () => {
    let currentPage = localStorage.getItem("currentPage");
    let pageNumberOfPostList = parseInt(currentPage) + 1;
    // console.log("appendNextList function call", pageNumberOfPostList);

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
      {isLoding &&
        <div className='loader'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>

      }

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

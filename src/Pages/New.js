import React, { useEffect, useContext, useState } from "react";
import DigitalTabs from "../Components/DigitalTabs";
import WhatsMind from "../Components/WhatsMind";
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader";

const New = () => {
  //Functions to call api
  const { getGlobalPostDContext, getFollowingPostDContext, postList, setPostList, isPostState, setIsPostState, isLoading, setIsLoading, setSearchState, getOfficialPostDContext } = useContext(DContext);


  //State for active tab like: global , follwing, officials
  const [activeTabState, setActiveTabState] = useState("Global");
  const [placeholderState, setPlaceholderState] = useState('');

  var title = [
    "A penny for your thoughts",
    "A penny for your thoughts? Hell, how about a dime?",
    "Share your thoughts",
    "INSERT IDEA TO CONTINUE",
    "Welcome to idea central… population, you!",
    "Express thyself, mortal!",
    "Hello human, want to talk? 🙂",
    "What’s up?",
    "What’s on your mind?",
    "Welcome earthling, what do you have to share today?",
    "Ready to dygres?",
    "The worlds worst kept secret",
    "BREAKING NEWS!",
    "The world is waiting… to hear from you!",
    "I was today years old when…",
    "How are you feeling today?",
    "How’s your week going?",
    "Anything you need to talk about?",

    "Say something",
    "Unload word hoard here",
    "Time to empty the mental library?",
    "Need to talk? We’re listening.",
    "Express your thoughts",
    "Never be afraid to express yourself",
    "Unleash your brainchildren",
    "Speak up, we want to hear from you.",
    "The world is waiting…",
    "It was a dark and stormy night",
    "It was the best of times, it was the worst of times.",
    "It’s creativity time! :D",

    "How’s it going?",
    "How are you today?",
    "Let your dreams blossom",
    "Tappity tap tappity tap tap",
    "Caps lock is not actually cruise control for cool.",
    "Caps lock may be cruise control for cool, but you still have to steer",
    "Thought cabinet unlocked",
    "New thought/idea unlocked",
    "This may be the greatest/best thing you've ever written",
    "Ready for your magnum opus?",
    "Write your little heart out",
    "Share your dygressions",
    "Let’s dygres",
    "Shall we dygres?",
    "Is it sharing time already?",
    "Think brain, think!",
    "Another day, another dygression.",
    "What would you like to dygres on today?",
    "How will you be dygressing today?",
    "Great to see you again!",
    "Welcome back to another amazing idea",
    "Incredible thoughts",
    "Show us your genius",
  ];



  //For render post list render when change tab and post something
  useEffect(() => {
    setSearchState(null)

    setPostList([]);
    localStorage.setItem("currentPage", 1);
    if (activeTabState === "Global") {
      getGlobalPosts();
    }
    if (activeTabState === "Following") {
      getFollowingPosts();
    }
    if (activeTabState === "Official") {
      getOfficialPosts();
    }
    setPlaceholderState(title[Math.floor(Math.random() * title.length)]);

  }, [activeTabState]);



  useEffect(() => {
    localStorage.setItem("currentPage", 1);
    getGlobalPosts();
    setIsPostState(false);

    setActiveTabState('Global')
  }, [isPostState]);


  //Get global post
  const getGlobalPosts = async () => {
    try {
      setIsLoading(true);
      //Api call
      setPostList([]);
      let pageNumberOfPostList = 1;
      const search = null;
      const axiosRes = await getGlobalPostDContext(search, pageNumberOfPostList);
      // console.log("axiosRes********* after get global posts on page 1", axiosRes);
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
      const search = null;
      const axiosRes = await getFollowingPostDContext(search, pageNumberOfPostList);
      console.log("axiosRes********* after get following posts", axiosRes);
      if (axiosRes.status === "success") {
        setPostList(axiosRes.list);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };


  //Get Official post
  const getOfficialPosts = async () => {
    try {
      setIsLoading(true);
      //Api call
      let pageNumberOfPostList = 1;
      const search = null;
      const axiosRes = await getOfficialPostDContext(search, pageNumberOfPostList);
      console.log("axiosRes********* after get official posts", axiosRes);
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
      const search = null;
      axiosRes = await getGlobalPostDContext(search, pageNumberOfPostList);
    }
    if (activeTabState === "Following") {
      const search = null;
      axiosRes = await getFollowingPostDContext(search, pageNumberOfPostList);
    }
    if (activeTabState === "Official") {
      const search = null;
      axiosRes = await getOfficialPostDContext(search, pageNumberOfPostList);
    }
    // console.log(
    //   "axiosRes********* after get global posts on page",
    //   pageNumberOfPostList,
    //   axiosRes
    // );
    if (axiosRes.status === "success") {
      setPostList((current) => [...current, ...axiosRes.list]);
      localStorage.setItem("currentPage", pageNumberOfPostList);
    }
  };

  return (
    <>

      {isLoading && <Loader />}

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

      <WhatsMind setIsPostState={setIsPostState} setActiveTabState={setActiveTabState} placeholderState={placeholderState} />
      <DigitalTabs setActiveTabState={setActiveTabState} activeTabState={activeTabState} postList={postList} />
    </>
  );
};

export default New;

import React, { useContext, useEffect, useState } from "react";

export const followUser = async (setUserStats, postList, setPostList, followUnfollowDContext, postUserID) => {

    // const { setUserStats, postList, setPostList, followUnfollowDContext } = useContext(DContext);

    let newPostList = postList;
    postList.forEach((post, index) => {
        if (post.userID === postUserID) {
            console.log('condition hit of follow user');
            newPostList[index] = { ...post, is_follow: 1 }
        }
    })
    setPostList([...newPostList, { ...newPostList[0] }]);
    setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)

    // Update user stats state
    setUserStats((previousState) => {
        return {
            ...previousState,
            totalFollowing: previousState.totalFollowing + 1,
        };
    });

    await followUnfollowDContext(postUserID);
}
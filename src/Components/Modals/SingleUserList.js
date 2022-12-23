import React, { useContext, useState, useEffect } from 'react'
import { BASE_URL } from '../../Config/index';
import { DContext } from "../../Context/DContext";

export default function SingleUserList(props) {

    //props
    const { userListing } = props;

    //Global state and functions
    const { user, postList, setPostList, setUserStats, followUnfollowDContext } = useContext(DContext);

    //States
    const [isFollowStateUserList, setIsFollowStateUserList] = useState(0);


    useEffect(() => {
        if (userListing.is_follow === 1) {
            setIsFollowStateUserList(1);
        } else {
            setIsFollowStateUserList(0);
        }
    }, [userListing.is_follow]);



    const followUserInUserList = async () => {
        console.log('follow call');
        let newPostList = postList;
        postList.forEach((post, index) => {
            if (post.userID === userListing.userID) {
                console.log('condition hit of follow user');
                newPostList[index] = { ...post, is_follow: 1 }
            }
        })
        setPostList([...newPostList, { ...newPostList[0] }]);
        setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)

        // Update user stats stats
        setUserStats((previousState) => {
            return {
                ...previousState,
                totalFollowing: previousState.totalFollowing + 1,
            };
        });

        await followUnfollowDContext(userListing.userID);
        setIsFollowStateUserList(1);
    }

    const UnfollowUserInUserList = async () => {
        let newPostList = postList;
        postList.forEach((post, index) => {
            if (post.userID === userListing.userID) {
                console.log('condition hit of unfollow user');
                newPostList[index] = { ...post, is_follow: 0 }
            }
        })
        setPostList([...newPostList, { ...newPostList[0] }]);
        // setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)
        setTimeout(() => setPostList((prevState) => prevState.slice(0, -1)), 100)

        // Update user stats state
        setUserStats((previousState) => {
            return {
                ...previousState,
                totalFollowing: previousState.totalFollowing - 1,
            };
        });

        await followUnfollowDContext(userListing.userID);
        setIsFollowStateUserList(0);
    }


    // console.log('userListinguserListinguserListing', userListing);
    return (
        <>

            <ul key={userListing.userID} className="aggree-li">
                <li>
                    <img src={userListing.user?.profileImage ? BASE_URL + `/` + userListing.user?.profileImage : `/images/user.png`} alt="userimg" />
                    <div className="user-del">
                        <h4>{userListing.user.name ? userListing.user.name : userListing.user.username}</h4>
                        <h6>@{userListing?.user?.username}</h6>
                    </div>
                </li>
                {/* <li>
                    {
                        user._id !== userListing.userID ?
                            isFollowStateUserList === 0 ? <button className="followbtn" type="button" onClick={followUserInUserList}>Follow</button> :
                                <button className="followbtn" type="button" onClick={UnfollowUserInUserList}>
                                    Un-Follow
                                </button> : ''
                    }

                </li> */}

                <li>
                    <button className="followbtn" type="button">
                        Follow
                    </button>
                </li>
            </ul>

        </>
    )
}

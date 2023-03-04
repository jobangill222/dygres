import React, { useContext, useState, useEffect } from 'react'
import { DContext } from "../../Context/DContext";
import { useNavigate } from "react-router-dom";

export default function SingleUserList(props) {

    const navigate = useNavigate();

    //props
    const { userListing } = props;

    console.log('userListing', userListing)

    //Global state and functions
    const { user, postList, setPostList, setUserStats, followUserDContext, unFollowUserDContext } = useContext(DContext);

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
            if (post.userID === userListing?.user?._id) {
                console.log('condition hit of follow user');
                newPostList[index] = { ...post, is_follow: 1 }
            }
        })
        setPostList([...newPostList, { ...newPostList[0] }]);
        // setTimeout(() => setPostList(newPostList.slice(0, -1)), 500)
        setTimeout(() => setPostList((prevState) => prevState.slice(0, -1)), 100)


        // Update user stats stats
        setUserStats((previousState) => {
            return {
                ...previousState,
                totalFollowing: previousState.totalFollowing + 1,
            };
        });

        await followUserDContext(userListing?.user?._id);
        setIsFollowStateUserList(1);
    }

    const UnfollowUserInUserList = async () => {
        let newPostList = postList;
        postList.forEach((post, index) => {
            if (post.userID === userListing?.user?._id) {
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

        await unFollowUserDContext(userListing?.user?._id);
        setIsFollowStateUserList(0);
    }


    const viewUsersProfileFromListing = async (userID) => {
        // localStorage.setItem('sessionUserID', userID);
        navigate('/UsersProfile/' + userID)
    }

    // console.log('userListinguserListinguserListing', userListing);
    return (
        <>

            <ul key={userListing?.user?._id} className="aggree-li">
                <li>
                    <img src={userListing?.user?.profileImage ? userListing.user?.profileImage : `/images/user.png`} alt="userimg" />
                    <div className="user-del cursor-pointer" onClick={() => viewUsersProfileFromListing(userListing.user._id)} >
                        <h4>{userListing?.user?.name ? userListing.user.name : userListing?.user?.username}</h4>
                        <h6>@{userListing?.user?.username}</h6>
                    </div>
                </li>

                <li>
                    {
                        user._id !== userListing?.user?._id && userListing?.user?.isDeleted !== 1 ?
                            isFollowStateUserList === 0 ? <button className="followbtn" type="button" onClick={followUserInUserList}>Follow</button> :
                                <button className="followbtn" type="button" onClick={UnfollowUserInUserList}>
                                    Unfollow
                                </button> : ''
                    }

                </li>

                {/* <li>
                    <button className="followbtn" type="button">
                        Follow
                    </button>
                </li> */}
            </ul>

        </>
    )
}

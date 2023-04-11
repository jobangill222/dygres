import React, { useEffect, useContext, useState } from "react";
import { DContext } from "../Context/DContext";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";


const Hot = () => {

    const navigate = useNavigate();

    const { setPostList, isLoading, setIsLoading, getHashtagDContext, setSearchState, setHashTagClickState ,isDummyUser} = useContext(DContext);

    const [hashtagListState, setHashtagListState] = useState([]);
    useEffect(() => {

        setPostList([]);

        getHashtags();
    }, []);

    const getHashtags = async () => {
        setIsLoading(true)
        const axiosRes = await getHashtagDContext();
        console.log('axiosResaxiosRes', axiosRes)
        setHashtagListState(axiosRes.list)
        setIsLoading(false);
    }

    const viewHashtagPost = async (name) => {
        setSearchState(null)
        setHashTagClickState(true);
        localStorage.setItem('hashTagName', name);
        navigate('/hashtagPosts')
    }
    return (
        <>

            {isLoading && <Loader />}

            <h4 className="pagetitle">Trending Hashtags</h4>
            <div className='trending-list-row'>
                {hashtagListState.length ?
                    hashtagListState.map((list, index) => (
                        <>

                            <ul className="trending-hashtag-list cursor-pointer" onClick={() => viewHashtagPost(list.hashtagDetails[0].name)} >
                                <li>{index + 1}</li>
                                <li className='hashtaglist '>
                                    {list.hashtagDetails[0].name}
                                </li>
                                <li className="hashtagcounts">{list.hashtagCount} dygressions</li>
                            </ul>
                        </>
                    ))
                    :
                    null
                }
            </div>

            {!hashtagListState.length ?
                < div className="empty-bar">
                    <img src="/images/empty.png" alt='dummy' />
                    <h4>Empty List</h4>
                </div>
                : null
            }
        </>
    );
}

export default Hot;
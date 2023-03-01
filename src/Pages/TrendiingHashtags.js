import React, { useEffect, useContext, useState } from "react";
import { DContext } from "../Context/DContext";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";


const Hot = () => {

    const navigate = useNavigate();

    const { isLoading, setIsLoading, getHashtagDContext, setSearchState, setHashTagClickState } = useContext(DContext);

    const [hashtagListState, setHashtagListState] = useState([]);

    useEffect(() => {
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

            {hashtagListState.length ?
                hashtagListState.map((list) => (
                    <>
                        <p onClick={() => viewHashtagPost(list.hashtagDetails[0].name)} >{list.hashtagDetails[0].name} - {list.hashtagCount}</p>
                    </>
                ))
                :
                <div className="empty-bar">
                    <img src="/images/empty.png" alt='dummy' />
                    <h4>Empty List</h4>
                </div>
            }
        </>
    );
}

export default Hot;
import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { DContext } from "../Context/DContext";

export default function HighLight(props) {

    const { content } = props;
    const navigate = useNavigate();


    const { checkUsernameExistDContext } = useContext(DContext);

    const myArray = content.split(" ");

    const userDetail = async (name) => {
        var newStr = name.replace('@', '')
        const axiosRes = await checkUsernameExistDContext(newStr);
        console.log('axiosResaxiosResaxiosResaxiosRes', axiosRes)
        if (axiosRes.status === 'error') {
            navigate('/notfound')
        }
        else {
            localStorage.setItem('sessionUserID', axiosRes.detail._id);
            navigate('/UsersProfile')

        }
    }

    const hashTag = async (name) => {
        // alert(name)
        // var newStr = name.replace('#', '')
        localStorage.setItem('hashTagName', name);
        navigate('/hashtagPosts')
    }


    return (
        <>
            <span> {myArray.map((singleWord, i) =>
                <span key={i} onClick={() => { if (singleWord.length > 1 && singleWord[0] === '@') { userDetail(singleWord) } if (singleWord.length > 1 && singleWord[0] === '#') { hashTag(singleWord) } }} className={singleWord.length > 1 && singleWord[0] === '@' ? "text-primary-highlight" : singleWord.length > 1 && singleWord[0] === '#' ? "text-primary-highlight" : ""}>
                    {singleWord}{' '}
                </span>
            )
            }</span>

            {/* <OtherProfile username={username} /> */}
        </>
    )
}











import React from 'react'
import { useNavigate } from "react-router-dom";


export default function HighLight(props) {

    const { content } = props;
    const navigate = useNavigate();


    const myArray = content.split(" ");

    const userDetail = async (name) => {
        var newStr = name.replace('@', '')
        localStorage.setItem('username', newStr);
        navigate('/UsersProfile')
    }

    const hashTag = async (name) => {
        // alert(name)
        var newStr = name.replace('#', '')
        localStorage.setItem('hashTagName', newStr);
        navigate('/hashtagPosts')
    }


    return (
        <>
            <span> {myArray.map((singleWord, i) =>
                <span key={i} onClick={() => { if (singleWord[0] === '@') { userDetail(singleWord) } if (singleWord[0] === '#') { hashTag(singleWord) } }} className={singleWord[0] === '@' ? "text-primary-highlight" : singleWord[0] === '#' ? "text-primary-highlight" : ""}>
                    {singleWord}{' '}
                </span>
            )
            }</span>

            {/* <OtherProfile username={username} /> */}
        </>
    )
}











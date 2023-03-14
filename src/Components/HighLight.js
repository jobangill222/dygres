import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { DContext } from "../Context/DContext";

export default function HighLight(props) {

    const { content } = props;
    const navigate = useNavigate();


    const { checkUsernameExistDContext, setSearchState, setHashTagClickState } = useContext(DContext);

    const myArray = content.split(" ");

    const userDetail = async (name) => {
        var newStr = name.replace('@', '')
        const axiosRes = await checkUsernameExistDContext(newStr);
        console.log('axiosResaxiosResaxiosResaxiosRes', axiosRes)
        if (axiosRes.status === 'error') {
            navigate('/notfound')
        }
        else {
            // localStorage.setItem('sessionUserID', axiosRes.detail._id);
            navigate('/UsersProfile/' + axiosRes.detail._id)

        }
    }

    const hashTag = async (name) => {
        // alert(name)
        // var newStr = name.replace('#', '')
        setSearchState(null)
        setHashTagClickState(true);
        localStorage.setItem('hashTagName', name);
        navigate('/hashtagPosts')
    }


    const regex = /^(?:(?:https?|ftp):\/\/)?([^\s\/]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    function isUrl(str) {
        return regex.test(str);
    }

    return (
        <>
            {myArray.map((singleWord, i) =>
                <span key={i} onClick={() => {
                    if (singleWord.length > 1 && singleWord[0] === '@') {
                        userDetail(singleWord)
                    }
                    if (singleWord.length > 1 && singleWord[0] === '#') {
                        hashTag(singleWord)
                    }
                    if (isUrl(singleWord)) {

                        // alert(singleWord);
                        if (singleWord.includes('https')) {
                            window.open(singleWord, '_blank');
                        }
                        else if (singleWord.includes('http')) {
                            window.open(singleWord, '_blank');
                        }
                        else {
                            window.open('http://' + singleWord, '_blank');
                        }


                    }
                }
                }
                    className={singleWord.length > 1 && singleWord[0] === '@' ? "text-primary-highlight" : singleWord.length > 1 && singleWord[0] === '#' ? "text-primary-highlight" : isUrl(singleWord) ? "text-primary-highlight" : ""}>
                    {singleWord}{' '}
                </span>
            )
            }

            {/* <OtherProfile username={username} /> */}
        </>
    )
}











import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { DContext } from "../Context/DContext";

export default function HighLight(props) {

    const { content } = props;
    const navigate = useNavigate();


    const { checkUsernameExistDContext, setSearchState, setHashTagClickState, isDummyUser } = useContext(DContext);

    // const myArray = content.split(" ");
    const myArray = content.replace(/\n/g, " ").split(" ");

    const userDetail = async (name) => {
        var newStr = name.replace('@', '')
        const axiosRes = await checkUsernameExistDContext(newStr);
        // console.log('axiosResaxiosResaxiosResaxiosRes', axiosRes)
        if (axiosRes.status === 'error') {
            navigate('/notfound')
        }
        else {
            // localStorage.setItem('sessionUserID', axiosRes.detail._id);
            navigate('/UsersProfile/' + axiosRes.detail.username)

        }
    }

    const hashTag = async (name) => {
        // alert(name)
        // var newStr = name.replace('#', '')
        if (isDummyUser()) {
            console.log("user not logged in");
            navigate('/login')
        } else {
            setSearchState(null)
            setHashTagClickState(true);
            localStorage.setItem('hashTagName', name);
            navigate('/hashtagPosts')
        }

    }


    // const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    //     '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

    // Url pattern
    const urlPattern = /^(https?:\/\/)?([a-z0-9\-]+\.)+(com|org|net|edu|gov|mil|info|biz|io|in|co|me|ly)(\/[^\s]*)?$/i;

    function isUrl(str) {
        str = str.toString().trim();
        return !!urlPattern.test(str);
    }

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap' }} >{myArray.map((singleWord, i) =>
                <span key={i} onClick={() => {
                    if (singleWord.length > 1 && singleWord[0] === '@') {
                        userDetail(singleWord)
                    }
                    if (singleWord.length > 1 && singleWord[0] === '#') {
                        hashTag(singleWord)
                    }
                    if (isUrl(singleWord)) {
                        if (isDummyUser()) {
                            console.log("user is not logged in");
                            navigate('/login');
                        } else {
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
                }
                    className={singleWord.length > 1 && singleWord[0] === '@' ? "text-primary-highlight" : singleWord.length > 1 && singleWord[0] === '#' ? "text-primary-highlight" : isUrl(singleWord) ? "text-primary-highlight" : ""}>
                    {singleWord}{' '}
                </span>
            )
            }</div>

            {/* <OtherProfile username={username} /> */}
        </>
    )
}











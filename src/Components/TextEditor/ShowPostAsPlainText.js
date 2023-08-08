import React, { useRef, useEffect, useContext } from 'react'
import { createMarkup } from "../../helper/editorhelper";
import { DContext } from '../../Context/DContext';
import { useNavigate } from "react-router-dom";


export default function ShowPostText({ postContent }) {

    const navigate = useNavigate();

    // const { postContent } = props
    console.log('____________________', postContent)

    const {
        checkUsernameExistDContext,
        setSearchState,
        setHashTagClickState,
        isDummyUser,
    } = useContext(DContext);


    const handleClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const name = String(event.target.textContent);
        console.log(name, "name");
        let str = name[0];
        if (str === "@") {
            var newStr = name.replace("@", "");
            console.log(newStr, "newStr");
            const axiosRes = await checkUsernameExistDContext(newStr);
            // console.log('axiosResaxiosResaxiosResaxiosRes', axiosRes)
            if (axiosRes.status === "error") {
                navigate("/notfound");
            } else {
                // localStorage.setItem('sessionUserID', axiosRes.detail._id);
                navigate("/UsersProfile/" + axiosRes.detail.username);
            }
        }

        if (str === "#") {
            if (isDummyUser()) {
                console.log("user not logged in");
                navigate("/login");
            } else {
                setSearchState(null);
                setHashTagClickState(true);
                localStorage.setItem("hashTagName", name);
                navigate("/hashtagPosts");
            }
        }
    };

    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            const atElements = contentRef.current.querySelectorAll(".highlighted");

            atElements.forEach((element) => {
                element.addEventListener("click", handleClick);
            });
        }
    }, [postContent]);

    let content = createMarkup(postContent);

    return (
        <div
            ref={contentRef}
            className="Description-bar ql-editor"
            dangerouslySetInnerHTML={content}
        ></div>
    )
}


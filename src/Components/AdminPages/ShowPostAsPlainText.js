import React, { useRef, useEffect, useContext } from 'react'
import { createMarkup } from "../../helper/editorhelper";
import { DContext } from '../../Context/DContext';
import { useNavigate } from "react-router-dom";


export default function ShowPostText({ postContent }) {

    const navigate = useNavigate();

    // const { postContent } = props

    const {
        checkUsernameExistDContext,
    } = useContext(DContext);


    const handleClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const name = String(event.target.textContent);
        // console.log(name, "name");
        let str = name[0];
        if (str === "@") {
            var newStr = name.replace("@", "");
            // console.log(newStr, "newStr");
            const axiosRes = await checkUsernameExistDContext(newStr);
            console.log('axiosResaxiosResaxiosResaxiosRes', axiosRes)
            if (axiosRes.status === 'error') {
                navigate('/notfound')
            }
            else {
                // localStorage.setItem('sessionUserID', axiosRes.detail._id);
                navigate('/admin/post/' + axiosRes.detail.username)

            }
        }

        if (str === "#") {
            localStorage.setItem("hashTagName", name);
            navigate("/admin/hashtagPosts");
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


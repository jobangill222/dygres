import React, { useEffect, useState, useRef, useContext } from 'react'
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import moment from "moment";
import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
// TimeAgo.addDefaultLocale(en)
import { levelBelowPost } from "../../helper/levelBelowPost";
// import HighLight from "../HighLight";
import { createMarkup } from "../../helper/editorhelper";
import { useNavigate } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import ShowPostText from '../TextEditor/ShowPostAsPlainText';


export default function PostRetweetFrom(props) {

    const timeAgo = new TimeAgo('en-US')

    const { parentPostDetail } = props;
    const navigate = useNavigate();


    const {
        checkUsernameExistDContext,
        isDummyUser,
        setSearchState,
        setHashTagClickState
    } = useContext(DContext);


    const [verificationLevelState, setVerificationLevelState] = useState(0);
    //Verification Level
    useEffect(() => {
        getLevel();
    }, [parentPostDetail])

    const getLevel = async () => {
        // const res = await verificationLevel(parentPostDetail[0]?.user[0]?.isEmailVerify, parentPostDetail[0]?.user[0]?.isPhotoVerify);
        const res = await levelBelowPost(parentPostDetail[0]?.isPostByOfficial, parentPostDetail[0]?.user[0]?.level, parentPostDetail[0]?.user[0]?.isOfficial);

        setVerificationLevelState(res);
    }

    const verificationtooltip = (
        <Tooltip id="verificationtooltip">
            {/* {parentPostDetail[0]?.user[0]?.isEmailVerify === 1 && parentPostDetail[0]?.user[0]?.isPhotoVerify === 0 ? 'Verified Email' : parentPostDetail[0]?.user[0]?.isPhotoVerify === 1 ? "Verified Human" : "No Verification"} */}
            {verificationLevelState && verificationLevelState === 4 ? 'Verified official account' : verificationLevelState === 1 ? 'Verified Email' : verificationLevelState === 2 ? "Verified Human" : "New account"}
        </Tooltip>
    );


    const userThoughtToolTip = (
        <Tooltip id="timerOverToolTip">
            {parentPostDetail[0]?.user[0]?.thoughts || '*crickets*'}
        </Tooltip>
    )



    // const contentRef = useRef(null);

    // useEffect(() => {
    //     if (contentRef.current) {
    //         const atElements = contentRef.current.querySelectorAll(".highlighted");

    // atElements.forEach((element) => {
    //     element.addEventListener("click", handleClick);
    // });
    // }
    // }, [parentPostDetail[0]?.content]);

    // let content = createMarkup(parentPostDetail[0]?.content);

    // const lines = parentPostDetail[0]?.content.split('\n');


    // const handleClick = async (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     const name = String(event.target.textContent);
    //     // console.log(name, "name");
    //     let str = name[0];
    //     if (str === "@") {
    //         var newStr = name.replace("@", "");
    //         // console.log(newStr, "newStr");
    //         const axiosRes = await checkUsernameExistDContext(newStr);
    //         // console.log('axiosResaxiosResaxiosResaxiosRes', axiosRes)
    //         if (axiosRes.status === "error") {
    //             navigate("/notfound");
    //         } else {
    //             // localStorage.setItem('sessionUserID', axiosRes.detail._id);
    //             navigate("/UsersProfile/" + axiosRes.detail.username);
    //         }
    //     }

    //     if (str === "#") {
    //         if (isDummyUser()) {
    //             // console.log("user not logged in");
    //             navigate("/login");
    //         } else {
    //             setSearchState(null);
    //             setHashTagClickState(true);
    //             localStorage.setItem("hashTagName", name);
    //             navigate("/hashtagPosts");
    //         }
    //     }
    // };

    // const contentRef = useRef(null);

    // useEffect(() => {
    //     if (contentRef.current) {
    //         const atElements = contentRef.current.querySelectorAll(".highlighted");

    //         atElements.forEach((element) => {
    //             element.addEventListener("click", handleClick);
    //         });
    //     }
    // }, [parentPostDetail[0]?.content]);

    // let content = createMarkup(parentPostDetail[0]?.content);

    return (
        < div className="digital-feeds diffrentiate-bar" >
            <div className="user-detail-bar">
                <div className="detailleft">
                    <div className="userleftside">
                        <OverlayTrigger placement="top" overlay={userThoughtToolTip} >
                            <div className="avatar-img active">
                                <img src={parentPostDetail[0]?.user[0]?.profileImage || `/images/user.png`} alt="user-img" />
                            </div>
                        </OverlayTrigger>
                        <div className="user-detail">
                            <div className="follow-bar">
                                <h4 className="text-secondry">
                                    {/* {console.log('parentPostDetail', parentPostDetail)} */}
                                    {parentPostDetail[0]?.user[0]?.name ? parentPostDetail[0]?.user[0]?.name : parentPostDetail[0]?.user[0]?.username}
                                </h4>
                            </div>
                            <div className="user-availbility">

                                <h6 className="text-lightgray">@{parentPostDetail[0]?.user[0]?.username || ""}</h6>
                                <h5 className="text-lightgray greentime">{timeAgo.format(moment(parentPostDetail[0]?.created_at)._d.getTime())}</h5>
                            </div>
                            <OverlayTrigger placement="top" overlay={verificationtooltip}>
                                {verificationLevelState === 4 ?
                                    <div className="levelbar text-darkwhite level1">
                                        Official
                                    </div> :
                                    <div className="levelbar text-darkwhite level1">
                                        Level {verificationLevelState}
                                    </div>
                                }
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-preview">
                <div className="Description-bar">
                    <ShowPostText postContent={parentPostDetail[0]?.content ? parentPostDetail[0].content : "loading"} />
                </div>
            </div>
        </div >
    )
}

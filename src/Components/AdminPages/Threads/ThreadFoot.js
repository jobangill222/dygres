import React, { useState, useEffect, useContext } from 'react'
import { AiFillLike } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import { toast } from "react-toastify";
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// import { BsFillFlagFill, BsPencil } from 'react-icons/bs';
// import { ImForward } from 'react-icons/im';
import { RiMessageFill } from 'react-icons/ri';
import { DContext } from "../../../Context/DContext";
import Threads from '.';


export default function ThreadFoot(props) {

    const { disagree_count, agree_count, is_agree, is_disagree, commentID, postID, child_comment_count } = props

    const { agreeUnagreeCommentDContext, disagreeUnDisagreeCommentDContext, setSelectedIDForPopup, setPopupType } = useContext(DContext);


    //States
    const [commentCount, setCommentCount] = useState(child_comment_count);
    const [disagreeCountState, setDisagreeCountState] = useState(disagree_count);
    const [agreeCountState, setAgreeCountState] = useState(agree_count);
    const [isAgreeState, setIsAgreeState] = useState(false);
    const [isDisagreeState, setIsDisagreeState] = useState(false);
    const [isThreadBoxOpen, setIsThreadBoxOpen] = useState(false);


    useEffect(() => {
        if (is_agree === 1) {
            setIsAgreeState(true)
        }
    }, [is_agree])

    useEffect(() => {
        if (is_disagree === 1) {
            setIsDisagreeState(true)
        }
    }, [is_disagree])

    // Aggree Comment
    const agreeComment = async (commentID) => {
        const agreeAxiosRes = await agreeUnagreeCommentDContext(commentID);
        if (agreeAxiosRes.status === "success") {
            if (agreeAxiosRes.action === "agree") {
                let newAgreeCountWhenAgree = agreeCountState + 1;
                setAgreeCountState(newAgreeCountWhenAgree);
                setIsAgreeState(true);
            } else {
                let newAgreeCountWhenUnagree = agreeCountState - 1;
                setAgreeCountState(newAgreeCountWhenUnagree);
                setIsAgreeState(false);
            }
        } else {
            toast(agreeAxiosRes.message);
        }
    };

    // DisAggree Comment
    const DisagreeComment = async (commentID) => {
        const disagreeAxiosRes = await disagreeUnDisagreeCommentDContext(commentID);
        if (disagreeAxiosRes.status === "success") {
            if (disagreeAxiosRes.action === "disagree") {
                let newDisAgreeCountWhenDisAgree = disagreeCountState + 1;
                setDisagreeCountState(newDisAgreeCountWhenDisAgree);
                setIsDisagreeState(true);
            } else {
                let newDisAgreeCountWhenUnDisagree = disagreeCountState - 1;
                setDisagreeCountState(newDisAgreeCountWhenUnDisagree);
                setIsDisagreeState(false);
            }
        }
        else {
            toast(disagreeAxiosRes.message);
        }
    };

    // open popup by set state in selected postid which is global state and set popup stype state
    const viewPopup = async (type) => {
        setSelectedIDForPopup(commentID)
        // console.log('type', type);
        setPopupType(type);
    }



    const [clickTypeState, setClickTypeState] = useState('thread');
    const replyClick = async () => {
        setIsThreadBoxOpen(true)
        setClickTypeState('reply');
    }


    const threadClick = async () => {
        setIsThreadBoxOpen(true)
        setClickTypeState('thread');
        // setIsThreadBoxOpen(!isThreadBoxOpen)
    }


    return (
        <>

            <div className="action-bar">
                <ul className="actionleftbar">

                    <li onClick={() => viewPopup('agreed-comment-user-list')}>
                        <div>
                            <AiFillLike />
                        </div>
                        <div className="list-text" >
                            <span className="number">{agreeCountState}</span>
                            Agree
                        </div>
                    </li>

                    <li onClick={() => viewPopup('disagreed-comment-user-list')}>
                        <div>
                            <AiFillLike />
                        </div>
                        <div className2="list-text"  >
                            <span className="number">{disagreeCountState}</span>
                            Disagree
                        </div>
                    </li>


                    <li>
                        <div className={isThreadBoxOpen ? 'accordionhead active' : 'accordionhead'} onClick={() => setIsThreadBoxOpen(!isThreadBoxOpen)}><FaComments /><span className="number">{commentCount}</span>Threads
                            {/* <div className={isThreadBoxOpen ? 'accordionhead active' : 'accordionhead'} onClick={threadClick}><FaComments /><span className="number">{commentCount}</span>Threads */}
                        </div>
                    </li>



                </ul>

            </div>

            {isThreadBoxOpen &&
                <div className="thredsbar">
                    <Threads isThreadBoxOpen={isThreadBoxOpen} postID={postID} commentID={commentID} setCommentCount={setCommentCount} clickTypeState={clickTypeState} />
                </div>
            }

        </>
    )
}

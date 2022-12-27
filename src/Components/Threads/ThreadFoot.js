import React, { useState, useEffect, useContext } from 'react'
import { AiFillLike } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from "react-toastify";

// import { BsFillFlagFill, BsPencil } from 'react-icons/bs';
// import { ImForward } from 'react-icons/im';
import { RiMessageFill } from 'react-icons/ri';
import { DContext } from "../../Context/DContext";


export default function ThreadFoot(props) {

    const { disagree_count, agree_count, is_agree, is_disagree, commentID } = props

    const { agreeUnagreeCommentDContext, disagreeUnDisagreeCommentDContext, setSelectedIDForPopup, setPopupType } = useContext(DContext);


    const [disagreeCountState, setDisagreeCountState] = useState(disagree_count);
    const [agreeCountState, setAgreeCountState] = useState(agree_count);
    const [isAgreeState, setIsAgreeState] = useState(false);
    const [isDisagreeState, setIsDisagreeState] = useState(false);

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



    // open popup by set state in selected postid which is global state and set popup stype state
    const viewPopup = async (type) => {
        setSelectedIDForPopup(commentID)
        // console.log('type', type);
        setPopupType(type);
    }



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


    return (
        <>

            <div className="action-bar">
                <ul className="actionleftbar">



                    <li>
                        <div
                            className={isAgreeState ? 'active' : ""} onClick={() => agreeComment(commentID)}><AiFillLike /></div>
                        <div className="list-text" onClick={() => viewPopup('agreed-comment-user-list')}>
                            <span className="number">{agreeCountState}</span>
                            Agree
                        </div>
                    </li>
                    {/* <li><FaGift /><span className="number">6</span>Award</li> */}


                    <li>
                        <div
                            className={isDisagreeState ? 'active' : ""} onClick={() => DisagreeComment(commentID)}><AiFillLike /></div>
                        <div className="list-text" onClick={() => viewPopup('disagreed-comment-user-list')} >
                            <span className="number">{disagreeCountState}</span>
                            Disagree
                        </div>
                    </li>



                    <li>
                        <Accordion.Header><FaComments /><span className="number">12</span>Threads</Accordion.Header>
                    </li>
                    <li>
                        <RiMessageFill />Reply
                    </li>
                    {/* <li>
                            <Dropdown className="hoverdropdown">
                                <Dropdown.Toggle className="p-0 bg-transparent border-0 text-lightgray" variant="success" id="dropdown-basic">
                                    <BsFillFlagFill /><span className="number">12</span>Report
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href=""><BsPencil />Edit Post</Dropdown.Item>
                                    <Dropdown.Item ><RiDeleteBin6Line />Delete Post</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li> */}
                </ul>

            </div>

        </>
    )
}

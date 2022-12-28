import React, { useContext, useEffect, useState } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';

import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { DContext } from "../../Context/DContext";
import ThreadHead from './ThreadHead';
import ThreadContent from './ThreadContent';
import ThreadFoot from './ThreadFoot';
import { toast } from "react-toastify";


const Threads = (props) => {

    const { isThreadBoxOpen, postID, setCommentCount, commentID } = props;

    const [commentListState, setCommentListState] = useState([]);

    const { getPostCommentDContext, createCommentDContext, getCommentOfCommentDContext } = useContext(DContext);

    const [isPostComment, setIsPostComment] = useState(false);

    const [pageNumberOfComment, setPageNumberOfComment] = useState(1);


    useEffect(() => {
        // console.log('isThreadBoxOpenisThreadBoxOpen', isThreadBoxOpen)
        if (isThreadBoxOpen) {
            getComment();
        }
    }, [isThreadBoxOpen, isPostComment]);

    const getComment = async () => {
        let axiosRes;
        if (commentID) {
            axiosRes = await getCommentOfCommentDContext(commentID, pageNumberOfComment);
        } else {
            axiosRes = await getPostCommentDContext(postID, pageNumberOfComment);
        }
        // console.log('axiosRes', axiosRes)
        setCommentListState(axiosRes.list);
        setIsPostComment(false);
    }


    // useEffect(() => {
    //     list();
    // }, [pageNumberOfComment])


    // const list = async () => {
    //     let axiosRes;
    //     if (commentID) {
    //         axiosRes = await getCommentOfCommentDContext(commentID, pageNumberOfComment);
    //     } else {
    //         axiosRes = await getPostCommentDContext(postID, pageNumberOfComment);
    //     }
    //     // console.log('axiosRes', axiosRes)
    //     setCommentListState((current) => [...current, ...axiosRes.list]);
    // }




    const [createCommentState, setCreateCommentState] = useState("");
    //Submit post
    const submitComment = async () => {
        if (!createCommentState) {
            toast("Comment cannot be empty.");
        } else {
            try {
                const axiosRes = await createCommentDContext(postID, commentID, createCommentState);
                if (axiosRes.status === "success") {
                    setIsPostComment(true);
                    toast(axiosRes.message);
                    // Make field empty afetr comment
                    setCreateCommentState("");
                    //Inc comment count
                    setCommentCount((previousState) => previousState + 1);
                } else {
                    toast(axiosRes.message);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <>

            <div className='accordionitem'>

                {commentListState.length ?
                    <>
                        {commentID ? '' : <h4>Threads</h4>}
                        {commentListState.map((comment, index) => {

                            if (index < 2) {

                                return <div key={comment._id}>
                                    <ThreadHead user={comment.user} created_at={comment.created_at} />
                                    <div className='threads-rows'>
                                        <div className="user-preview">

                                            <ThreadContent content={comment.comment} />
                                            <ThreadFoot postID={postID} is_agree={comment.is_agree} is_disagree={comment.is_disagree} agree_count={comment.agree_count} disagree_count={comment.disagree_count} commentID={comment._id} child_comment_count={comment.child_comment_count} />

                                        </div>
                                        <div className='thredsbar thredsbar-inner'>
                                            {/* <Threads /> */}
                                        </div>

                                    </div>
                                </div>
                            } else {
                                return
                                <>
                                </>
                            }

                        })}
                    </>
                    : commentID ? <span className='no-comment'>No Reply</span>
                        : <span className='no-comment'>No comments</span>}

                {commentListState.length > 2 ?
                    <>
                        {/* <div className='viewmore' onClick={() => { setPageNumberOfComment((previousState) => previousState + 1) }}>View more</div> */}
                        <div className='viewmore' >View more</div>
                    </> : ""
                }




                <div className='reply-post'>
                    <Form>
                        <Form.Group className='replyinput' controlId="formBasicEmail">
                            <Form.Control type="text" name="comment"
                                value={createCommentState}
                                max="420"
                                onChange={(e) => {
                                    setCreateCommentState(e.target.value);
                                }}
                                placeholder="What are your thoughts............?" />
                        </Form.Group>
                        <Button className="btn " onClick={submitComment}>
                            Post
                        </Button>
                    </Form>
                </div>
            </div>



        </>
    );
}

export default Threads;
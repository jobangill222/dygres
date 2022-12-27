import React, { useContext, useEffect, useState } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';

import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import { DContext } from "../../Context/DContext";
import ThreadHead from './ThreadHead';
import ThreadContent from './ThreadContent';
import ThreadFoot from './ThreadFoot';
import { toast } from "react-toastify";


const Threads = (props) => {

    const { isThreadBoxOpen, postID } = props;

    const [commentListState, setCommentListState] = useState([]);

    const { getPostCommentDContext, createCommentDContext } = useContext(DContext);

    const [isPostComment, setIsPostComment] = useState(false);

    useEffect(() => {
        // console.log('isThreadBoxOpenisThreadBoxOpen', isThreadBoxOpen)
        if (isThreadBoxOpen) {
            getComment();
        }
    }, [isThreadBoxOpen, isPostComment]);

    const getComment = async () => {
        const pageNumberOfComment = 1;
        const axiosRes = await getPostCommentDContext(postID, pageNumberOfComment);
        // console.log('axiosRes', axiosRes)
        setCommentListState(axiosRes.list);
        setIsPostComment(false);
    }

    const [createCommentState, setCreateCommentState] = useState("");
    //Submit post
    const submitComment = async () => {
        if (!createCommentState) {
            toast("Comment cannot be empty.");
        } else {
            // console.log("createCommentState", createCommentState);
            //   alert("comment successfully.");
            try {
                const axiosRes = await createCommentDContext(postID, createCommentState);
                if (axiosRes.status === "success") {
                    setIsPostComment(true);
                    toast(axiosRes.message);
                    // setIsPostComment(false);
                    setCreateCommentState("");
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
            <Accordion >
                <Accordion.Item eventKey="0">

                    {commentListState.length ?
                        <>
                            <h4>Threads</h4>
                            {commentListState.map((comment) => (

                                <>
                                    {console.log('comment', comment)}
                                    <ThreadHead user={comment.user} created_at={comment.created_at} />
                                    <div className='threads-rows'>
                                        <div className="user-preview">

                                            <ThreadContent content={comment.comment} />
                                            <ThreadFoot />

                                        </div>
                                        <Accordion.Body className='thredsbar thredsbar-inner'>
                                            {/* <Threads /> */}
                                        </Accordion.Body>

                                    </div>
                                </>
                            ))}
                        </>

                        : <span className='no-comment'>No comments</span>}

                    {commentListState.length > 2 ?
                        <>
                            <span>View more</span>
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
                </Accordion.Item>
            </Accordion>


        </>
    );
}

export default Threads;
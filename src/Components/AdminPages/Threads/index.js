import React, { useContext, useEffect, useState, useRef } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';

import { DContext } from "../../../Context/DContext";
import ThreadHead from './ThreadHead';
import ThreadContent from './ThreadContent';
import ThreadFoot from './ThreadFoot';
import { toast } from "react-toastify";


const Threads = (props) => {

    const { isThreadBoxOpen, postID, setCommentCount, commentID } = props;

    const [commentListState, setCommentListState] = useState([]);

    const { getPostCommentDContext, createCommentDContext, getCommentOfCommentDContext } = useContext(DContext);

    const [pageNumberOfComment, setPageNumberOfComment] = useState(1);
    const [paginationData, setPaginationData] = useState(null);



    useEffect(() => {
        // console.log('isThreadBoxOpenisThreadBoxOpen', isThreadBoxOpen)
        if (isThreadBoxOpen) {
            getComment();
        }
    }, [isThreadBoxOpen]);

    const getComment = async () => {
        console.log('aaa');
        let axiosRes;
        let initialPageNumberOfComment = 1;
        if (commentID) {
            axiosRes = await getCommentOfCommentDContext(commentID, initialPageNumberOfComment);
        } else {
            axiosRes = await getPostCommentDContext(postID, initialPageNumberOfComment);
        }
        console.log('axiosRes get comments', axiosRes)
        setPaginationData(axiosRes.paginationData)
        setCommentListState(axiosRes.list);
    }



    const [createCommentState, setCreateCommentState] = useState("");
    //Submit post
    const submitComment = async () => {
        if (!createCommentState) {
            toast("Maybe enter some text before you clickety-click?");
        } else {
            try {
                const axiosRes = await createCommentDContext(postID, commentID, createCommentState);
                if (axiosRes.status === "success") {
                    toast(axiosRes.message);
                    // Make field empty afetr comment
                    setCreateCommentState("");
                    //Inc comment count
                    setCommentCount((previousState) => previousState + 1);

                    // Insert new comment in state
                    setCommentListState((current) => [...axiosRes.data, ...current]);
                    //Scroll to Mail comment div
                    scollToRef.current.scrollIntoView()
                    if (commentListState.length >= 5) {
                        // Remove last comment from state
                        commentListState.pop();
                    }

                } else {
                    toast(axiosRes.message);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };


    const viewMoreComments = () => {
        console.log('View more clicked.')
        setPageNumberOfComment((previousState) => previousState + 1)
    }


    useEffect(() => {
        if (pageNumberOfComment > 1) {
            list();
        }
    }, [pageNumberOfComment])


    const list = async () => {
        console.log('pageNumberOfComment', pageNumberOfComment)
        let axiosRes;
        if (commentID) {
            axiosRes = await getCommentOfCommentDContext(commentID, pageNumberOfComment);
        } else {
            axiosRes = await getPostCommentDContext(postID, pageNumberOfComment);
        }
        console.log('axiosRes get comments', axiosRes)
        console.log('axioaxiosRes.list.lengthsRes', axiosRes.list.length)
        if (axiosRes.list.length) {
            console.log('append list');
            setPaginationData(axiosRes.paginationData)
            setCommentListState((current) => [...current, ...axiosRes.list]);
        }
    }

    const scollToRef = useRef();


    return (
        <>

            <div className='accordionitem' ref={scollToRef}>


                {commentListState.length ?
                    <>
                        {commentID ? '' : <h4>Threads</h4>}
                        {commentListState.map((comment, index) => {

                            // if (index < 2) {

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
                            // } else {
                            //     return
                            //     <>
                            //     </>
                            // }

                        })}
                    </>
                    : commentID ? <span className='no-comment'>No Reply</span>
                        : <span className='no-comment'>No comments</span>
                }


                {paginationData?.currentPage < paginationData?.totalNumberOfPages ?
                    <>
                        {/* <div className='viewmore' onClick={() => { setPageNumberOfComment((previousState) => previousState + 1) }}>View more</div> */}
                        <div className='viewmore' onClick={viewMoreComments}>View more</div>
                        {/* <div className='viewmore' >View more</div> */}
                    </> : ""
                }





            </div>



        </>
    );
}

export default Threads;
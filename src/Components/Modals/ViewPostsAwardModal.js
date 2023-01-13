import React, { useState, useContext, useEffect } from 'react'
// import {
//     AiOutlinePlus,
// } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { DContext } from "../../Context/DContext";


const ViewPostsAwardModal = (props) => {

    const { viewMoreAwardOfPost, setViewMoreAwardOfPost } = props;

    const { postIDForAwardOfPost, setPostIDForAwardOfPost, getAwardOfPostDContext } = useContext(DContext);

    const PostAwardsClose = () => {

        setViewMoreAwardOfPost(false);
        setPostIDForAwardOfPost(null)
    }

    useEffect(() => {
        list();
    }, [])


    const [awardListState, setAwardListState] = useState([]);
    const list = async () => {
        const axiosRes = await getAwardOfPostDContext(postIDForAwardOfPost);
        setAwardListState(axiosRes.awardList[0].postAward)
    }

    return (

        <>
            <Modal
                className="Actions-modal viewpostawardsmodal awards-modal z-1050"
                show={viewMoreAwardOfPost}
                onHide={PostAwardsClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Post Awards</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <ul className="awards-bar ">
                            {/* {console.log('awardListState', awardListState)} */}


                            {awardListState.map((award) => (
                                <li className="text-whitesure">
                                    <img src={award.awardDetail[0].image} alt="awards" />{award.awardCount}
                                </li>
                            ))}

                        </ul>

                    </Row>
                </Modal.Body>
            </Modal>

        </>
    )
}


export default ViewPostsAwardModal;

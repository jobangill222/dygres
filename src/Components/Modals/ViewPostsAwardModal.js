import React, { useState, useContext, useEffect } from 'react'
// import {
//     AiOutlinePlus,
// } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { DContext } from "../../Context/DContext";


const ViewPostsAwardModal = () => {

    const { } = useContext(DContext);
    // console.log('selectedPostIDForAwardPopup', selectedPostIDForAwardPopup);


    const [viewPostAwards, setViewPostAwards] = useState(true);

    const PostAwardsClose = () => {
        setViewPostAwards(false);
        // setSelectedPostIDForAwardPopup(null);
    }

    useEffect(() => {
        // AwardListToSend();
    }, [])


    return (

        <>
            <Modal
                className="Actions-modal viewpostawardsmodal awards-modal z-1050"
                show={viewPostAwards}
                onHide={PostAwardsClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Post Awards</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                                <ul className="awards-bar ">
                                    <li className="text-whitesure">
                                        <img src="/images/user.png" alt="awards" />3
                                    </li>
                                </ul>

                    </Row>
                </Modal.Body>
            </Modal>

        </>
    )
}


export default ViewPostsAwardModal;

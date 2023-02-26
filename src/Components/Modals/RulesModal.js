import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { ImFacebook } from "react-icons/im";
import { AiOutlineTwitter } from "react-icons/ai";

export default function RulesModal(props) {

    const { setIsShowRulesModal } = props;

    const closePopup = async () => {
        setIsShowRulesModal(false)
    }

    return (
        <>
            <Modal
                className="Actions-modal awards-modal welcomepopup rules-sestion"
                show={true}
                onHide={closePopup}
                centered
            >
                <Modal.Header >
                    <Modal.Title>Levels</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='welcomepopupbar rule-section'>
                            <p>Level 0 - New account</p>
                            <p>Level 1 - Email verified</p>
                            <p>Level 2 - Verified human account</p>
                            <p>Official - Verified official account</p>
                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}


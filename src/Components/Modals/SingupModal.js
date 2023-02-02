import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

export default function SignupModal(props) {

    const { setIsShowSignupModal } = props;

    const closePopup = async () => {
        setIsShowSignupModal(false)
        window.location.replace('https://www.google.com/');
    }

    return (
        <>
            <Modal
                className="Actions-modal awards-modal"
                show={true}
                onHide={closePopup}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Welcome</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>

                        <h1>Welcome to dygres</h1>

                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}


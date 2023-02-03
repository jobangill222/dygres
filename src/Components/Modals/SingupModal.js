import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

export default function SignupModal(props) {

    const { setIsShowSignupModal, username } = props;

    const closePopup = async () => {
        setIsShowSignupModal(false)
        window.location.replace('https://dygres.com/');
    }

    return (
        <>
            <Modal
                className="Actions-modal awards-modal welcomepopup"
                show={true}
                onHide={closePopup}
                centered
            >
                <Modal.Header >
                    <Modal.Title>WELCOME TO THE REBELLION!</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='welcomepopupbar'>
                            <p><b>@{username},</b> thank you for reserving your username and joining the dygres beta.dygres will go LIVE on <b>XXXX (DATE).</b></p>
                            <p>Keep an eye on your inbox as we will be sending out important login details closer to release day. Make sure to check your spam folder, just in case.</p>
                            <h4>Conversation is more fun with your friends.</h4>
                            <p>Want to be a social network hero?</p>
                            <p>Share dygres with your friends.</p>

                            <button className='btnprimary' onClick={closePopup} >Return to landing page</button>
                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}


import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

export default function HelpCenterModal(props) {

    const { isShowHelpCenterModal, setIsShowHelpCenterModal } = props;

    const closePopup = async () => {
        setIsShowHelpCenterModal(false)
    }

    return (
        <>
            <Modal
                className="Actions-modal awards-modal welcomepopup rules-sestion"
                show={true}
                onHide={closePopup}
                centered
            >
                <Modal.Header  >
                    <Modal.Title className='justify-content-center'>Contact Support</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='welcomepopupbar'>
                            <p>Get in touch via email: <b>support@dygres.com</b></p>
                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}


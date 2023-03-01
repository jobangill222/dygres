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
                <Modal.Header >
                    <Modal.Title>Help Center</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='welcomepopupbar rule-section'>
                            <p>support@dygres.com</p>
                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}


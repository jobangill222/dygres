import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";


export default function TermConditionModal(props) {

    const { isShowTermConditionPopup, setIsShowTermConditionModal } = props;

    const closePopup = async () => {
        setIsShowTermConditionModal(false)
    }

    return (
        <>
            <Modal
                className="Actions-modal awards-modal welcomepopup"
                show={isShowTermConditionPopup}
                onHide={closePopup}
                centered
            >
                <Modal.Header >
                    <Modal.Title>Term & Conditions</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='welcomepopupbar'>

                            <button className='btnprimary' onClick={closePopup} >Return to landing page</button>
                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}


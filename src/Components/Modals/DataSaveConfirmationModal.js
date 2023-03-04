import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { ImFacebook } from "react-icons/im";
import { AiOutlineTwitter } from "react-icons/ai";
import { DContext } from "../../Context/DContext";


export default function DataSaveConfirmationModal() {

    const { saveTxStateForRetry, setIsShowDataSaveConfirmationPopup } = useContext(DContext);


    const closePopup = async () => {
        setIsShowDataSaveConfirmationPopup(false)
    }

    return (
        <>
            <Modal
                className="Actions-modal awards-modal welcomepopup rules-sestion beforeproceed-sestion"
                show={true}
                onHide={closePopup}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation alert</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='welcomepopupbar  beforeproceed'>
                            <p>You have unsaved changes. Please click save to save any changes you have made.</p>
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={closePopup} >Close </button>
                    <button className='btn btn-primary' onClick={() => {
                        saveTxStateForRetry.retry();
                        setIsShowDataSaveConfirmationPopup(false)
                    }}>Go Anyway</button>

                </Modal.Footer>
            </Modal>
        </>
    )
}


import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import {InputGroup, Form} from 'react-bootstrap'
import { AiOutlineCopy } from "react-icons/ai";
import { MdCopyAll, MdOutlineContentCopy } from "react-icons/md";

export default function ReferModal(props) {

    const { isShowReferModal, setIsShowReferModal } = props;

    const closePopup = async () => {
        setIsShowReferModal(false)
    }

    return (
        <>
            <Modal
                className="Actions-modal welcomepopup "
                show={true}
                onHide={closePopup}
                centered
                size="lg"
            >
                <Modal.Header  closeButton className="refer_header">
                    <Modal.Title >Refer Dygres </Modal.Title>
                    <div><p className="mb-0 totalshare">Total Shares: <span>6</span></p></div>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div>
                            <p>Refer dygres to your friend and earn referral points. Lorem ispum is a dummy text used to display dummy content for content creators.</p>
                        </div>
                        <div>
                        <InputGroup className="mt-3 refer_input">
        <Form.Control
          placeholder="Link Address"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2"><MdOutlineContentCopy size={22} color="var(--base-green)"/></InputGroup.Text>
      </InputGroup>

                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}


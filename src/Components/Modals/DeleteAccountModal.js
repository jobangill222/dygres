import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { DContext } from "../../Context/DContext";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export default function DeleteAccountModal(props) {

    const navigate = useNavigate();

    const { isDeleteAccountState, setIsDeleteAccountState } = props;

    const { user, setUser, setUserToken, deleteUserDContext } = useContext(DContext);


    const closePopup = async () => {
        setIsDeleteAccountState(false)
    }

    const [deleteFieldState, setDeleteFieldState] = useState(null);

    const deleteAccountHandler = async () => {
        const deleteBy = 'user';

        const axiosRes = await deleteUserDContext(deleteBy, user._id);

        if (axiosRes.status === 'success') {
            setUser(null);
            setUserToken(null);
            localStorage.removeItem("accessToken");
            navigate("/login");
            toast('Account has been deleted successfully.')

        } else {
            toast(axiosRes.message)
        }
    }

    return (
        <>
            <Modal
                className="Actions-modal awards-modal welcomepopup rules-sestion beforeproceed-sestion"
                show={isDeleteAccountState}
                onHide={closePopup}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation alert</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='welcomepopupbar  beforeproceed'>
                            <p>Type <b>Delete</b> below to delete your account.</p>
                        </div>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Enter Delete."
                                onChange={(e) => setDeleteFieldState(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={closePopup} >Close </button>
                    <button className='btn btn-primary' disabled={deleteFieldState && deleteFieldState.toLowerCase() === 'delete' ? false : true} onClick={deleteAccountHandler} >Delete</button>

                </Modal.Footer>
            </Modal>
        </>
    )
}


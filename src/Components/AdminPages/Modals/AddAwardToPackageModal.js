import React, { useContext, useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DContext } from "../../../Context/DContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function AddAwardToPackageModal(props) {

    const navigate = useNavigate();

    const { addAwardPopupState, setAddAwardPopupState, packageID, setAddAwardSubmitState } = props;

    const { getAwardListDContext, addAwardToPackageAdminDContext } = useContext(DContext);

    const closeModal = () => { setAddAwardPopupState(false) }

    const [paidAwardListState, setPaidAwardListState] = useState([]);
    useEffect(() => {
        getPaidAwards();
    }, [])


    const getPaidAwards = async () => {
        const type = 'paid';
        const axiosRes = await getAwardListDContext(type);
        // console.log('axiosResaxiosResaxiosRes', axiosRes);
        setPaidAwardListState(axiosRes.list)
    }


    const [selectedAwardState, setSelectedAwardState] = useState(null);
    const [awardCountState, setAwardCountState] = useState(null);

    const addAwardToPackageSubmit = async (event) => {
        event.preventDefault();
        if (!selectedAwardState) {
            toast('Please select award.');
            return;
        }
        if (!awardCountState) {
            toast('Please enter award count.');
            return;
        }

        const axiosRes = await addAwardToPackageAdminDContext(packageID, selectedAwardState, awardCountState)
        console.log('axiosRes', axiosRes)
        if (axiosRes.status === 'success') {
            toast('Award added to package.');
            setAddAwardPopupState(false)
            setAddAwardSubmitState(true);
        }
    }

    return (

        <div>

            <Modal
                className="Actions-modal Editreportmodal"
                onHide={closeModal}
                show={addAwardPopupState}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select Award</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form>

                        <Row>
                            {paidAwardListState.length ? paidAwardListState.map((award) => (
                                <Col className="col-md-4" key={award._id} onClick={() => setSelectedAwardState(award._id)} >
                                    <div className="Awrds-li">
                                        <div className={selectedAwardState && selectedAwardState.includes(award._id) ? 'active awards - img' : 'awards - img'}>
                                            < img src={award?.image ? award.image : "/gif/thumbsdown2.gif"} alt="img" />
                                            <h5>{award?.name ? award?.name : ''}</h5>
                                        </div>
                                    </div>
                                </Col>
                            )) : <>
                                {/* <img src="/images/empty.png" alt='dummy' /> */}
                                <div className="empty-bar">
                                    <img src="/images/empty.png" alt='dummy' />
                                    <h4>No Award</h4>
                                </div>
                            </>}

                        </Row>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Award Count</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Award Count."
                                onChange={(e) => setAwardCountState(e.target.value)}
                                required
                            />
                        </Form.Group>


                        <Form.Group>
                            <Button variant="primary" type="submit" onClick={addAwardToPackageSubmit}  >
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body >
            </Modal >



        </div >
    )
}

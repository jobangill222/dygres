import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsUpload } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { MdOutlineSave } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
const PersonalInformation = () => {

    // Password change Modal
    const [ResetShow, setPassShow] = useState(false);
    const ResetClose = () => setPassShow(false);
    const Resetpass = () => setPassShow(true);

    return (
        <>
            <div className="Profile-Upload-media">
                <Row>
                    <Col lg="6">
                        <div className="account-verify">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Group className="verify-input" controlId="">
                                <Form.Control type="email" placeholder="amans@gmail.com" />
                                <Button className="outline-primary text-white">Verify E-mail</Button>
                            </Form.Group>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="text-end save-form-btn">
                            <Button className="bg-primary text-white me-3"><MdOutlineSave className="me-2" />Save</Button>
                            <Button className="outline-primary text-white"><ImCross className="me-2" /> Cancel</Button>
                        </div>
                    </Col>
                    <div className="Userdetail-editorbar">
                        <Row>
                            <Col lg="6 ">
                                <Form.Group className="editor-input " controlId="">
                                    <Form.Label>Upload verification image</Form.Label>
                                    <div className="upload-media-verify">
                                        <Button className="bg-primary text-white ">
                                            <input type="file" />
                                            <BsUpload className="me-2" />Upload Image</Button>
                                    </div>
                                </Form.Group>
                                <Form.Group className="editor-input" controlId="">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" placeholder="+91 9874561230" />
                                </Form.Group>
                                <div className="editor-input account-verify ">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Group className="verify-input passwrd-verify" controlId="">
                                        <Form.Control type="password" placeholder="amans@gmail.com" />
                                        <Button onClick={Resetpass} className="resetbtn text-white">Reset Password</Button>
                                    </Form.Group>
                                </div>
                                <Form.Group className="editor-input" controlId="">
                                    <Form.Label>Region</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Region</option>
                                        <option value="1">India</option>
                                        <option value="2">Afghanistan</option>
                                        <option value="3">Bahrain</option>
                                        <option value="3">Canada</option>
                                        <option value="3">Cuba</option>
                                        <option value="3">Pakistan</option>
                                        <option value="3">Saudi Arabia</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </div>
            {/* Password change modal */}
            <Modal className="Actions-modal" show={ResetShow} onHide={ResetClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="editor-input" controlId="">
                        <Form.Label>Type old password</Form.Label>
                        <Form.Control type="password" placeholder="......." />
                    </Form.Group>
                    <Form.Group className="editor-input" controlId="">
                        <Form.Label>Type new password</Form.Label>
                        <Form.Control type="password" placeholder="......." />
                    </Form.Group>
                    <Form.Group className="editor-input" controlId="">
                        <Form.Label>Re-type new password</Form.Label>
                        <Form.Control type="password" placeholder="......." />
                    </Form.Group>
                    <div className="text-end save-form-btn">
                        <Button className="bg-primary text-white">Submit</Button>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default PersonalInformation;
import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { BsThreeDotsVertical, BsFilePost, BsFlag } from 'react-icons/bs';
import { MdBlock } from 'react-icons/md';
import { BiIdCard , BiSearch } from 'react-icons/bi';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Users = () => {

    // Aggree Modal
    const [showBlock, setShowBlock] = useState(false);
    const BlockClose = () => setShowBlock(false);
    const BlockShow = () => setShowBlock(true);

    return (
        <>
            <Container>
                <div className="dashboard-title-bar">
                    <Row>
                        <Col lg="8"><h4>users</h4></Col>
                        <Col lg="4">
                            <div className="Titlebar-btns">
                                <Button onClick={BlockClose} className="bg-primary text-white">Send Notification</Button>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <BiSearch/>
                                    <Form.Control type="text" placeholder="Search for users" />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="usertable">
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>Display Name</th>
                                <th>Username</th>
                                <th>E-mail</th>
                                <th>Phone number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hannah Koph </td>
                                <td>@iamhannah</td>
                                <td>hannah@gmail.com</td>
                                <td>
                                    <div className="number-bar">
                                        <p>+91 9874563210</p>
                                        <div className="user-dropdown">
                                            <BsThreeDotsVertical />
                                            <ul className="Dropdown-listing">
                                                <li className="text-secondry">
                                                    <Link onClick={BlockShow}><MdBlock />Block</Link>
                                                </li>
                                                <li className="text-secondry">
                                                    <Link to="/profile"><BsFilePost />Posts</Link>
                                                </li>
                                                <li className="text-secondry">
                                                    <Link to="/profile"><BsFlag />Flagged Posts</Link>
                                                </li>
                                                <li className="text-secondry">
                                                    <Link to="/profile"><BiIdCard />User Verification</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Container>
            {/* Aggree modal */}
            <Modal className="Admin-modal" show={showBlock} onHide={BlockClose} centered>

                <Modal.Body>
                    <p>Are you sure you want to block this user</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-end">
                        <Button onClick={BlockClose} className="outline-primary text-white">Cancel</Button>
                        <Button onClick={BlockClose} className="bg-primary text-white">Confirm</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Users;
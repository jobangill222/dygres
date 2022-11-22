import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TbCameraPlus } from 'react-icons/tb';
import { ImCross } from 'react-icons/im';
import { MdOutlineSave } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const GeneralInformation = () => {
    return (
        <>
            <div className="Profile-Upload-media">
                <Row>
                    <Col lg="6">
                        <div className="Uploaded-user">
                            <div className="Imagebar">
                                <img src="/images/user172.png" alt="icon" />
                                <div className="userup-in">
                                    <div className="typefile">
                                        <input type="file" />
                                        <TbCameraPlus />
                                    </div>
                                </div>
                            </div>
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
                                <Form.Group className="editor-input" controlId="">
                                    <Form.Label>Display Name</Form.Label>
                                    <Form.Control type="text" placeholder="Amanpreet Singh" />
                                </Form.Group>
                                <Form.Group className="editor-input" controlId="">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="@amans" />
                                </Form.Group>
                            </Col>
                            <Col lg="12">
                                <Form.Group className="editor-input" controlId="">
                                    <Form.Label>A penny for your thoughts?</Form.Label>
                                    <Form.Control type="text" placeholder="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter." />
                                </Form.Group>
                                <Form.Group className="editor-input" controlId="">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control as="textarea" rows={6} type="text" placeholder="My Journey has been humbling and the learnings have been immense.For me, Entrepreneurship was the art of solving customers’ pain points, not just building a company.A quick timeline:Sold greeting cards as a 10-12year old. Earned enough to buy my own ice creams.Started 1st company to help my fellow college mates avoid the not so good mess food, gave them access to mobility by providing them bikes on rent. The company was called MyRide which after 2 years got acquired by ONN Bikes. Played the Role of Co-founder & COO at ONN. Here we were solving mobility at a scale, a tech first company providing bikes on rent.Scaled to a team of 200+ in 11 cities with a valuation of 250 crores under 4 years. With the excitement to build more sustainable and global business, I exited ONN. EMotorad was born. EMotorad is trying to solve the first/last mile commute with EV. EMotorad is manufacturing futuristic affordable electric bikes for providing cleaner, greener & healthier commute options. With strategic horns throughout the journey, EMotorad is my new birth for changing the commute habits. " />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </div>
        </>
    );
}

export default GeneralInformation;
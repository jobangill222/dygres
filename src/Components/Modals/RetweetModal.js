import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function SingleAward(props) {


    return (
        <>

            {/* Aggree modal */}
            <Modal className="Actions-modal" show="true" onHide="false" centered >

                <Modal.Header closeButton>
                    <Modal.Title>
                        Amplify</Modal.Title>
                </Modal.Header>
                <Modal.Body className="retweetmodal">
                    <div className="digital-feeds feed-type">
                        <div className="user-detail-bar">
                            <div className="detailleft">
                                <div className="userleftside">
                                    <div className="avatar-img active">
                                        <img src="./images/user.png" alt="user-img" />
                                    </div>
                                    <div className="user-detail">
                                        <div className="follow-bar">
                                            <h4 className="text-secondry">
                                                Amanpreet Singh
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-preview">
                            <div className="Description-bar">
                                <Form>
                                    <Form.Group className='feedtype-textarea' controlId="formBasicEmail">
                                        <Form.Control type="text" style={{ height: '110px' }}

                                            as="textarea"
                                            max="420"
                                            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="digital-feeds ">
                        <div className="user-detail-bar">
                            <div className="detailleft">
                                <div className="userleftside">
                                    <div className="avatar-img active">
                                        <img src="./images/user.png" alt="user-img" />
                                    </div>
                                    <div className="user-detail">
                                        <div className="follow-bar">
                                            <h4 className="text-secondry">
                                                Amanpreet Singh
                                            </h4>
                                        </div>
                                        <div className="user-availbility">
                                            <h6 className="text-lightgray">@iamhannah</h6>
                                            <h5 className="text-lightgray greentime">1hr ago</h5>
                                        </div>
                                        <div className="levelbar text-darkwhite level1">
                                            Level 3
                                            <h6 className="level1-circle">
                                                <span className="text-white lvlstar">3</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-preview">
                            <div className="Description-bar">
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-end m-0">
                        <Button className="outline-primary text-white mx-4">Cancel</Button>
                        <Button className="bg-primary text-white">Post</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

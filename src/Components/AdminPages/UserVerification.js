import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const UserVerification = () => {

    return (
        <>
            <Container>
                <div className="dashboard-title-bar">
                    <Row>
                        <Col lg="12">
                            <h4>User Verification</h4>
                        </Col>
                    </Row>
                </div>
                <div className="verification-bar ">
                    <div className="user-detail-bar">
                        <div className="detailleft">
                            <div className="avatar-img">
                                <img src="/images/user.png" alt="user-img" />
                            </div>
                            <div className="user-detail">
                                <h4 className="text-secondry">Amanpreet Singh</h4>
                                <div className="user-availbility">
                                    <h6 className="text-lightgray">@amans</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="verification-media-upload">
                        <div className="mediabar">
                            <img src="/images/user-verify.png" alt="img"/>
                        </div>
                        <div className="verify-content">
                            <div className="formbar">
                                <label>E-mail:</label>
                                <h5>amans@gmail.com</h5>
                            </div>
                            <div className="formbar">
                                <label>Phone number:</label>
                                <h5>+91 9874563210</h5>
                            </div>
                            <div className="formbar">
                                <label>Number Assigned for verification:</label>
                                <h5>45</h5>
                            </div>
                            <div className="formbarbtn">
                                <Button className="bg-primary text-white">Verify</Button>
                                <Button className="outline-primary text-white">Decline</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="verification-bar">
                    <div className="user-detail-bar">
                        <div className="detailleft">
                            <div className="avatar-img">
                                <img src="/images/user.png" alt="user-img" />
                            </div>
                            <div className="user-detail">
                                <h4 className="text-secondry">Amanpreet Singh</h4>
                                <div className="user-availbility">
                                    <h6 className="text-lightgray">@amans</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="verification-media-upload">
                        <div className="mediabar">
                            <img src="/images/user-verify.png" alt="img"/>
                        </div>
                        <div className="verify-content">
                            <div className="formbar">
                                <label>E-mail:</label>
                                <h5>amans@gmail.com</h5>
                            </div>
                            <div className="formbar">
                                <label>Phone number:</label>
                                <h5>+91 9874563210</h5>
                            </div>
                            <div className="formbar">
                                <label>Number Assigned for verification:</label>
                                <h5>45</h5>
                            </div>
                            <div className="formbarbtn">
                                <Button className="bg-primary text-white">Verify</Button>
                                <Button className="outline-primary text-white">Decline</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

        </>
    );
}

export default UserVerification;
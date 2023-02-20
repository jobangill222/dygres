import React, { useEffect, useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";

const UserVerification = () => {


    let { userIDForVerification } = useParams();

    const { humanVerificationDetailDContext, acceptRejectHumanVerificationDContext } = useContext(DContext);

    const [humanVerificationDetailState, setHumanVerificationDetailState] = useState(null);

    const [acceptRejectTrigger, setAcceptRejectTrigger] = useState(false);

    useEffect(() => {
        // console.log('userIDForVerificationuserIDForVerification', userIDForVerification)
        getDetail();
    }, [userIDForVerification, acceptRejectTrigger])


    const getDetail = async () => {
        const axiosRes = await humanVerificationDetailDContext(userIDForVerification);
        console.log('axiosResaxiosRes', axiosRes);
        setHumanVerificationDetailState(axiosRes.detail);
    }


    const declineVerification = async (userID) => {
        const action = "reject";
        const axiosRes = await acceptRejectHumanVerificationDContext(userID, action);
        console.log('axiosRes', axiosRes)
        if (axiosRes.status === "success") {
            toast('Verification rejected.');
            setAcceptRejectTrigger(true);
        } else {
            toast(axiosRes.message);
        }
    }

    const acceptVerification = async (userID) => {
        const action = "accept";
        const axiosRes = await acceptRejectHumanVerificationDContext(userID, action);
        if (axiosRes.status === "success") {
            toast('Verification accepted.');
            setAcceptRejectTrigger(true);
        } else {
            toast(axiosRes.message);
        }
    }


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
                            <div className="userleftside">
                                <div className="avatar-img">
                                    <img src={humanVerificationDetailState && humanVerificationDetailState?.profileImage ? humanVerificationDetailState.profileImage : "/images/user.png"} alt="user-img" />
                                </div>
                                <div className="user-detail">
                                    <h4 className="text-secondry">{humanVerificationDetailState && humanVerificationDetailState?.name ? humanVerificationDetailState.name : 'No name'}</h4>
                                    <div className="user-availbility">
                                        <h6 className="text-lightgray">@{humanVerificationDetailState && humanVerificationDetailState.username}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="verification-media-upload">
                        {humanVerificationDetailState && humanVerificationDetailState.isPhotoVerify === 3 ?
                            <div className="mediabar">
                                <img src={humanVerificationDetailState && humanVerificationDetailState?.verificationImage ? humanVerificationDetailState.verificationImage : "/images/user-verify.png"} alt="img" />
                            </div>
                            : null
                        }

                        <div className="verify-content">
                            <div className="formbar">
                                <label>E-mail:</label>
                                <h5>{humanVerificationDetailState && humanVerificationDetailState.email}</h5>
                            </div>
                            <div className="formbar">
                                <label>Phone number:</label>
                                <h5>{humanVerificationDetailState && humanVerificationDetailState?.phoneNumber ? humanVerificationDetailState.phoneNumber : 'No Phone Number'}</h5>
                            </div>
                            <div className="formbar">
                                <label>Number Assigned for verification:</label>
                                <h5>{humanVerificationDetailState?.photoVerificationCode}</h5>
                            </div>
                            <div className="formbarbtn">
                                {humanVerificationDetailState && humanVerificationDetailState.isPhotoVerify === 3 ?
                                    <>
                                        <Button className="bg-primary text-white" onClick={() => acceptVerification(humanVerificationDetailState?._id)}>Verify</Button>
                                        <Button className="outline-primary text-white" onClick={() => declineVerification(humanVerificationDetailState?._id)} >Decline</Button>
                                    </>
                                    : humanVerificationDetailState && humanVerificationDetailState.isPhotoVerify === 1 ?
                                        <>
                                            <Button className="bg-primary text-white">Verified</Button>
                                        </>
                                        : humanVerificationDetailState && humanVerificationDetailState.isPhotoVerify === 2 ?
                                            <>
                                                <Button className="bg-primary text-white">Declined</Button>
                                            </>
                                            : <>
                                                <Button className="bg-primary text-white">No Verification Request</Button>
                                            </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="verification-bar">
                    <div className="user-detail-bar">
                        <div className="detailleft">
                            <div className="userleftside">
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
                    </div>
                    <div className="verification-media-upload">
                        <div className="mediabar">
                            <img src="/images/user-verify.png" alt="img" />
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
                </div> */}
            </Container>

        </>
    );
}

export default UserVerification;
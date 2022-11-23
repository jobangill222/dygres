import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const EnterOtp = () => {
    return (
        <>
            <div className="Auth-bar">
                <Container>
                    <div className="Authbar-innerbox">
                        <h4>Enter OTP</h4>
                        <p>Please check your email for a message with your OTP.</p>
                        <Form autocomplete="off">
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control type="number" placeholder="e.g. 123456" />
                            </Form.Group>
                            <Link className="btn btn-primary" to="/resetpassword">Submit</Link>
                        </Form>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default EnterOtp;
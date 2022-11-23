import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

const GetOtp = () => {
    return (
        <>
            <div className="Auth-bar">
                <Container>
                    <div className="Authbar-innerbox">
                        <h4>Get OTP</h4>
                        <p>Please enter your email to get OTP for password reset.</p>
                        <Form autocomplete="off">
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Your email</Form.Label>
                                <Form.Control type="email" placeholder="e.g. smith@gmail.com" />
                            </Form.Group>
                            <Link className="btn btn-primary" to="/enterotp">Submit</Link>
                        </Form>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default GetOtp;
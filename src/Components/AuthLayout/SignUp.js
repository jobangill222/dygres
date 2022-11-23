import React from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <>
            <div className="Auth-bar">
                <Container>
                    <div className="Authbar-innerbox">
                        <h4>Sign up</h4>
                        <p>Enter your details and get started with Dygres</p>
                        <Form autocomplete="off">
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Your email</Form.Label>
                                <Form.Control type="email" placeholder="e.g. smith@gmail.com" />
                            </Form.Group>

                            <Form.Group className="authinputbar" controlId="formBasicPassword">
                                <Form.Label>Your password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" />
                            </Form.Group>
                            <Form.Group className="authinputbar authcheckbox" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I certify that I am at least 16 years old" />
                                
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                            <div className="Noted-bar">
                                <h6>Don’t have an account? <Link to="/login">Login here</Link></h6>
                            </div>
                            <div className="terms-condition">
                                <Link to="/forgotpassword">Terms & Conditions</Link>
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default SignUp;
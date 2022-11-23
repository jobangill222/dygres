import React from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <div className="Auth-bar">
                <Container>
                    <div className="Authbar-innerbox">
                        <h4>Log In</h4>
                        <p>Enter your details to log into your account!</p>
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
                                <Form.Check type="checkbox" label="Remember me" />
                                <div className="btn-simple">
                                    <Link to="/getotp">Forgot your password?</Link>
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Log In
                            </Button>
                            <div className="Noted-bar">
                                <h6>Don’t have an account? <Link to="/signup">Sign up here</Link></h6>
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

export default Login;
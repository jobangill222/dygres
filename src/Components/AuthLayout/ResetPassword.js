import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const ResetPassword = () => {
    return (
        <>
            <div className="Auth-bar">
                <Container>
                    <div className="Authbar-innerbox">
                        <h4>Reset Password</h4>
                        <Form autocomplete="off">
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Type new password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password" />
                            </Form.Group>
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Re-type new password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password again" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default ResetPassword;
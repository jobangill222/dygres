import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SendNotification = () => {

    return (
        <>
            <Container>
                <div className="dashboard-title-bar">
                    <Row>
                        <Col lg="12">
                            <h4>Send notification</h4>
                        </Col>
                    </Row>
                </div>
                <div className="Whatsmind-bar mt-5">
                    <Form>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={6} placeholder="Send notification to all users here............" />
                            
                            <div className="text-end">
                                <Button className="bg-primary text-white">Send</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </Container>

        </>
    );
}

export default SendNotification;
import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsUpload } from "react-icons/bs";


export default function AddAward() {
    return (
        <Container>

            <div className="dashboard-title-bar addawardsadmin">
                <Row>
                    <Col lg="6">
                        <h4>Add awards</h4>
                    </Col>
                </Row>
                <div className="addawards-editorbar">
                    <Row>
                        <Col lg="6">
                            <Form.Group className="editor-input" controlId="">
                                <Form.Label>Award name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter award name"
                                />
                            </Form.Group>
                            <Form.Group className="editor-input " controlId="">
                                <Form.Label>Upload verification image</Form.Label>
                                <div className="editor-same-line">
                                    <div className='upload-media-verify'>
                                        <div className="imagebarupload">
                                            <Button className='bg-primary text-white'>
                                                <input type="file" />
                                                <BsUpload className="me-2" />
                                                Upload Image
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className="editor-input " controlId="">
                                <Form.Label>Award type</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Free</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>
                            <div className="text-start mt-3 save-form-btn" >
                                <Button className="bg-primary text-white">
                                    Add award
                                </Button>
                                {/* <Button className="outline-primary text-white"><ImCross className="me-2" /> Cancel</Button> */}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>



        </Container>
    )
}

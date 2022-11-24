import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const WhatsMind = () => {

    return (
        <>
            <div className="Whatsmind-bar">
                <Form>
                    <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={6} placeholder="What’s on your mind............?" />
                        <p className="word-note">Character 0/420</p>
                        <div className="text-end">
                        <Button className="bg-primary text-white">Submit</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default WhatsMind;
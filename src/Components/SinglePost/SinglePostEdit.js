import React, { useState, useContext } from "react";
import { BsPencil } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SinglePostEdit = () => {

    return (
        <>
            <div className="user-edit">
                <h4><BsPencil />Edit Post</h4>
                <Form>
                    <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" style={{ height: '120px' }} />
                        <div className="text-end">
                            <Button className="outline-primary text-white" ><ImCross />Cancel</Button>
                            <Button className="bg-primary text-white"  >Save</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default SinglePostEdit;
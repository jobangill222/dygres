import React from "react";
import { BsPencil} from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const PostEdit = () => {
    return (
        <>
            <div className="user-edit">
                <h4><BsPencil />Edit Post</h4>
                <Form>
                    <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" style={{ height: '120px' }} value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. #HelloWorld #DummyText @iamhannah @methew reed" />
                        <div className="text-end">
                            <Button className="outline-primary text-white"><ImCross />Cancel</Button>
                            <Button className="bg-primary text-white">Save</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default PostEdit;
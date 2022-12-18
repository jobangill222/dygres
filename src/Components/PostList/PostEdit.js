import React, { useState, useContext } from "react";
import { BsPencil } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { DContext } from "../../Context/DContext";

const PostEdit = (props) => {

    //DContext
    const { editPostDContext } = useContext(DContext);

    //Props
    const { postID, postContent, setPostContent, setIsEditFieldOpen } = props;

    //States
    const [editContent, setEditContent] = useState(postContent);

    const saveEditPost = async () => {
        if (!editContent) {
            toast("Post cannot be empty.");
        } else {
            const editPostAxiosRes = await editPostDContext(postID, editContent);
            // console.log('editPostAxiosReseditPostAxiosReseditPostAxiosRes' , editPostAxiosRes);
            if (editPostAxiosRes.status === "success") {
                setPostContent(editContent);
                setIsEditFieldOpen(false)
            }
            toast(editPostAxiosRes.message);
        }
    }

    return (
        <>
            <div className="user-edit">
                <h4><BsPencil />Edit Post</h4>
                <Form>
                    <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" style={{ height: '120px' }} value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                        <div className="text-end">
                            <Button className="outline-primary text-white" onClick={() => setIsEditFieldOpen(false)}><ImCross />Cancel</Button>
                            <Button className="bg-primary text-white" onClick={saveEditPost} >Save</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default PostEdit;
import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { DContext } from "../Context/DContext";

const WhatsMind = (props) => {
  //To change state when post is posted
  const { setIsPostState } = props;

  //Set create post state
  const [createPostState, setCreatePostState] = useState("");

  // Function to all api
  const { createPostDContext } = useContext(DContext);

  //Submit post
  const submitPost = async () => {
    if (!createPostState) {
      toast("Post cannot be empty.");
    } else {
      console.log("createPostState", createPostState);
      //   alert("Post successfully.");
      try {
        const axiosRes = await createPostDContext(createPostState);
        if (axiosRes.status === "success") {
          setIsPostState("1");
          toast(axiosRes.message);
          setCreatePostState("");
        } else {
          toast(axiosRes.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="Whatsmind-bar">
        <Form>
          <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={6}
              maxLength={420}
              placeholder="What’s on your mind............?"
              name="content"
              value={createPostState}
              max="420"
              onChange={(e) => {
                setCreatePostState(e.target.value);
              }}
            />
            <p className="word-note">Character {createPostState.length}/420</p>
            <div className="text-end">
              <Button className="bg-primary text-white" onClick={submitPost}>
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default WhatsMind;

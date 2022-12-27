import React, { useContext, useEffect, useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TbCameraPlus } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";

const EditProfile = () => {
  //Import Api functions from DContext file
  const { getGenInformationDContext, updateGenInformationDContext } =
    useContext(DContext);

  // Define State
  const [genInfoFiledsState, setGenInfoFieldsState] = useState({
    profileImage: "",
    name: "",
    username: "",
    thoughts: "",
    bio: "",
  });

  // Get values from Api and update state value
  const getGenInfoOnPage = async () => {
    try {
      //Api call
      const axiosRes = await getGenInformationDContext();
      // console.log('axiosRes*********', axiosRes);

      //Set values in state
      setGenInfoFieldsState({
        username: axiosRes.generalDetails.username
          ? axiosRes.generalDetails.username
          : "",
        profileImage: axiosRes.generalDetails.profileImage
          ? axiosRes.generalDetails.profileImage
          : "/images/user172.png",
        name: axiosRes.generalDetails.name ? axiosRes.generalDetails.name : "",
        thoughts: axiosRes.generalDetails.thoughts
          ? axiosRes.generalDetails.thoughts
          : "",
        bio: axiosRes.generalDetails.bio ? axiosRes.generalDetails.bio : "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log('Get General info page in useEffect');
    getGenInfoOnPage();
  }, []);

  //Change values onChange and save in state
  const changeValue = async (e) => {
    const { name, value } = e.target;
    genInfoFiledsState[name] = value;
    setGenInfoFieldsState({ ...genInfoFiledsState });
  };

  //Submit form to update data
  const submitHandler = async () => {
    console.log("Update gen info function calls");
    console.log("genInfoFiledsState", genInfoFiledsState);

    //Convert to Bodyfrom data
    var bodyFormData = new FormData();
    bodyFormData.append("username", genInfoFiledsState.username);
    bodyFormData.append("name", genInfoFiledsState.name);
    bodyFormData.append("thoughts", genInfoFiledsState.thoughts);
    bodyFormData.append("bio", genInfoFiledsState.bio);
    bodyFormData.append("profileImage", file);

    const axiosRes = await updateGenInformationDContext(bodyFormData);
    // console.log('axiosRes in update gen Info' , axiosRes);
    toast(axiosRes.message);
  };

  //Set file state
  const [file, setFile] = useState();
  const imageRef = useRef(null);

  //Upload Image function
  const uploadProfileImage = async (e) => {
    const imageType = e.target.files[0].type;
    console.log("imageType", imageType);
    if (
      imageType === "image/png" ||
      imageType === "image/ppg" ||
      imageType === "image/jpeg"
    ) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFile(e.target.files[0]);
      // console.log('url' , url)
      imageRef.current.src = url;
      imageRef.current.onload = function () {
        URL.revokeObjectURL(imageRef.current.src); // free memory
      };
    } else {
      toast("Only png, jpg and jpeg allowed.");
    }
  };

  return (
    <>
      <div className="Profile-Upload-media">
        <Row>
          <Col lg="6">
            <div className="Uploaded-user">
              <div className="Imagebar">
                <img
                  src={genInfoFiledsState.profileImage}
                  alt="icon"
                  id="output"
                  ref={imageRef}
                />
                <div className="userup-in">
                  <div className="typefile">
                    <input
                      accept="image/*"
                      type="file"
                      onChange={uploadProfileImage}
                    />
                    <TbCameraPlus />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="text-end save-form-btn" onClick={submitHandler}>
              <Button className="bg-primary text-white me-3">
                <MdOutlineSave className="me-2" />
                Save
              </Button>
              {/* <Button className="outline-primary text-white"><ImCross className="me-2" /> Cancel</Button> */}
            </div>
          </Col>
          <div className="Userdetail-editorbar">
            <Row>
              <Col lg="6 ">
                <Form.Group className="editor-input" controlId="">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={genInfoFiledsState.name}
                    placeholder="Enter Display Name"
                    onChange={changeValue}
                  />
                </Form.Group>
                <Form.Group className="editor-input" controlId="">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    name="username"
                    value={genInfoFiledsState.username}
                    placeholder="Enter Username"
                    onChange={changeValue}
                  />
                </Form.Group>
              </Col>
              <Col lg="12">
                <Form.Group className="editor-input" controlId="">
                  <Form.Label>A penny for your thoughts?</Form.Label>
                  <Form.Control
                    type="text"
                    name="thoughts"
                    max="420"
                    maxLength={420}
                    value={genInfoFiledsState.thoughts}
                    placeholder="Enter A penny for your thoughts?"
                    onChange={changeValue}
                  />
                  <p className="word-note">Character {genInfoFiledsState.thoughts.length}/420</p>
                </Form.Group>

                <Form.Group className="editor-input" controlId="">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    name="bio"
                    as="textarea"
                    rows={7}
                    max="420"
                    maxLength={420}
                    type="text"
                    value={genInfoFiledsState.bio}
                    placeholder="Enter Bio"
                    onChange={changeValue}
                  />
                  <p className="word-note">Character {genInfoFiledsState.bio.length}/420</p>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
};

export default EditProfile;

import React, { useContext, useEffect, useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TbCameraPlus } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../../Components/Loader";
import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

import { BsInfoCircle } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import usePrompt from "../../hooks/usePrompt";

const EditProfile = () => {
  // const navigate = useNavigate();

  //Import Api functions from DContext file
  const {
    getGenInformationDContext,
    updateGenInformationDContext,
    isLoading,
    setIsLoading,
    isDataChangeState,
    setIsDataChangeState,
  } = useContext(DContext);

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
    //Set state that no data change when page load
    setIsDataChangeState(false);
    // console.log('Get General info page in useEffect');
    getGenInfoOnPage();
  }, []);

  //Change values onChange and save in state
  const changeValue = async (e) => {
    setIsDataChangeState(true);
    const { name, value } = e.target;
    genInfoFiledsState[name] = value;
    setGenInfoFieldsState({ ...genInfoFiledsState });
  };

  //Submit form to update data
  const submitHandler = async () => {
    setIsLoading(true);

    // console.log("Update gen info function calls");
    // console.log("genInfoFiledsState", genInfoFiledsState);

    //Convert to Bodyfrom data
    var bodyFormData = new FormData();
    bodyFormData.append("username", genInfoFiledsState.username);
    bodyFormData.append("name", genInfoFiledsState.name);
    bodyFormData.append("thoughts", genInfoFiledsState.thoughts);
    bodyFormData.append("bio", genInfoFiledsState.bio);
    bodyFormData.append("profileImage", file);

    const axiosRes = await updateGenInformationDContext(bodyFormData);
    // console.log('axiosRes in update gen Info' , axiosRes);
    // navigate("/profile");
    toast(axiosRes.message);

    setIsLoading(false);

    setIsDataChangeState(false);
  };

  //Set file state
  const [file, setFile] = useState();
  const imageRef = useRef(null);

  //Upload Image function
  const uploadProfileImage = async (e) => {
    const imageSize = e.target.files[0].size;
    const imageType = e.target.files[0].type;
    console.log("imageType", imageType);

    // if (imageSize > 10485760) {
    if (imageSize > 15728640) {
      toast("Images must be smaller than 15 MB.");
    } else if (
      imageType !== "image/png" &&
      imageType !== "image/ppg" &&
      imageType !== "image/jpeg"
    ) {
      toast(
        "Unsupported image format. Please upload a png, jpg, or .jpeg instead."
      );
    } else {
      const url = URL.createObjectURL(e.target.files[0]);
      setFile(e.target.files[0]);
      // console.log('url' , url)
      imageRef.current.src = url;
      imageRef.current.onload = function () {
        URL.revokeObjectURL(imageRef.current.src); // free memory
      };
      setIsDataChangeState(true);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip
      style={{ width: "400px", wordBreak: "break-all" }}
      className="infotooltip"
      id="button-tooltip"
      {...props}
    >
      {/* <ul>
        <li>Username must be 20 characters max.</li>
      </ul> */}
      Select 1920x1080 px image
    </Tooltip>
  );

  //Restrict to another screen if changes
  usePrompt("Are you sure you want to leave?", isDataChangeState);

  return (
    <>
      {console.log("isDataChangeState", isDataChangeState)}

      {isLoading && <Loader />}

      <div className="Profile-Upload-media">
        <Row>
          <Col lg="6">
            <div className="Uploaded-user">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <p>
                  {" "}
                  <BsInfoCircle />
                </p>
              </OverlayTrigger>

              <div className="Imagebar">
                <img
                  src={genInfoFiledsState.profileImage}
                  alt="icon"
                  id="output"
                  ref={imageRef}
                // style={
                //   genInfoFiledsState?.profileImage
                //     ? { border: "5px solid var(--base-green)" }
                //     : { border: "none" }
                // }
                />

                <div className="userup-in">
                  <div className="typefile">
                    <input
                      accept="image/*"
                      type="file"
                      onChange={uploadProfileImage}
                      title="Select 1920x1080 px image"
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
                  <Form.Label>Hi, my name is</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={genInfoFiledsState.name}
                    placeholder="What does the world call you?"
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
                  <Form.Label>News Flash!</Form.Label>
                  <Form.Control
                    type="text"
                    name="thoughts"
                    max="420"
                    maxLength={50}
                    value={genInfoFiledsState.thoughts}
                    placeholder="Enter Your News Flash here."
                    onChange={changeValue}
                  />
                  <p className="word-note">
                    {50 - genInfoFiledsState.thoughts.length}
                  </p>
                </Form.Group>

                <Form.Group className="editor-input" controlId="">
                  <Form.Label>About Me</Form.Label>
                  <Form.Control
                    name="bio"
                    as="textarea"
                    rows={7}
                    max="420"
                    maxLength={120}
                    type="text"
                    value={genInfoFiledsState.bio}
                    placeholder="Enter About Me"
                    onChange={changeValue}
                  />
                  <p className="word-note">
                    {120 - genInfoFiledsState.bio.length}
                  </p>
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

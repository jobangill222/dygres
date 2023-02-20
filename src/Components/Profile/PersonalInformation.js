import React, { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsUpload } from "react-icons/bs";
import { MdOutlineSave } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const PersonalInformation = () => {
  //Otp Modal
  const [showEmailOtpPopup, setShowEmailOtpPopup] = useState(false);
  const handleEmailOtpPopupClose = () => setShowEmailOtpPopup(false);
  const handleEmailOtpPopupShow = () => setShowEmailOtpPopup(true);

  // Password change Modal
  const [ResetShow, setPassShow] = useState(false);
  const ResetClose = () => setPassShow(false);
  const Resetpass = () => setPassShow(true);

  //Get api function from DContext file
  const {
    getPersonalInformationDContext,
    updatePersonalInformationDContext,
    changePasswordDContext,
    getEmailOtpInsideLoginDContext,
    verifyOtpInsideLoginDContext,
    isLoading, setIsLoading
  } = useContext(DContext);

  const [personalInfoFieldStates, setPersonalInfoFieldStates] = useState({
    email: "",
    isEmailVerify: "",
    photoVerificationCode: "",
    verificationImage: "",
    isPhotoVerify: "",
    phoneNumber: "",
    region: "",
  });

  const getPersonalInfoData = async () => {
    try {
      const axiosRes = await getPersonalInformationDContext();
      // console.log('Get personal information data:', axiosRes);

      //Set values in state
      setPersonalInfoFieldStates({
        email: axiosRes.personalDetails.email
          ? axiosRes.personalDetails.email
          : "",
        isEmailVerify: axiosRes.personalDetails.isEmailVerify
          ? axiosRes.personalDetails.isEmailVerify
          : 0,
        photoVerificationCode: axiosRes.personalDetails.photoVerificationCode
          ? axiosRes.personalDetails.photoVerificationCode
          : "",
        verificationImage: axiosRes.personalDetails.verificationImage
          ? axiosRes.personalDetails.verificationImage
          : null,
        isPhotoVerify: axiosRes.personalDetails.isPhotoVerify
          ? axiosRes.personalDetails.isPhotoVerify
          : 0,
        phoneNumber: axiosRes.personalDetails.phoneNumber
          ? axiosRes.personalDetails.phoneNumber
          : "",
        region: axiosRes.personalDetails.region
          ? axiosRes.personalDetails.region
          : "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [isSaveState, setIsSaveState] = useState(false);
  useEffect(() => {
    // console.log("Get personal info in use Effect");
    getPersonalInfoData();
    setIsSaveState(false)
  }, [isSaveState]);

  //Change values onChange and save in state
  const changeValue = async (e) => {
    const { name, value } = e.target;
    personalInfoFieldStates[name] = value;
    setPersonalInfoFieldStates({ ...personalInfoFieldStates });
  };

  //Submit form to update data
  const submitHandler = async () => {

    setIsLoading(true);

    console.log("Update personal info function calls");
    console.log("personalInfoFieldStates", personalInfoFieldStates);

    //Convert to Bodyfrom data
    var bodyFormData = new FormData();
    bodyFormData.append("email", personalInfoFieldStates.email);
    bodyFormData.append("phoneNumber", personalInfoFieldStates.phoneNumber);
    bodyFormData.append("region", personalInfoFieldStates.region);
    bodyFormData.append("verificationImage", fileState);

    const axiosRes = await updatePersonalInformationDContext(bodyFormData);
    console.log("axiosRes in update personal Info", axiosRes);
    toast(axiosRes.message);
    setFileState(null)
    setIsSaveState(true)

    setIsLoading(false);
  };

  //Set file state
  const [fileState, setFileState] = useState(null);
  //Upload Image function
  const uploadVerificationImage = async (e) => {
    const imageType = e.target.files[0].type;
    if (
      imageType === "image/png" ||
      imageType === "image/ppg" ||
      imageType === "image/jpeg"
    ) {
      setFileState(e.target.files[0]);
    } else {
      toast("Unsupported image format. Please upload a png, jpg, or .jpeg instead.");
    }
  };

  //Change Password

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Submit change password
  const handleRegistration = async (data) => {
    // e.preventDefault()
    // console.log("data-----", data);
    if (data.newPassword !== data.confirmNewPassword) {
      toast("One of these things is not like the other. These passwords do not match.");
      return;
    }

    try {
      const axiosRes = await changePasswordDContext(data);
      console.log("axiosRes", axiosRes);
      if (axiosRes.status === "success") {
        toast(axiosRes.message);
        setPassShow(false);
      } else {
        const errorMessage = axiosRes.message;
        toast(errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //validation error in chnage password Modal
  const handleError = (errors) => {
    console.log(errors);
  };

  // validation messages in change password
  const registerOptions = {
    currentPassword: {
      required: "Enter current password.",
      minLength: {
        value: 8,
        message: "Current password must have at least 8 characters",
      },
    },
    newPassword: {
      required: "Enter new password.",
      minLength: {
        value: 8,
        message: "New password must have at least 8 characters",
      },
    },
    confirmNewPassword: {
      required: "Enter Confirm password.",
      minLength: {
        value: 8,
        message: "Confirm password must have at least 8 characters",
      },
    },
  };

  //Get otp when click on verify email
  const getOtpForEmailVerification = async () => {
    if (personalInfoFieldStates.isEmailVerify === 0) {
      handleEmailOtpPopupShow();
      try {
        const axiosRes = await getEmailOtpInsideLoginDContext(
          personalInfoFieldStates.email
        );
        console.log("axiosRes", axiosRes);
        if (axiosRes.status === "success") {
          toast(axiosRes.message);
        } else {
          const errorMessage = axiosRes.message;
          toast(errorMessage);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [otpState, setOtpState] = useState("");

  //Submit otp
  const submitOtp = async (e) => {
    e.preventDefault();
    console.log("otpState", otpState);
    if (!otpState) {
      toast("Please enter your OTP.");
    } else {
      try {
        const axiosRes = await verifyOtpInsideLoginDContext(
          personalInfoFieldStates.email,
          otpState
        );
        console.log("axiosRes", axiosRes);
        if (axiosRes.status === "success") {
          setPersonalInfoFieldStates((previousState) => {
            return {
              ...previousState,
              isEmailVerify: 1,
            };
          });
          toast('Verification Complete.');
          setShowEmailOtpPopup(false);
        } else {
          const errorMessage = axiosRes.message;
          toast(errorMessage);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>

      {isLoading && <Loader />}

      {/* {console.log("personalInfoFiledsState", personalInfoFieldStates)} */}

      <div className="Profile-Upload-media">
        <Row>
          <Col lg="6">
            <div className="account-verify">
              <Form.Label>E-mail</Form.Label>
              <Form.Group className="verify-input" controlId="">
                <Form.Control
                  type="email"
                  value={personalInfoFieldStates.email}
                  disabled
                  placeholder="Enter Email"
                />
                <Button
                  className="outline-primary text-white"
                  onClick={getOtpForEmailVerification}
                >
                  {personalInfoFieldStates.isEmailVerify === 0
                    ? "Verify E-mail"
                    : "Verified"}{" "}
                </Button>
              </Form.Group>
            </div>
          </Col>
          <Col lg="6">
            <div className="text-end save-form-btn" onClick={submitHandler}>
              <Button className="bg-primary text-white me-3">
                <MdOutlineSave className="me-2" />
                Save
              </Button>
            </div>
          </Col>
          <div className="Userdetail-editorbar">
            <Row>
              <Col lg="12 ">
                <Form.Group className="editor-input " controlId="">
                  <Form.Label>Upload verification image</Form.Label>
                  <div className="editor-same-line">
                    {/* {console.log("fileState", fileState)} */}
                    {/* {console.log("personalInfoFieldStates.verificationImage", personalInfoFieldStates.verificationImage)} */}

                    <div
                      className={
                        fileState
                          ? `image-uploaded-class upload-media-verify`
                          : personalInfoFieldStates.verificationImage !==
                            "/images/upload-dummy-backgroud.png"
                            ? `image-uploaded-class upload-media-verify`
                            : `upload-media-verify`
                      }
                    >
                      <div className="imagebarupload">

                        <Button className={fileState === null && personalInfoFieldStates.isPhotoVerify === 3 ? 'bg-primary text-white typefilenone' : personalInfoFieldStates.isPhotoVerify === 1 ? 'bg-primary text-white typefilenone' : 'primary text-white'}>
                          {/* {console.log('personalInfoFieldStates.isEmailVerify', personalInfoFieldStates.isEmailVerify)} */}

                          {personalInfoFieldStates.isEmailVerify === 0 ?
                            <input onClick={() => toast('Please verify email first.')} />
                            :
                            <input type="file" onChange={uploadVerificationImage} />

                          }
                          <BsUpload className="me-2" />
                          Upload Image
                        </Button>

                        {/* <img
                          src={personalInfoFieldStates.verificationImage}
                          alt="icon"
                          id="output"
                          ref={verificationImageRef}
                        /> */}
                        {/* {console.log('personalInfoFieldStatespersonalInfoFieldStates', personalInfoFieldStates)} */}
                        {fileState !== null && <p className="succesful">Image Selected successfully.</p>}
                        {fileState === null && personalInfoFieldStates.isPhotoVerify === 3 && <p className="succesful">Your human verification is under review.</p>}
                        {fileState === null && personalInfoFieldStates.isPhotoVerify === 2 && <p className="succesful">Human Verification rejected, please Upload image again.</p>}
                        {fileState === null && personalInfoFieldStates.isPhotoVerify === 1 && <p className="succesful">Human Verified.</p>}

                      </div>
                    </div>
                    <p className="uploaded-note">
                      <b>{personalInfoFieldStates.photoVerificationCode}</b>{" "}
                      Upload your picture along with this code for verification
                    </p>
                  </div>
                </Form.Group>
              </Col>
              <Col lg="6 ">
                <Form.Group className="editor-input" controlId="">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    value={personalInfoFieldStates.phoneNumber}
                    onChange={changeValue}
                  />
                </Form.Group>
                <div className="editor-input account-verify ">
                  <Form.Label>Password</Form.Label>
                  <Form.Group
                    className="verify-input passwrd-verify"
                    controlId=""
                  >
                    <Form.Control
                      type="password"
                      placeholder="***********"
                      disabled
                    />
                    <Button onClick={Resetpass} className="resetbtn text-white">
                      Change Password
                    </Button>
                  </Form.Group>
                </div>
                {/* <Form.Group className="editor-input" controlId="">
                  <Form.Label>Region</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="region"
                    value={personalInfoFieldStates.region}
                    onChange={changeValue}
                  >
                    {personalInfoFieldStates.region === "" ? (
                      <option>Region</option>
                    ) : (
                      ""
                    )}
                    <option value="India">India</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Canada">Canada</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </Form.Select>
                </Form.Group> */}
              </Col>
            </Row>
          </div>
        </Row>
      </div>

      {/* Password change modal */}
      <Modal
        className="Actions-modal"
        show={ResetShow}
        onHide={ResetClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            {/* <form > */}

            <Form.Group className="editor-input" controlId="">
              <Form.Label>Type old password</Form.Label>
              <Form.Control
                type="password"
                placeholder="......."
                name="currentPassword"
                {...register(
                  "currentPassword",
                  registerOptions.currentPassword
                )}
              />
              <small className="text-danger">
                {errors?.currentPassword && errors.currentPassword.message}
              </small>
            </Form.Group>
            <Form.Group className="editor-input" controlId="">
              <Form.Label>Type new password</Form.Label>
              <Form.Control
                type="password"
                placeholder="......."
                name="newPassword"
                {...register("newPassword", registerOptions.newPassword)}
              />
              <small className="text-danger">
                {errors?.newPassword && errors.newPassword.message}
              </small>
            </Form.Group>
            <Form.Group className="editor-input" controlId="">
              <Form.Label>Re-type new password</Form.Label>
              <Form.Control
                type="password"
                placeholder="......."
                name="confirmNewPassword"
                {...register(
                  "confirmNewPassword",
                  registerOptions.confirmNewPassword
                )}
              />
              <small className="text-danger">
                {errors?.confirmNewPassword &&
                  errors.confirmNewPassword.message}
              </small>
            </Form.Group>
            <div className="text-end save-form-btn">
              <Button className="bg-primary text-white" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Otp Modal */}
      <Modal
        className="Actions-modal"
        show={showEmailOtpPopup}
        onHide={handleEmailOtpPopupClose}
        centered
      >
        <Modal.Body>
          <div className="Authbar-innerbox E-Otp">
            <h4>Enter OTP</h4>
            <p>Please check your email for a message with your OTP.</p>
            <form>
              <Form.Group className="authinputbar" controlId="formBasicEmail">
                <Form.Control
                  type="number"
                  name="otp"
                  value={otpState}
                  onChange={(e) => setOtpState(e.target.value)}
                  placeholder="Enter OTP"
                />
              </Form.Group>
              <input
                type="submit"
                onClick={submitOtp}
                className="btn btn-primary"
              />
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PersonalInformation;

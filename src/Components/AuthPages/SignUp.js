import React, { useContext, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Context
import { DContext } from "../../Context/DContext";
import { useForm } from "react-hook-form";
import Loader from "../Loader";

import SignupModal from "../Modals/SingupModal";

import FoundationalRuleModal from "../Modals/FoundationalRuleModal";


const SignUp = () => {
  //Checkbox value of age
  const ref = useRef(null);

  const navigate = useNavigate();

  // const {userSignup} = useContext(DContext)
  const { userSignup, setUser, setUserToken, setUserStats, isLoading, setIsLoading } = useContext(DContext);


  //SignupModal
  const [isShowSignupPopup, setIsShowSignupModal] = useState(false);

  const [isShowFoundationalRulePopup, setIsShowFoundationalRuleModal] = useState(false);


  let axiosRes;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = async (data) => {
    // e.preventDefault()
    console.log(data);
    localStorage.setItem('signupusername', data.username);


    if (!ref.current.checked) {
      toast("dygres is only available for humans aged 16 and above. Please verify your age to continue with registration.");
      return;
    }
    try {
      setIsLoading(true);
      axiosRes = await userSignup(data);
      console.log("axiosRes", axiosRes);
      if (axiosRes.status === "success") {
        localStorage.setItem("accessToken", axiosRes.accessToken);
        setUser(axiosRes.data);
        setUserToken(axiosRes.accessToken);
        setUserStats(axiosRes.userStats);
        navigate("/new");

        setIsShowSignupModal(false)


      } else {
        const errorMessage = axiosRes.message;
        toast(errorMessage);
      }
      setIsLoading(false);


    } catch (err) {
      console.log(err);
    }
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    email: {
      required: "Enter Email Address",
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: "Enter a valid email address",
      },
    },
    username: {
      required: "Enter Username",
      maxLength: {
        value: 20,
        message: "Username should be less than 20 characters",
      },
      pattern: {
        value: /^[a-z0-9_.]+$/,
        message: "Username must be 20 characters max, lower case, and can only contain alphanumeric characters without spaces",
      },
    },
    password: {
      required: "Enter Password",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special characters without spaces",
      },
    },
  };




  const renderTooltip = (props) => (
    <Tooltip style={{ width: "400px", wordBreak: "break-all" }} className='infotooltip' id="button-tooltip" {...props}>
      <ul>
        <li>Username must be 20 characters max.</li>
        <li>Username must be in lower case.</li>
        <li>Username can only contain alphanumeric characters without spaces.</li>
      </ul>
    </Tooltip>
  );


  const renderTooltipPassword = (props) => (
    <Tooltip style={{ width: "400px", wordBreak: "break-all" }} className='infotooltip' id="button-tooltip" {...props}>
      <ul>
        <li>Password must have at least 8 characters.</li>
        <li>Password must contain at least one lowercase letter, one uppercase letter, one number, and one special characters without spaces</li>
      </ul>
    </Tooltip>
  );


  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>

      {isLoading && <Loader />}

      {isShowSignupPopup && <SignupModal setIsShowSignupModal={setIsShowSignupModal} username={localStorage.getItem('signupusername')} />}

      {isShowFoundationalRulePopup && <FoundationalRuleModal isShowFoundationalRulePopup={isShowFoundationalRulePopup} setIsShowFoundationalRuleModal={setIsShowFoundationalRuleModal} />}

      <div className="Auth-bar">
        <Container>
          <div className="Authbar-innerbox">
            <h4>Sign up</h4>
            <p>Enter your details and get started with dygres</p>
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
              <Form.Group className="authinputbar" controlId="formBasicEmail">
                <Form.Label>Your email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  {...register("email", registerOptions.email)}
                // value={email}
                // onChange={e => setEmail(e.target.value)}
                />
                <small className="text-danger">
                  {errors?.email && errors.email.message}
                </small>
              </Form.Group>


              <Form.Group
                className="authinputbar"
                controlId="formBasicPassword"
              >
                <Form.Label>Your Username

                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <Button> <BsInfoCircle /></Button>
                  </OverlayTrigger>


                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  {...register("username", registerOptions.username)}

                // value={password}
                // onChange={e => setPassword(e.target.value)}
                />
                <small className="text-danger">
                  {errors?.username && errors.username.message}
                </small>
              </Form.Group>


              <Form.Group
                className="authinputbar"
                controlId="formBasicPassword"
              >
                <Form.Label>Your password
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipPassword}
                  >
                    <Button> <BsInfoCircle /></Button>
                  </OverlayTrigger>

                </Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  name="password"
                  {...register("password", registerOptions.password)}
                // value={password}
                // onChange={e => setPassword(e.target.value)}
                />
                <small className="text-danger">
                  {errors?.password && errors.password.message}
                </small>

                <div className='cursor-pointer' onClick={handleTogglePassword}>
                  {showPassword ?
                    <p>< AiOutlineEyeInvisible /></p>
                    :
                    <p><AiOutlineEye /></p>
                  }
                </div>

              </Form.Group>


              <Form.Group
                className="authinputbar authcheckbox"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  ref={ref}
                  type="checkbox"
                  label="I certify that I am at least 16 years old"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Join dygres
              </Button>
              {/* <div className="Noted-bar">
                <h6>
                  Already have an account? <Link to="/login"> Login here</Link>
                </h6>
              </div> */}
              <div className="terms-condition" onClick={() => setIsShowFoundationalRuleModal(true)}>
                {/* <Link to="/forgotpassword">Terms & Conditions</Link> */}
                <Link >Foundational Rules</Link>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUp;

import React, { useContext, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { DContext } from "../../Context/DContext";
import { useForm } from "react-hook-form";

const SignUp = () => {
  //Checkbox value of age
  const ref = useRef(null);

  const navigate = useNavigate();

  // const {userSignup} = useContext(DContext)
  const { userSignup, setUser, setUserToken, setUserStats } =
    useContext(DContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = async (data) => {
    // e.preventDefault()
    console.log(data);

    if (!ref.current.checked) {
      toast("Please verify your age to join dygres.");
      return;
    }
    try {
      const axiosRes = await userSignup(data);
      console.log("axiosRes", axiosRes);
      if (axiosRes.status === "success") {
        localStorage.setItem("accessToken", axiosRes.accessToken);

        console.log("login console", axiosRes);

        setUser(axiosRes.data);
        setUserToken(axiosRes.accessToken);
        setUserStats(axiosRes.userStats);

        // toast(axiosRes.message);
        // navigate("/editprofile");
        navigate("/new");

      } else {
        const errorMessage = axiosRes.message;
        toast(errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    email: { required: "Enter Email Address" },
    username: { required: "Enter Username" },
    password: {
      required: "Enter Password.",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <>
      <div className="Auth-bar">
        <Container>
          <div className="Authbar-innerbox">
            <h4>Sign up</h4>
            <p>Enter your details and get started with Dygres</p>
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
                <Form.Label>Your Username</Form.Label>
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
                <Form.Label>Your password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  {...register("password", registerOptions.password)}
                // value={password}
                // onChange={e => setPassword(e.target.value)}
                />
                <small className="text-danger">
                  {errors?.password && errors.password.message}
                </small>
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
              <div className="Noted-bar">
                <h6>
                  Already have an account? <Link to="/login"> Login here</Link>
                </h6>
              </div>
              <div className="terms-condition">
                <Link to="/forgotpassword">Terms & Conditions</Link>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUp;

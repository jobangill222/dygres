import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import FoundationalRuleModal from "../Modals/FoundationalRuleModal";

// Context
import { DContext } from "../../Context/DContext";

const Login = () => {
  // Context Variables
  const { userLogin, setUser, setUserToken, setUserStats } =
    useContext(DContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = async (data) => {
    // e.preventDefault()
    console.log(data);

    try {
      const axiosRes = await userLogin(data);

      console.log("axiosRes", axiosRes);
      if (axiosRes.status === "success") {
        localStorage.setItem("accessToken", axiosRes.accessToken);

        if (axiosRes.data.role === "admin") {
          setUser(axiosRes.data);
          setUserToken(axiosRes.accessToken);
          setUserStats(axiosRes.userStats);
          navigate("/admin/dashboard");
        } else {
          setUser(axiosRes.data);
          setUserToken(axiosRes.accessToken);
          setUserStats(axiosRes.userStats);
          navigate("/new");
        }

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
    email: { required: "Enter Email Address or Username" },
    password: {
      required: "Enter Password",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  const navigate = useNavigate();

  /*const [loginField, setLoginField] = useState({
        email: "", 
        password: "",
    });
    const changeValue = async(e) => { 
        const {name , value} = e.target;
        loginField[name] = value;
        setLoginField({...loginField});
    }*/


  const [isShowFoundationalRulePopup, setIsShowFoundationalRuleModal] = useState(false);

  return (
    <>

      {isShowFoundationalRulePopup && <FoundationalRuleModal isShowFoundationalRulePopup={isShowFoundationalRulePopup} setIsShowFoundationalRuleModal={setIsShowFoundationalRuleModal} />}


      {/* {console.log("userStats in login page", userStats)}; */}
      <div className="Auth-bar">
        <Container>
          <div className="Authbar-innerbox">
            <h4>Log In</h4>
            <p>Enter your details to log into your account!</p>
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
              <Form.Group className="authinputbar" controlId="formBasicEmail">
                <Form.Label>Your Email / Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email Address / Username"
                  name="email"
                  {...register("email", registerOptions.email)}
                // value={loginField?.email}
                // onChange={changeValue}
                />

                <small className="text-danger">
                  {errors?.email && errors.email.message}
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
                // value={loginField?.password}
                // onChange={e => changeValue(e)}
                />
                <small className="text-danger">
                  {errors?.password && errors.password.message}
                </small>
              </Form.Group>

              <Form.Group
                className="authinputbar authcheckbox"
                controlId="formBasicCheckbox"
              >
                <Form.Check type="checkbox" label="Remember me" />
                <div className="btn-simple">
                  <Link to="/getotp">Forgot your password?</Link>
                </div>
              </Form.Group>
              <Button variant="primary" type="submit">
                Log In
              </Button>
              <div className="Noted-bar">
                <h6>
                  Don’t have an account? <Link to="/signup">Sign up here</Link>
                </h6>
              </div>
              <div className="terms-condition" onClick={() => setIsShowFoundationalRuleModal(true)}>
                <Link >Foundational Rules</Link>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;

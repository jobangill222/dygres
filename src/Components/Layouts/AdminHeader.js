import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkModeSwitch from "./DarkModeSwitch";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsBell, BsSearch } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Header = () => {

    const navigate = useNavigate();

    const { setUser, setUserToken, getSignupLoginStatusDContext, changeSignupLoginStatusDContext, changePasswordDContext } = useContext(DContext);

    const [isSiteLoginDisable, setIsSiteLoginDisable] = useState(false);
    const [isSiteSignupDisable, setIsSiteSignupDisable] = useState(false);


    useEffect(() => {
        getSiteStatus();
    }, [])

    const getSiteStatus = async () => {
        const axiosRes = await getSignupLoginStatusDContext();
        setIsSiteLoginDisable(axiosRes.data.isLoginDisable)
        setIsSiteSignupDisable(axiosRes.data.isSignupDisable);
    }

    const siteStatusHandler = async (type) => {
        const axiosRes = await changeSignupLoginStatusDContext(type);
        setIsSiteLoginDisable(axiosRes.data.isLoginDisable)
        setIsSiteSignupDisable(axiosRes.data.isSignupDisable);
    }


    //Logout Functionality
    const logoutHandler = async (e) => {
        console.log("logout handler call");
        setUser(null);
        setUserToken(null);
        // localStorage.clear();
        localStorage.removeItem("accessToken");

        navigate("/login");
    };
    //End logout functionality


    // Password change Modal
    const [ResetShow, setPassShow] = useState(false);
    const ResetClose = () => setPassShow(false);
    const Resetpass = () => setPassShow(true);
    //Change Password

    const {
        register,
        handleSubmit,
        setValue,
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
            pattern: {
                value: /^(?=.*[!@#\$%\^&\*\(\)\-=_\+`~\[\]\{\}\|\\;:'",\.<>\/\?])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#\$%\^&\*\(\)\-=_\+`~\[\]\{\}\|\\;:'",\.<>\/\?]{8,}$/,
                message: "New Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            },
        },
        confirmNewPassword: {
            required: "Enter Confirm password.",
            minLength: {
                value: 8,
                message: "Confirm password must have at least 8 characters",
            },
            pattern: {
                value: /^(?=.*[!@#\$%\^&\*\(\)\-=_\+`~\[\]\{\}\|\\;:'",\.<>\/\?])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#\$%\^&\*\(\)\-=_\+`~\[\]\{\}\|\\;:'",\.<>\/\?]{8,}$/,
                message: "Confirm password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            },
        },
    };


    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const handleToggleCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };



    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };



    return (
        <>
            <Navbar className="header-nav" expand="lg">
                <Container>
                    <div className="mainheader">
                        <Navbar.Brand>
                            <Link to="/admin/dashboard">
                                <img className="lightmode" src="/images/logo.png" alt="logo" />
                            </Link>
                            <Link to="/admin/dashboard">
                                <img
                                    className="darkmode"
                                    src="/images/logowhite.png"
                                    alt="logo"
                                />
                            </Link>
                        </Navbar.Brand>
                        <Nav className="mx-auto me-0 mob-none">
                            <ul className='restrict-logins'>
                                <li onClick={() => siteStatusHandler('login')} >
                                    <p>Login Restrict</p>
                                    <Form.Check
                                        type="switch"
                                        checked={isSiteLoginDisable}
                                        id="login-switch"
                                    />
                                </li>
                                <li onClick={() => siteStatusHandler('signup')} >
                                    <p>SignUp Restrict</p>
                                    <Form.Check
                                        type="switch"
                                        checked={isSiteSignupDisable}
                                        id="signup-switch"
                                    />
                                </li>
                            </ul>
                            <Link to='/admin/dashboard' className="homeicon">
                                <BiHome />
                            </Link>
                            <div className="text-lightgray" href="#">
                                <DarkModeSwitch />
                            </div>


                            <div className="relative user-dropdown">
                                <img src="/images/user.png" alt="user-img" />
                                <div className="Dropdown-listing bg-white">
                                    <div className="arrowshape"></div>
                                    <h4 className="text-silver">Account</h4>
                                    <ul>
                                        <li className="text-secondry" onClick={Resetpass} >
                                            <MdLogout />
                                            Change Password
                                        </li>
                                        <li className="text-secondry" onClick={logoutHandler}>
                                            <MdLogout />
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </Nav>
                        <div className="mobilemenu">
                            <ul className="web-none">
                                <li>
                                    <Link to="/notfound">
                                        <BsSearch />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notification">
                                        <BsBell />
                                    </Link>
                                </li>
                            </ul>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        </div>
                    </div>

                </Container>
            </Navbar>



            {/* Password change modal  */}
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
                            <div className='formerrorset'>

                                <Form.Control
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    placeholder="......."
                                    name="currentPassword"
                                    {...register(
                                        "currentPassword",
                                        registerOptions.currentPassword
                                    )}

                                    onChange={async (e) => {
                                        e.target.value = e.target.value.toString().trim();
                                        setValue('currentPassword', e.target.value, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        })
                                    }}
                                />
                                <div className='cursor-pointer eyeset' onClick={handleToggleCurrentPassword}>
                                    {showCurrentPassword ?
                                        <p>< AiOutlineEyeInvisible /></p>
                                        :
                                        <p><AiOutlineEye /></p>
                                    }
                                </div>
                            </div>
                            <small className="text-danger">
                                {errors?.currentPassword && errors.currentPassword.message}
                            </small>
                        </Form.Group>
                        <Form.Group className="editor-input" controlId="">
                            <Form.Label>Type new password</Form.Label>
                            <div className='formerrorset'>

                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="......."
                                    name="newPassword"
                                    {...register("newPassword", registerOptions.newPassword)}

                                    onChange={async (e) => {
                                        e.target.value = e.target.value.toString().trim();
                                        setValue('newPassword', e.target.value, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        })
                                    }}
                                />
                                <div className='cursor-pointer eyeset' onClick={handleTogglePassword}>
                                    {showPassword ?
                                        <p>< AiOutlineEyeInvisible /></p>
                                        :
                                        <p><AiOutlineEye /></p>
                                    }
                                </div>
                            </div>
                            <small className="text-danger">
                                {errors?.newPassword && errors.newPassword.message}
                            </small>
                        </Form.Group>
                        <Form.Group className="editor-input" controlId="">
                            <Form.Label>Re-type new password</Form.Label>
                            <div className='formerrorset'>

                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="......."
                                    name="confirmNewPassword"
                                    {...register(
                                        "confirmNewPassword",
                                        registerOptions.confirmNewPassword
                                    )}

                                    onChange={async (e) => {
                                        e.target.value = e.target.value.toString().trim();
                                        setValue('confirmNewPassword', e.target.value, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        })
                                    }}
                                />
                                <div className='cursor-pointer eyeset' onClick={handleToggleConfirmPassword}>
                                    {showConfirmPassword ?
                                        <p>< AiOutlineEyeInvisible /></p>
                                        :
                                        <p><AiOutlineEye /></p>
                                    }
                                </div>
                            </div>
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

        </>
    );
};

export default Header;

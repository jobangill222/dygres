import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { DContext } from "../../Context/DContext";
import { useForm } from "react-hook-form";


const ResetPassword = () => {

    const { userResetPassword } = useContext(DContext)

    const navigate = useNavigate();


    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const handleRegistration = async (data) => {
        // e.preventDefault()
        console.log('data-----', data);
        if (data.password !== data.confirmPassword) {
            toast('One of these things is not like the other. These passwords do not match.');
            return
        }

        try {

            const axiosRes = await userResetPassword(data)

            console.log('axiosRes', axiosRes);
            if (axiosRes.status === 'success') {
                toast(axiosRes.message);
                navigate("/");
            } else {
                const errorMessage = axiosRes.message;
                toast(errorMessage);
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleError = (errors) => {
        console.log(errors);
    };

    const registerOptions = {
        password: {
            required: "Enter Password",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
            },
            pattern: {
                value: /^(?=.*[!@#\$%\^&\*\(\)\-=_\+`~\[\]\{\}\|\\;:'",\.<>\/\?])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#\$%\^&\*\(\)\-=_\+`~\[\]\{\}\|\\;:'",\.<>\/\?]{8,}$/,
                message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            },
        },
        confirmPassword: {
            required: "Enter confirm password.",
            minLength: {
                value: 8,
                message: "Confirm password must have at least 8 characters"
            },
            pattern: {
                value: /^(?=.*[!@#\$%\^&\*\(\)\-=_\+`~\[\]\{\}\|\\;:'",\.<>\/\?])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#\$%\^&\*\(\)\-=_\+`~\[\]\{\}\|\\;:'",\.<>\/\?]{8,}$/,
                message: "Confirm password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            },
        }
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
            <div className="Auth-bar">
                <Container>
                    <div className="Authbar-innerbox">
                        <h4>Reset Password</h4>
                        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Type new password</Form.Label>
                                <div className='formerrorset'>
                                    <Form.Control type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                        name="password"
                                        {...register('password', registerOptions.password)}
                                        // value={password} 
                                        // onChange={e => setPassword(e.target.value)}
                                        onChange={async (e) => {
                                            e.target.value = e.target.value.toString().trim();
                                            setValue('password', e.target.value, {
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
                                    {errors?.password && errors.password.message}
                                </small>

                            </Form.Group>
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Re-type new password</Form.Label>

                                <div className='formerrorset'>
                                    <Form.Control type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Enter new password again"
                                        name="confirmPassword"
                                        {...register('confirmPassword', registerOptions.confirmPassword)}
                                        // value={confirmPassword} 
                                        // onChange={e => setConfirmPassword(e.target.value)}
                                        onChange={async (e) => {
                                            e.target.value = e.target.value.toString().trim();
                                            setValue('confirmPassword', e.target.value, {
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
                                    {errors?.confirmPassword && errors.confirmPassword.message}
                                </small>

                            </Form.Group>
                            <Button variant="primary" type="submit"   >
                                Submit
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default ResetPassword;
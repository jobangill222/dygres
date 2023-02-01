import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { DContext } from "../../Context/DContext";
import { useForm } from "react-hook-form";
import Loader from "../Loader";

const GetOtp = () => {

    const { userGetOtp, isLoading, setIsLoading } = useContext(DContext)

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = async (data) => {
        // e.preventDefault()
        // console.log(data);
        setIsLoading(true);
        try {
            const axiosRes = await userGetOtp(data)
            console.log('axiosRes', axiosRes);
            if (axiosRes.status === 'success') {
                localStorage.setItem('email', data.email)
                toast(axiosRes.message);
                navigate("/enterotp");
            } else {
                const errorMessage = axiosRes.message;
                toast(errorMessage);
            }
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false);
    }
    const handleError = (errors) => {
        console.log(errors);
    };

    const registerOptions = {
        email: { required: "Enter Email Address" },
    };




    return (
        <>

            {isLoading && <Loader />}

            <div className="Auth-bar">
                <Container>
                    <div className="Authbar-innerbox">
                        <h4>Get OTP</h4>
                        <p>Please enter your email to get OTP for password reset.</p>
                        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Your email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    {...register('email', registerOptions.email)}
                                // value={email} 
                                // onChange={e => setEmail(e.target.value)}    
                                />
                                <small className="text-danger">
                                    {errors?.email && errors.email.message}
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

export default GetOtp;
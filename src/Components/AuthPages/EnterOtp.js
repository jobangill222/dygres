import React,{useContext} from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { DContext } from "../../Context/DContext";
import { useForm } from "react-hook-form";

const EnterOtp = () => {

    const {userEnterOtp} = useContext(DContext)
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = async(data) => {
        // e.preventDefault()
        console.log(data);

        try{

            const axiosRes = await userEnterOtp(data) 
            console.log('axiosRes' , axiosRes); 
            if(axiosRes.status === 'success'){ 
                toast(axiosRes.message);
                navigate("/resetpassword");
            }else{
                const errorMessage = axiosRes.message;
                toast(errorMessage);
            }
        }catch(err){
            console.log(err)
        }
    } 
    const handleError = (errors) => {
        console.log(errors);
    };

    const registerOptions = {
        otp: {
            required: "Please enter OTP.",
            minLength: {
              value: 6,
              message: "OTP must have at least 6 characters"
            }
          }
    };



    return (
        <>
            <div className="Auth-bar">
                <Container>
                    <div className="Authbar-innerbox">
                        <h4>Enter OTP</h4>
                        <p>Please check your email for a message with your OTP.</p>
                        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                            <Form.Group className="authinputbar" controlId="formBasicEmail">
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control type="number" placeholder="e.g. 123456"
                                name="otp" 
                                {...register('otp', registerOptions.otp)}
                                // value={otp} 
                                // onChange={e => setOtp(e.target.value)}
                            />
                            <small className="text-danger">
                                    {errors?.otp && errors.otp.message}
                                </small>
                            </Form.Group>
                            {/* <Link className="btn btn-primary" onClick={enterOtpHandler}>Submit</Link> */}
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

export default EnterOtp;
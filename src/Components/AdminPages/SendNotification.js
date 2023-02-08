import React, { useContext } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Context
import { useNavigate } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendNotification = () => {

    const navigate = useNavigate();

    const { sendNotificationToAllDContext } = useContext(DContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const submitNotification = async (data) => {
        // e.preventDefault()
        // console.log(data);

        try {
            await sendNotificationToAllDContext(data);
            // console.log("axiosRes", axiosRes);
            toast('Notification start sending.');
            navigate("/admin/users");
        } catch (err) {
            console.log(err);
        }
    };
    const handleError = (errors) => {
        console.log(errors);
    };

    const notificationOptions = {
        notification: { required: "Enter notification." },
    };



    return (
        <>
            <Container>
                <div className="dashboard-title-bar">
                    <Row>
                        <Col lg="12">
                            <h4>Send notification</h4>
                        </Col>
                    </Row>
                </div>
                <div className="Whatsmind-bar mt-5">
                    <form onSubmit={handleSubmit(submitNotification, handleError)}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea"
                                rows={6}
                                name='notification'
                                placeholder="Send notification to all users here............"
                                {...register("notification", notificationOptions.notification)}
                            />
                            <small className="text-danger">
                                {errors?.notification && errors.notification.message}
                            </small>

                            <div className="text-end">
                                <Button type="submit" className="bg-primary text-white">Send</Button>
                            </div>
                        </Form.Group>
                    </form>
                </div>
            </Container>

        </>
    );
}

export default SendNotification;
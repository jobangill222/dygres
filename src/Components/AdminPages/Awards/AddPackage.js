import React, { useState, useRef, useContext } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { useForm } from "react-hook-form";
import { DContext } from "../../../Context/DContext";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { FaTimes } from 'react-icons/fa';

export default function AddPackage() {

    const { isLoading, setIsLoading, addAwardDContext } = useContext(DContext);

    const navigate = useNavigate();

    //Set file state
    const [file, setFile] = useState();
    const imageRef = useRef(null);

    //Upload Image function
    const uploadAwardImage = async (e) => {

        const imageSize = e.target.files[0].size;
        const imageType = e.target.files[0].type;
        console.log("imageType", imageType);

        if (imageSize > 10485760) {
            toast("Images must be smaller than 10 MB.");
        }
        else if (imageType !== "image/png" && imageType !== "image/ppg" && imageType !== "image/jpeg" && imageType !== "image/gif") {
            toast("Unsupported image format. Please upload a gif, png, jpg, or .jpeg instead.");
        }
        else {
            const url = URL.createObjectURL(e.target.files[0]);
            setFile(e.target.files[0]);
            // console.log('url' , url)
            imageRef.current.src = url;
            imageRef.current.onload = function () {
                URL.revokeObjectURL(imageRef.current.src); // free memory
            };
        }
    };




    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleRegistration = async (data) => {
        console.log(data);

        if (!file) {
            toast("Please upload thumbnail.");
            return;
        }
        try {
            setIsLoading(true);

            //Convert to Bodyfrom data
            var bodyFormData = new FormData();
            bodyFormData.append("name", data.name);
            bodyFormData.append("status", data.status);
            bodyFormData.append("image", file);

            const axiosRes = await addAwardDContext(bodyFormData);

            console.log('axiosRes', axiosRes)
            if (axiosRes.status === "success") {
                toast('Award added successfully.');
                navigate("/admin/awardList");
            } else {
                toast('Unable to create award.');
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
        name: {
            required: "Enter Award Name",
        },
        status: {
            required: "Please select type",
        },
    };


    return (
        <Container>

            {isLoading && <Loader />}

            <div className="dashboard-title-bar addawardsadmin">
                <Row>
                    <Col lg="6">
                        <h4>Add Package</h4>
                    </Col>
                </Row>
                <div className="addawards-editorbar">
                    <Row>
                        <Col lg="6">
                            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                                <Form.Group className="editor-input" controlId="">
                                    <Form.Label>Package name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter award name"
                                        {...register("name", registerOptions.name)}
                                    />
                                    <small className="text-danger">
                                        {errors?.name && errors.name.message}
                                    </small>
                                </Form.Group>


                                <Form.Group className="editor-input " controlId="">
                                    <Form.Label>Add thumbnail image</Form.Label>

                                    <div className="Uploaded-user">
                                        <div className="Imagebar">
                                            <img
                                                src="/images/user172.png"
                                                alt="icon"
                                                id="output"
                                                ref={imageRef}
                                            />
                                            <div className="userup-in">
                                                <div className="typefile">
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        onChange={uploadAwardImage}
                                                    // title="Select 152*152 px image"
                                                    />
                                                    <TbCameraPlus />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Group>
                                {/* package listing */}
                                <Table className='package-listtb'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Awards:</th>
                                            <th>Qty:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td><img src="/images/award1.png" alt='awards-icon'/>Award name</td>
                                            <td>100</td>
                                            <td><button className='crosicon'><FaTimes/></button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div className='addpack'>
                                <Link className='addbtn' to='/admin/addpackage'>+Add Package</Link>
                                </div>
                                <Form.Group className="editor-input " controlId="">
                                    <Form.Label>Award Price</Form.Label>
                                    <Form.Select aria-label="Default select example" {...register("status", registerOptions.status)}>
                                        <option value=''>Enter award price</option>
                                        <option value='free'>100</option>
                                        <option value="paid">200</option>
                                    </Form.Select>
                                    <small className="text-danger">
                                        {errors?.status && errors.status.message}
                                    </small>
                                </Form.Group>
                                <div className="text-start mt-3 save-form-btn" >
                                    <Button className="bg-primary text-white" type="submit">
                                        Add Package
                                    </Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </div>
            </div>



        </Container>
    )
}

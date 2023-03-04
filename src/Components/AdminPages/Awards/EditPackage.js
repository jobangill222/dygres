import React, { useState, useRef, useContext, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { BsUpload } from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { useForm } from "react-hook-form";
import { DContext } from "../../../Context/DContext";
import { useNavigate } from "react-router-dom";


import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { FaTimes } from 'react-icons/fa';

import { BASE_URL } from '../../../Config/index';
import AddAwardToPackageModal from "../Modals/AddAwardToPackageModal";

export default function EditAward() {

    const { isLoading, setIsLoading, packageDetailByIdAdminDContext, editpackageAdminDContext, removeAwardFromPackageAdminDContext } = useContext(DContext);
    const navigate = useNavigate();

    let { packageID } = useParams();

    const [addAwardSubmitState, setAddAwardSubmitState] = useState(false);

    // Define State
    const [awardOfPackageState, setAwardOfPackageState] = useState([]);
    const [packageFiledsState, setPackageFieldsState] = useState({
        name: "",
        amount: "",
        image: "",
    });

    useEffect(() => {
        getPackageDetails(packageID);
        setAddAwardSubmitState(false);
    }, [packageID, addAwardSubmitState])


    //Set existing values in state
    const getPackageDetails = async (packageID) => {
        // console.log('packageDetailByIdAdminDContextpackageDetailByIdAdminDContext=----', packageID)
        const axiosRes = await packageDetailByIdAdminDContext(packageID);
        // console.log('axiosResaxiosResaxiosResaxiosResaxiosRes', axiosRes)
        //Set values in state
        setAwardOfPackageState(axiosRes.awardDetails);

        let dataFields = {
            name: axiosRes.data[0]?.name
                ? axiosRes.data[0].name
                : "",
            image: axiosRes.data[0]?.image
                ? axiosRes.data[0].image
                : "/images/user172.png",
            amount: axiosRes.data[0]?.amount ? axiosRes.data[0].amount : "",
        };
        setPackageFieldsState(dataFields);

        setFile(axiosRes.data[0]?.image)
        // console.log('packageFiledsStatepackageFiledsStatepackageFiledsState', packageFiledsState)
    }


    //Set file state
    const [file, setFile] = useState();
    const imageRef = useRef(null);

    //Upload Image function
    const uploadAwardImage = async (e) => {

        const imageSize = e.target.files[0].size;
        const imageType = e.target.files[0].type;
        // console.log("imageType", imageType);

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
        setValue, reset
    } = useForm();

    useEffect(() => {
        // console.log(packageFiledsState);
        if (packageFiledsState.name !== "") {
            // console.log("apply fields");
            reset(packageFiledsState);
        }
    }, [packageFiledsState]);


    // Edit form submit
    const handleRegistration = async (data) => {
        // console.log(data);

        if (!file) {
            toast("Please upload thumbnail.");
            return;
        }
        try {
            setIsLoading(true);
            //Convert to Bodyfrom data
            var bodyFormData = new FormData();
            bodyFormData.append("packageID", packageID);
            bodyFormData.append("name", data.name);
            bodyFormData.append("amount", data.amount);
            bodyFormData.append("image", file);

            const axiosRes = await editpackageAdminDContext(bodyFormData);

            if (axiosRes.status === "success") {
                toast('Package edit successfully.');
                navigate("/admin/packageList");
            } else {
                toast('Unable to create package.');
            }

            setIsLoading(false);

        } catch (err) {
            console.log(err);
        }
    };
    const handleError = (errors) => {
        console.log(errors);
    };


    //Validations
    const registerOptions = {
        name: {
            required: "Enter Package Name",
        },
        amount: {
            required: "Please enter amount",
        },
    };



    //Remove Award from package
    const removeAwadFromPackage = async (awardID) => {
        await removeAwardFromPackageAdminDContext(packageID, awardID);
        const result = awardOfPackageState.filter(award => award.awardID._id !== awardID);
        setAwardOfPackageState(result);
    }


    //Add award to package popup state
    const [addAwardPopupState, setAddAwardPopupState] = useState(false);

    return (

        <>

            {isLoading && <Loader />}

            {addAwardPopupState && < AddAwardToPackageModal addAwardPopupState={addAwardPopupState} setAddAwardPopupState={setAddAwardPopupState} packageID={packageID} setAddAwardSubmitState={setAddAwardSubmitState} />}

            < Container >

                <div className="dashboard-title-bar addawardsadmin">
                    <Row>
                        <Col lg="6">
                            <h4>Edit Package</h4>
                        </Col>
                        <Col lg="6">
                            <div className='addpack m-0 align-right' onClick={() => setAddAwardPopupState(true)}>
                                <Link className='addbtn' onClick={(e) => {
                                    e.preventDefault();
                                }} to="/" >+ Add Award</Link>
                            </div>
                        </Col>
                    </Row>
                    <div className="addawards-editorbar">
                        <Row>
                            <Col lg="6" className='addpackbox'>
                                <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                                    <Form.Group className="editor-input" controlId="">
                                        <Form.Label>Package name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter award name"
                                            {...register("name", registerOptions.name)}
                                            onChange={(e) => setValue('name', e.target.value)}

                                        />
                                        <small className="text-danger">
                                            {errors?.name && errors.name.message}
                                        </small>
                                    </Form.Group>


                                    <Form.Group className="editor-input" controlId="">
                                        <Form.Label>Package Amount($)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter package amount"
                                            {...register("amount", registerOptions.amount)}
                                            onChange={(e) => setValue('amount', e.target.value)}
                                        />
                                        <small className="text-danger">
                                            {errors?.amount && errors.amount.message}
                                        </small>
                                    </Form.Group>



                                    <Form.Group className="editor-input " controlId="">
                                        <Form.Label>Upload Thumbnail</Form.Label>
                                        {/* <div className="editor-same-line">
                                    <div className='upload-media-verify'>
                                        <div className="imagebarupload">
                                            <Button className='bg-primary text-white'>
                                                <input type="file" />
                                                <BsUpload className="me-2" />
                                                Upload Image
                                            </Button>
                                        </div>
                                    </div>
                                </div> */}
                                        <div className="Uploaded-user">
                                            <div className="Imagebar">
                                                <img
                                                    src={packageFiledsState?.image ? packageFiledsState.image : "/images/user172.png"}
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


                                    <div className="text-start mt-3 save-form-btn" >
                                        <Button className="bg-primary text-white" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </form>


                            </Col>
                            <Col lg="6" className='particitionbar addpackbox'>


                                <Table className='package-listtb'>
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>Awards Image</th>
                                            <th>Awards Name</th>
                                            <th>Qty:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {awardOfPackageState.length ? awardOfPackageState.map((awardDetail, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td><img src={awardDetail?.awardID?.image ? BASE_URL + '/awards/' + awardDetail.awardID.image : "/images/award1.png"} alt='awards-icon' /></td>
                                                <td>{awardDetail.awardID.name}</td>
                                                <td>{awardDetail.awardCount}</td>
                                                <td><button className='crosicon' onClick={() => removeAwadFromPackage(awardDetail.awardID._id)} ><FaTimes /></button></td>
                                            </tr>
                                        )) :
                                            null}

                                    </tbody>
                                </Table>

                                {awardOfPackageState.length === 0 ?
                                    <div className="empty-bar">
                                        <img src="/images/empty.png" alt='dummy' />
                                        <h4>Empty List</h4>
                                    </div>
                                    :
                                    null}



                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>



        </>
    )
}

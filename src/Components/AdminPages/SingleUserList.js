import React, { useEffect, useState, useContext } from 'react'
import { BsThreeDotsVertical, BsFilePost, BsFlag } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { BiIdCard } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BlockUser from "./BlockUser";
import Form from 'react-bootstrap/Form';
import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function SingleUserList(props) {

    const { singleUser, userList, setUserList } = props;

    const { officialUnofficialUserAdminDContext, deleteUserDContext } = useContext(DContext);

    const navigate = useNavigate();

    const goToUserVerification = async (userIDForVerification) => {
        navigate('/admin/userverification/' + userIDForVerification)
    }


    const userDetails = async (userID) => {
        navigate('/admin/post/' + userID)
    }

    const usersFlaggedPost = async (userID) => {
        navigate('/admin/flagpost/' + userID)
    }


    const [isOfficialState, setIsOfficialState] = useState(false);
    useEffect(() => {
        if (singleUser?.isOfficial && singleUser?.isOfficial === 1) {
            setIsOfficialState(true)
        }
    }, [])

    const isOfficialToggle = async () => {
        const axiosRes = await officialUnofficialUserAdminDContext(singleUser._id);
        if (axiosRes.action === "un-official") {
            setIsOfficialState(false)
        } else {
            setIsOfficialState(true)
        }
    }


    const [isBlockState, setIsBlockState] = useState(false);
    useEffect(() => {
        if (singleUser.isBlock === 1) {
            setIsBlockState(true);
        }
    }, [singleUser.isBlock])


    const deleteUserhandler = async (userID) => {
        const deleteBy = 'admin';
        const axiosRes = await deleteUserDContext(deleteBy, userID);
        if (axiosRes.status === 'success') {
            const result = userList.filter(user => user._id !== singleUser?._id);
            setUserList(result);
        } else {
            toast(axiosRes.message);
        }
    }



    const [isShowDeleteUserConfirmationModal, setIsShowDeleteUserConfirmationModal] = useState(false);


    return (
        <>
            <tr className={isBlockState ? 'red-list' : ''}>
                <td className='align-middle'>{singleUser?.name ? singleUser.name : 'No Name'} </td>
                <td className='align-middle'>{singleUser?.username}</td>
                <td className='align-middle'>{singleUser?.email}</td>

                <td className='align-middle'>{singleUser?.isEmailVerify === 1 ? 'Yes' : 'No'}</td>

                <td className='align-middle' onClick={isOfficialToggle} >
                    <Form.Check
                        className='table-toggle-checkbox'
                        type="switch"
                        id="custom-switch"
                        checked={isOfficialState}
                    />
                </td>
                <td className='align-middle'>
                    <div className="number-bar">
                        <p>{singleUser?.phoneNumber ? singleUser.phoneNumber : "No Phone Number"}</p>
                        <div className="user-dropdown">
                            <BsThreeDotsVertical />
                            <ul className="Dropdown-listing">
                                {/* <li className="text-secondry">
                                    <Link ><MdBlock />Block</Link>
                                </li> */}
                                <BlockUser userID={singleUser._id} isBlock={singleUser.isBlock} isBlockState={isBlockState} setIsBlockState={setIsBlockState} />

                                <li className="text-secondry" onClick={() => userDetails(singleUser.username)} >
                                    {/* <Link to="/admin/post"><BsFilePost />Posts</Link> */}
                                    <Link onClick={(e) => {
                                        e.preventDefault();
                                    }} to="/"><BsFilePost />Posts</Link>
                                </li>
                                <li className="text-secondry" onClick={() => usersFlaggedPost(singleUser._id)}>
                                    <BsFlag />Flagged Posts
                                </li>
                                <li className="text-secondry" onClick={() => goToUserVerification(singleUser?._id)}>
                                    {/* <Link to="/admin/userverification"><BiIdCard />User Verification</Link> */}
                                    <BiIdCard />User Verification
                                </li>

                                {/* <li className="text-secondry" onClick={() => deleteUserhandler(singleUser?._id)}>
                                    <AiFillDelete />Delete User
                                </li> */}

                                <li className="text-secondry" onClick={() => setIsShowDeleteUserConfirmationModal(true)}>
                                    <AiFillDelete />Delete User
                                </li>

                            </ul>
                        </div>
                    </div>
                </td>
            </tr>

            {isShowDeleteUserConfirmationModal &&
                <>
                    < Modal className="Actions-modal  deletemodal" show={isShowDeleteUserConfirmationModal} onHide={() => setIsShowDeleteUserConfirmationModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete User ?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to Delete this User ?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-primary" onClick={() => setIsShowDeleteUserConfirmationModal(false)}>
                                No
                            </Button>
                            <Button variant="primary" onClick={() => deleteUserhandler(singleUser?._id)}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }

        </>
    )
}

import React, { useState, useContext } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import SingleNotificationHead from "./SingleNotificationHead";
import SingleNotificationContent from "./SingleNotificationContent";
import { DContext } from "../../Context/DContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SingleNotificationList(props) {

    const { singleNotification } = props;

    const { deleteNotificationDContext, notificationList, setNotificationList } = useContext(DContext);

    // Delete Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const yesDeleteNotification = async () => {
        let notificationID = singleNotification._id;
        const axiosDeleteRes = await deleteNotificationDContext(notificationID);
        if (axiosDeleteRes.status === "success") {
            const result = notificationList.filter(notifications => notifications._id !== notificationID);
            setNotificationList(result);
            setShow(false);
        }
        else {
            toast(axiosDeleteRes.message);
        }
    }

    return (
        <>
            <div className="relative notification-content unreadmark">
                <div className="user-detail-bar">
                    <div className="detailleft">
                        {/* <div className="userleftside">
                            <div className="avatar-img active">
                                <img src="/images/user.png" alt="user-img" />
                            </div>
                            <div className="user-detail">
                                <h4 className="text-secondry">Amanpreet Singh</h4>
                                <div className="user-availbility">
                                    <h6 className="text-lightgray">@amans</h6>
                                    <h5 className="text-lightgray greentime">1hr ago</h5>
                                </div>
                                <div className="levelbar text-darkwhite level1">Level1 <h6 className="level1-circle"><span className="text-white lvlstar">2</span></h6></div>
                            </div>
                        </div> */}
                        <SingleNotificationHead singleNotification={singleNotification} />
                    </div>
                    <div className="user-active-timer">
                        <ul>
                            <li onClick={handleShow} className="text-green"><RiDeleteBin6Line /></li>
                        </ul>
                    </div>
                </div>
                <SingleNotificationContent singleNotification={singleNotification} />
            </div>


            {/* Delete modal */}
            <Modal className="Actions-modal  deletemodal" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Notification ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Delete this notification ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={yesDeleteNotification}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Notifications = () => {
    // Delete Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="Notfy-block">
                <div className="relative notification-title">
                    <h4>Notifications</h4>
                    <ul>
                        <li><button className="btn-nill" type="button">Mark all as read</button></li>
                        <li><button className="btn-nill" type="button">Clear all</button></li>
                    </ul>
                </div>
                <div className="relative notification-content unreadmark">
                    <div className="user-detail-bar">
                        <div className="detailleft">
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
                        </div>
                        <div className="user-active-timer">
                            <ul>
                                <li onClick={handleShow} className="text-green"><RiDeleteBin6Line /></li>
                            </ul>
                        </div>
                    </div>
                    <p className="notify">Hannah Koph agreed with your post</p>
                </div>
                <div className="relative notification-content unreadmark">
                    <div className="user-detail-bar">
                        <div className="detailleft">
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
                        </div>
                        <div className="user-active-timer">
                            <ul>
                                <li onClick={handleShow} className="text-green"><RiDeleteBin6Line /></li>
                            </ul>
                        </div>
                    </div>
                    <p className="notify">Hannah Koph agreed with your post</p>
                </div>
                <div className="relative notification-content readmark">
                    <div className="user-detail-bar">
                        <div className="detailleft">
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
                        </div>
                        <div className="user-active-timer">
                            <ul>
                                <li onClick={handleShow} className="text-green"><RiDeleteBin6Line /></li>
                            </ul>
                        </div>
                    </div>
                    <p className="notify">Hannah Koph agreed with your post</p>
                </div>
                <div className="relative notification-content readmark">
                    <div className="user-detail-bar">
                        <div className="detailleft">
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
                        </div>
                        <div className="user-active-timer">
                            <ul>
                                <li onClick={handleShow} className="text-green"><RiDeleteBin6Line /></li>
                            </ul>
                        </div>
                    </div>
                    <p className="notify">Hannah Koph agreed with your post</p>
                </div>
                <div className="relative notification-content readmark">
                    <div className="user-detail-bar">
                        <div className="detailleft">
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
                        </div>
                        <div className="user-active-timer">
                            <ul>
                                <li onClick={handleShow} className="text-green"><RiDeleteBin6Line /></li>
                            </ul>
                        </div>
                    </div>
                    <p className="notify">Hannah Koph agreed with your post</p>
                </div>
            </div>

            {/* Delete modal */}
            <Modal  className="Actions-modal"  show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Delete this post ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Notifications;
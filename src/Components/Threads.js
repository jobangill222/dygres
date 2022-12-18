import React, { useState } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaGift, FaComments } from 'react-icons/fa';
import { BsFillFlagFill, BsPencil } from 'react-icons/bs';
import { ImForward } from 'react-icons/im';
import { RiDeleteBin6Line , RiMessageFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
const Threads = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Accordion >
                <Accordion.Item eventKey="2">
                    <h4>Threads</h4>
                    <div className="user-detail-bar">
                        <div className="detailleft">
                            <div className="userleftside">
                                <div className="avatar-img active">
                                    <img src="/images/user.png" alt="user-img" />
                                </div>
                                <div className="user-detail">
                                    <div className='follow-bar'>
                                        <h4 className="text-secondry">Amanpreet Singh</h4>
                                        {/* <button className='followbtn' type='button'>Follow</button> */}
                                    </div>
                                    <div className="user-availbility">
                                        <h6 className="text-lightgray">@amans</h6>
                                        <h5 className="text-lightgray redtime">1hr ago</h5>
                                    </div>
                                    <div className="levelbar text-darkwhite level2">Level2 <h6 className="level2-circle"><span className="text-white lvlstar">2</span></h6></div>
                                </div>
                            </div>
                        </div>
                        <div className="user-active-timer">
                            <ul>
                                <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                            </ul>
                        </div>
                    </div>
                    <div className='threads-rows'>
                        <div className="user-preview">
                            <div className="Description-bar">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <span className="text-primary">#HelloWorld</span> <span className="text-primary">@methewreed</span> <span className="text-primary">@iamhannah</span></p>
                            </div>
                            <div className="action-bar">
                                <ul className="actionleftbar">
                                    <li className='active' ><AiFillLike /><span className="number">12</span>Agree</li>
                                    <li><FaGift /><span className="number">6</span>Award</li>
                                    <li><AiFillDislike /><span className="number">12</span>Disagree</li>
                                    <li>
                                        <Accordion.Header><FaComments /><span className="number">12</span>Threads</Accordion.Header>
                                    </li>
                                    <li>
                                        <RiMessageFill />Reply
                                    </li>
                                    <li>
                                        <Dropdown className="hoverdropdown">
                                            <Dropdown.Toggle className="p-0 bg-transparent border-0 text-lightgray" variant="success" id="dropdown-basic">
                                                <BsFillFlagFill /><span className="number">12</span>Report
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href=""><BsPencil />Edit Post</Dropdown.Item>
                                                <Dropdown.Item onClick={handleShow}><RiDeleteBin6Line />Delete Post</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                </ul>
                                <ul className="actionrytbar">
                                    <li><ImForward />Share</li>
                                </ul>
                            </div>
                        </div>
                        <Accordion.Body className='thredsbar thredsbar-inner'>
                            <Accordion >
                                <Accordion.Item eventKey="3">
                                    <div className="user-detail-bar">
                                        <div className="detailleft">
                                        <div className="userleftside">
                                            <div className="avatar-img active">
                                                <img src="/images/user.png" alt="user-img" />
                                            </div>
                                            <div className="user-detail">
                                                <div className="follow-bar"><h4 className="text-secondry">Amanpreet Singh</h4>
                                                    {/* <button className="followbtn" type="button">Follow</button> */}
                                                </div>
                                                <div className="user-availbility">
                                                    <h6 className="text-lightgray">@amans</h6>
                                                    <h5 className="text-lightgray greentime">1hr ago</h5>
                                                </div>
                                                <div className="levelbar text-darkwhite level1">Level1 <h6 className="level1-circle"><span className="text-white lvlstar">2</span></h6></div>
                                            </div>
                                            </div>

                                        </div>
                                        <div className="user-active-timer">
                                            <ul>
                                                <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='threads-rows'>
                                        <div className="user-preview">
                                            <div className="Description-bar">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <span className="text-primary">#HelloWorld</span> <span className="text-primary">@methewreed</span> <span className="text-primary">@iamhannah</span></p>
                                            </div>
                                            <div className="action-bar">
                                                <ul className="actionleftbar">
                                                    <li><AiFillLike /><span className="number">12</span>Agree</li>
                                                    <li><FaGift /><span className="number">6</span>Award</li>
                                                    <li><AiFillDislike /><span className="number">12</span>Disagree</li>
                                                    <li><Accordion.Header><FaComments /><span className="number">12</span>Threads</Accordion.Header></li>
                                                    <li>
                                                        <Dropdown className="hoverdropdown">
                                                            <Dropdown.Toggle className="p-0 bg-transparent border-0 text-lightgray" variant="success" id="dropdown-basic">
                                                                <BsFillFlagFill /><span className="number">12</span>Report
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href=""><BsPencil />Edit Post</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleShow}><RiDeleteBin6Line />Delete Post</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </li>
                                                    <li>
                                                        
                                                    </li>
                                                </ul>
                                                <ul className="actionrytbar">
                                                    <li><ImForward />Share</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="threads-rows ">
                                        <Accordion.Body className='thredsbar thredsbar-inner'>
                                            <div className="user-detail-bar">
                                                <div className="detailleft">
                                                <div className="userleftside">
                                                    <div className="avatar-img active">
                                                        <img src="/images/user.png" alt="user-img" />
                                                    </div>
                                                    <div className="user-detail">
                                                        <div className="follow-bar"><h4 className="text-secondry">Amanpreet Singh</h4>
                                                            {/* <button className="followbtn" type="button">Follow</button> */}
                                                        </div>
                                                        <div className="user-availbility">
                                                            <h6 className="text-lightgray">@amans</h6>
                                                            <h5 className="text-lightgray greentime">1hr ago</h5>
                                                        </div>
                                                        <div className="levelbar text-darkwhite level1">Level1 <h6 className="level1-circle"><span className="text-white lvlstar">2</span></h6></div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="user-active-timer">
                                                    <ul>
                                                        <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="user-preview threads-rows">
                                                <div className="Description-bar">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <span className="text-primary">#HelloWorld</span> <span className="text-primary">@methewreed</span> <span className="text-primary">@iamhannah</span></p>
                                                </div>
                                                <div className="action-bar">
                                                    <ul className="actionleftbar">
                                                        <li><AiFillLike /><span className="number">12</span>Agree</li>
                                                        <li><FaGift /><span className="number">6</span>Award</li>
                                                        <li><AiFillDislike /><span className="number">12</span>Disagree</li>
                                                        <li><FaComments /><span className="number">12</span>Threads</li>
                                                        <li>
                                                            <Dropdown className="hoverdropdown">
                                                                <Dropdown.Toggle className="p-0 bg-transparent border-0 text-lightgray" variant="success" id="dropdown-basic">
                                                                    <BsFillFlagFill /><span className="number">12</span>Report
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href=""><BsPencil />Edit Post</Dropdown.Item>
                                                                    <Dropdown.Item onClick={handleShow}><RiDeleteBin6Line />Delete Post</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </li>
                                                        <li>
                                                            
                                                        </li>
                                                    </ul>
                                                    <ul className="actionrytbar">
                                                        <li><ImForward />Share</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </div>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>

                    </div>
                    <div className='reply-post'>
                        <Form>
                            <Form.Group className='replyinput' controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="What are your thoughts............?" />
                            </Form.Group>
                            <Button type="submit">
                                Post
                            </Button>
                        </Form>
                    </div>
                </Accordion.Item>
            </Accordion>
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

export default Threads;
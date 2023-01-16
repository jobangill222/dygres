import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { MdOutlineTimer } from 'react-icons/md';
import { AiFillLike, AiFillDislike, AiOutlinePlus } from 'react-icons/ai';
import { FaUser, FaGift, FaComments } from 'react-icons/fa';
import { BsFillFlagFill, BsPencil, BsThreeDots, BsFlag } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Post = () => {
    // Delete Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Aggree Modal
    const [showAgree, setShowagree] = useState(false);
    const AgreeClose = () => setShowagree(false);
    const AgreeShow = () => setShowagree(true);
    // DisAggree Modal
    const [disshowAgree, setDisShowagree] = useState(false);
    const DisAgreeClose = () => setDisShowagree(false);
    const DisAgreeShow = () => setDisShowagree(true);
    // Awards Modal
    const [showAwards, setAwardsClose] = useState(false);
    const AwardsClose = () => setAwardsClose(false);
    const AwardsShow = () => setAwardsClose(true);
    // BuyMore Awards  
    const [showBuyAwards, setShowAwardsClose] = useState(false);
    const ShowBuyAwardsClose = () => setShowAwardsClose(false);
    const ShowAddMore = () => setShowAwardsClose(true);
    // Edit Report Modal
    const [EditReportShow, setEditreportshow] = useState(false);
    const EditReportClose = () => setEditreportshow(false);
    const EditReport = () => setEditreportshow(true);


    return (
        <>
            <Container>
                <div className="dashboard-title-bar">
                    <Row>
                        <Col lg="12">
                            <h4>Post</h4>
                        </Col>
                        <Col lg="12">
                            <div className="Username-titlebar">
                                <h6><FaUser />Amanpreet Singh</h6>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="usertable">
                    <div className="digital-feeds ">
                        <div className="user-detail-bar">
                            <div className="detailleft">
                                <div className="userleftside">
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
                                <ul className="awards-bar bg-darkgray">
                                    <li className="text-whitesure"><img src="/images/award1.png" alt="awards" />5</li>
                                    <li className="text-whitesure"><img src="/images/award2.png" alt="awards" />4</li>
                                    <li className="text-whitesure"><img src="/images/award3.png" alt="awards" />6</li>
                                    <li className="text-whitesure"><img src="/images/award4.png" alt="awards" />9</li>
                                </ul>
                            </div>
                            <div className="user-active-timer">
                                <ul>
                                    <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                                </ul>
                            </div>
                        </div>
                        <div className="user-preview">
                            <div className="Description-bar">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <span className="text-primary">#HelloWorld</span> <span className="text-primary">@methewreed</span> <span className="text-primary">@iamhannah</span></p>
                            </div>
                            <div className="action-bar">
                                <ul className="actionleftbar">
                                    <li className='active' onClick={AgreeShow}><AiFillLike /><span className="number">12</span>Agree</li>
                                    <li onClick={DisAgreeShow}><AiFillDislike /><span className="number">12</span>Disagree</li>
                                    <li onClick={AwardsShow}><FaGift /><span className="number">6</span>Award</li>
                                    <li><FaComments /><span className="number">12</span>Threads</li>
                                    <li>
                                        <Dropdown className="hoverdropdown">
                                            <Dropdown.Toggle className="p-0 bg-transparent border-0 text-lightgray" variant="success" id="dropdown-basic">
                                                <BsFillFlagFill /><span className="number">12</span>Report
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={EditReport}><BsPencil />Edit Post</Dropdown.Item>
                                                <Dropdown.Item onClick={handleShow}><RiDeleteBin6Line />Delete Post</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <BsThreeDots />
                                    </li>
                                </ul>
                                <ul className="actionrytbar flagbtnbar">
                                    <li >
                                        <Button className="bg-primary text-white"><BsFlag />Flag Post</Button>
                                        <Button className="bg-danger text-white"><RiDeleteBin6Line />Delete Post</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="usertable">
                    <div className="digital-feeds ">
                        <div className="user-detail-bar">
                            <div className="detailleft">
                                <div className="userleftside">
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
                                <ul className="awards-bar bg-darkgray">
                                    <li className="text-whitesure"><img src="/images/award1.png" alt="awards" />5</li>
                                    <li className="text-whitesure"><img src="/images/award2.png" alt="awards" />4</li>
                                    <li className="text-whitesure"><img src="/images/award3.png" alt="awards" />6</li>
                                    <li className="text-whitesure"><img src="/images/award4.png" alt="awards" />9</li>
                                </ul>
                            </div>
                            <div className="user-active-timer">
                                <ul>
                                    <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                                </ul>
                            </div>
                        </div>
                        <div className="user-preview">
                            <div className="Description-bar">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <span className="text-primary">#HelloWorld</span> <span className="text-primary">@methewreed</span> <span className="text-primary">@iamhannah</span></p>
                            </div>
                            <div className="action-bar">
                                <ul className="actionleftbar">
                                    <li onClick={AgreeShow}><AiFillLike /><span className="number">12</span>Agree</li>
                                    <li onClick={DisAgreeShow}><AiFillDislike /><span className="number">12</span>Disagree</li>
                                    <li onClick={AwardsShow}><FaGift /><span className="number">6</span>Award</li>
                                    <li><FaComments /><span className="number">12</span>Threads</li>
                                    <li>
                                        <Dropdown className="hoverdropdown">
                                            <Dropdown.Toggle className="p-0 bg-transparent border-0 text-lightgray" variant="success" id="dropdown-basic">
                                                <BsFillFlagFill /><span className="number">12</span>Report
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={EditReport}><BsPencil />Edit Post</Dropdown.Item>
                                                <Dropdown.Item onClick={handleShow}><RiDeleteBin6Line />Delete Post</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <BsThreeDots />
                                    </li>
                                </ul>
                                <ul className="actionrytbar flagbtnbar">
                                    <li >
                                        <Button className="bg-primary text-white"><BsFlag />Flag Post</Button>
                                        <Button className="bg-danger text-white"><RiDeleteBin6Line />Delete Post</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="usertable">
                    <div className="digital-feeds ">
                        <div className="user-detail-bar">
                            <div className="detailleft">
                                <div className="userleftside">
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
                                <ul className="awards-bar bg-darkgray">
                                    <li className="text-whitesure"><img src="/images/award1.png" alt="awards" />5</li>
                                    <li className="text-whitesure"><img src="/images/award2.png" alt="awards" />4</li>
                                    <li className="text-whitesure"><img src="/images/award3.png" alt="awards" />6</li>
                                    <li className="text-whitesure"><img src="/images/award4.png" alt="awards" />9</li>
                                </ul>
                            </div>
                            <div className="user-active-timer">
                                <ul>
                                    <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                                </ul>
                            </div>
                        </div>
                        <div className="user-preview">
                            <div className="Description-bar">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <span className="text-primary">#HelloWorld</span> <span className="text-primary">@methewreed</span> <span className="text-primary">@iamhannah</span></p>
                            </div>
                            <div className="action-bar">
                                <ul className="actionleftbar">
                                    <li onClick={AgreeShow}><AiFillLike /><span className="number">12</span>Agree</li>
                                    <li onClick={DisAgreeShow}><AiFillDislike /><span className="number">12</span>Disagree</li>
                                    <li onClick={AwardsShow}><FaGift /><span className="number">6</span>Award</li>
                                    <li><FaComments /><span className="number">12</span>Threads</li>
                                    <li>
                                        <Dropdown className="hoverdropdown">
                                            <Dropdown.Toggle className="p-0 bg-transparent border-0 text-lightgray" variant="success" id="dropdown-basic">
                                                <BsFillFlagFill /><span className="number">12</span>Report
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={EditReport}><BsPencil />Edit Post</Dropdown.Item>
                                                <Dropdown.Item onClick={handleShow}><RiDeleteBin6Line />Delete Post</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <BsThreeDots />
                                    </li>
                                </ul>
                                <ul className="actionrytbar flagbtnbar">
                                    <li >
                                        <Button className="bg-primary text-white"><BsFlag />Flag Post</Button>
                                        <Button className="bg-danger text-white"><RiDeleteBin6Line />Delete Post</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {/* Delete modal */}
            <Modal className="Actions-modal deletemodal" show={show} onHide={handleClose} centered>
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
            {/* Aggree modal */}
            <Modal className="Actions-modal" show={showAgree} onHide={AgreeClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agreed by</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
            {/* DisAgreeShow modal */}
            <Modal className="Actions-modal" show={disshowAgree} onHide={DisAgreeClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Disagreed by</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                    <ul className='aggree-li'>
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className='user-del'>
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">Follow</button>
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
            {/* Awards modal */}
            <Modal className="Actions-modal awards-modal z-1050" show={showAwards} onHide={AwardsClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Awards</Modal.Title>
                    <button onClick={ShowAddMore} className='btn-add'>Buy more<AiOutlinePlus /></button>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <img src="/images/awards.png" alt="img" />
                                <h4>Owned: 56</h4>
                            </div>
                        </Col>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <img src="/images/awards.png" alt="img" />
                                <h4>Owned: 56</h4>
                            </div>
                        </Col>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <img src="/images/awards.png" alt="img" />
                                <h4>Owned: 56</h4>
                            </div>
                        </Col>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <img src="/images/awards.png" alt="img" />
                                <h4>Owned: 56</h4>
                            </div>
                        </Col>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <img src="/images/awards.png" alt="img" />
                                <h4>Owned: 56</h4>
                            </div>
                        </Col>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <img src="/images/awards.png" alt="img" />
                                <h4>Owned: 56</h4>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            {/* BuyAwards modal */}
            <Modal className="Actions-modal buymore-modal " show={showBuyAwards} onHide={ShowBuyAwardsClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Buy awards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <p className="Begde-bar">X100</p>
                                <div className='awards-img'>
                                    <img src="/images/awards.png" alt="img" />
                                </div>
                                <h5>Package Name</h5>
                                <h3>₹599</h3>
                            </div>
                        </Col>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <p className="Begde-bar">X100</p>
                                <div className='awards-img'>
                                    <img src="/images/awards.png" alt="img" />
                                </div>
                                <h5>Package Name</h5>
                                <h3>₹599</h3>
                            </div>
                        </Col>
                        <Col className='col-md-4'>
                            <div className='Awrds-li'>
                                <p className="Begde-bar">X100</p>
                                <div className='awards-img'>
                                    <img src="/images/awards.png" alt="img" />
                                </div>
                                <h5>Package Name</h5>
                                <h3>₹599</h3>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            {/* Edit Report */}
            <Modal className="Actions-modal Editreportmodal" show={EditReportShow} onHide={EditReportClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='report-tabs'>
                        <li className='active'>spam</li>
                        <li>Harassment</li>
                        <li>Hate</li>
                        <li>Misinformation</li>
                        <li>Self-harm</li>
                        <li>Misinformation</li>
                        <li>spam</li>
                        <li>Harassment</li>
                        <li>Hate</li>
                        <li>Misinformation</li>
                        <li>Self-harm</li>
                        <li>Misinformation</li>
                        <li>spam</li>
                        <li>Harassment</li>
                        <li>Hate</li>
                        <li>Misinformation</li>
                        <li>Self-harm</li>
                        <li>Misinformation</li>
                        <li>spam</li>
                        <li>Harassment</li>
                        <li>Hate</li>
                        <li>Misinformation</li>
                        <li>Self-harm</li>
                        <li>Misinformation</li>
                        <li>spam</li>
                        <li>Harassment</li>
                        <li>Hate</li>
                        <li>Misinformation</li>
                        <li>Self-harm</li>
                        <li>Misinformation</li>
                        <li>spam</li>
                        <li>Harassment</li>
                        <li>Hate</li>
                        <li>Misinformation</li>
                        <li>Self-harm</li>
                        <li>Misinformation</li>
                    </ul>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Describe (optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Describe your issue for report........."
                                style={{ height: '92px' }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Post;
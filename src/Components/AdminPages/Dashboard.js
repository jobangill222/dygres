import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaUsers } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdThumbUpAlt, MdThumbDownAlt } from 'react-icons/md';
import { BsArrowDown, BsFilePost } from 'react-icons/bs';
import { FaGift, FaComments } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <Container>
                <div className="dashboard-title-bar">
                    <Row>
                        <Col lg="8"><h4>Dashboard</h4></Col>
                        <Col lg="4">
                            <Form.Select aria-label="Default select example">
                                <option>Monthly</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </div>
                <div className="dashboard-boxes">
                    <Row>
                        <Col lg="3" md="6" sm="12">
                            <Link to="/admin/users" className="dash-boxes-in">
                                <ul className="userstatus">
                                    <li>
                                        <div className="iconbar">
                                            <FaUsers />
                                        </div>
                                        <h5>Users</h5>
                                    </li>
                                    <li><MdKeyboardArrowRight /></li>
                                </ul>
                                <ul className="weekly-status">
                                    <li><h4>404k</h4></li>
                                    <li>
                                        <div className="valuebar up">
                                            <BsArrowDown />
                                            <p>0.8%</p>
                                        </div>
                                        <h5>This week</h5>
                                    </li>
                                </ul>
                            </Link>
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <div className="dash-boxes-in">
                                <ul className="userstatus">
                                    <li>
                                        <div className="iconbar">
                                            <BsFilePost />
                                        </div>
                                        <h5>Posts</h5>
                                    </li>
                                    {/* <li><MdKeyboardArrowRight /></li> */}
                                </ul>
                                <ul className="weekly-status">
                                    <li><h4>300k</h4></li>
                                    <li>
                                        <div className="valuebar down">
                                            <BsArrowDown />
                                            <p>0.8%</p>
                                        </div>
                                        <h5>This week</h5>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <div className="dash-boxes-in">
                                <ul className="userstatus">
                                    <li>
                                        <div className="iconbar">
                                            <MdThumbUpAlt />
                                        </div>
                                        <h5>Agree</h5>
                                    </li>
                                    {/* <li><MdKeyboardArrowRight /></li> */}
                                </ul>
                                <ul className="weekly-status">
                                    <li><h4>300k</h4></li>
                                    <li>
                                        <div className="valuebar down">
                                            <BsArrowDown />
                                            <p>0.8%</p>
                                        </div>
                                        <h5>This week</h5>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <div className="dash-boxes-in">
                                <ul className="userstatus">
                                    <li>
                                        <div className="iconbar">
                                            <MdThumbDownAlt />
                                        </div>
                                        <h5>Disagree</h5>
                                    </li>
                                    {/* <li><MdKeyboardArrowRight /></li> */}
                                </ul>
                                <ul className="weekly-status">
                                    <li><h4>40k</h4></li>
                                    <li>
                                        <div className="valuebar down">
                                            <BsArrowDown />
                                            <p>0.8%</p>
                                        </div>
                                        <h5>This week</h5>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <Link to="/admin/awardList" className="dash-boxes-in">
                                {/* <div className="dash-boxes-in"> */}
                                <ul className="userstatus">
                                    <li>
                                        <div className="iconbar">
                                            <FaGift />
                                        </div>
                                        <h5>Awards</h5>
                                    </li>
                                    <li><MdKeyboardArrowRight /></li>
                                </ul>
                                <ul className="weekly-status">
                                    <li><h4>40k</h4></li>
                                    <li>
                                        <div className="valuebar down">
                                            <BsArrowDown />
                                            <p>0.8%</p>
                                        </div>
                                        <h5>This week</h5>
                                    </li>
                                </ul>
                                {/* </div> */}
                            </Link>
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <div className="dash-boxes-in">
                                <ul className="userstatus">
                                    <li>
                                        <div className="iconbar">
                                            <FaComments />
                                        </div>
                                        <h5>Threads</h5>
                                    </li>
                                    {/* <li><MdKeyboardArrowRight /></li> */}
                                </ul>
                                <ul className="weekly-status">
                                    <li><h4>40k</h4></li>
                                    <li>
                                        <div className="valuebar down">
                                            <BsArrowDown />
                                            <p>0.8%</p>
                                        </div>
                                        <h5>This week</h5>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="Linechart">
                    <img src="/images/Activeusers.png" alt="img" />
                </div>
                <div className="Countrychart">
                    <img src="/images/country.png" alt="img" />
                </div>
            </Container>
        </>
    );
}

export default Dashboard;
import React, { useEffect, useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaUsers } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdThumbUpAlt, MdThumbDownAlt } from 'react-icons/md';
import { BsArrowDown, BsFilePost } from 'react-icons/bs';
import { FaGift, FaComments } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import Loader from "../Loader";


const Dashboard = () => {

    const { isLoading, setIsLoading, dashboardDataAdminDContext } = useContext(DContext);

    const selectedDashboardTypeSession = localStorage.getItem('selectedDashboardTypeSession');

    const [selectedTypeState, setSelectedTypeState] = useState(selectedDashboardTypeSession ? selectedDashboardTypeSession : 'day');
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        getData();
    }, [selectedTypeState])

    const getData = async () => {
        setIsLoading(true);
        const axiosRes = await dashboardDataAdminDContext(selectedTypeState);
        console.log('axiosResaxiosRes', axiosRes);
        setDashboardData(axiosRes.data);
        setIsLoading(false);
    }

    return (
        <>
            {isLoading && <Loader />}

            <Container>
                <div className="dashboard-title-bar">
                    <Row>
                        <Col lg="8"><h4>Dashboard</h4></Col>
                        <Col lg="4">
                            <Form.Select aria-label="Default select example" onChange={(e) => {
                                setSelectedTypeState(e.target.value)
                                localStorage.setItem('selectedDashboardTypeSession', e.target.value)
                            }
                            }
                            >
                                <option value="day" selected={selectedTypeState === 'day' ? 'true' : null} >Daily</option>
                                <option value="week" selected={selectedTypeState === 'week' ? 'true' : null}>Weekly</option>
                                <option value="month" selected={selectedTypeState === 'month' ? 'true' : null}>Monthly</option>
                                <option value="year" selected={selectedTypeState === 'year' ? 'true' : null}>Yearly</option>
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
                                    <li className='listatus'><h4>{dashboardData && dashboardData.pastUsers}</h4><h6>Past</h6></li>
                                    <li className='listatus'><h4>{dashboardData && dashboardData.currentUsers}</h4><h6>Current</h6></li>

                                    <li>
                                        <div className={dashboardData && dashboardData.usersPercentageStatus === 'down' ? "valuebar down" : "valuebar up"}>
                                            <BsArrowDown />
                                            <p>{dashboardData && dashboardData.usersPercentage} %</p>
                                        </div>
                                        <h5>This {selectedTypeState}</h5>
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
                                    <li className='listatus'><h4>{dashboardData && dashboardData.pastPosts}</h4><h6>Past</h6></li>
                                    <li className='listatus'><h4>{dashboardData && dashboardData.currentPosts}</h4><h6>Current</h6></li>
                                    {/* <li>
                                        <h6 className='numberbar'>9</h6>
                                        <h5>Past {selectedTypeState}</h5>
                                    </li> */}
                                    <li>
                                        <div className={dashboardData && dashboardData.postsPercentageStatus === 'down' ? "valuebar down" : "valuebar up"}>
                                            <BsArrowDown />
                                            <p>{dashboardData && dashboardData.postsPercentage} %</p>
                                        </div>
                                        <h5>This {selectedTypeState}</h5>
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
                                    <li className='listatus'><h4>{dashboardData && dashboardData.pastAgreePosts}</h4><h6>Past</h6></li>
                                    <li className='listatus'><h4>{dashboardData && dashboardData.currentAgreePosts}</h4><h6>Current</h6></li>
                                    <li>
                                        <div className={dashboardData && dashboardData.agreePostsPercentageStatus === 'down' ? "valuebar down" : "valuebar up"}>
                                            <BsArrowDown />
                                            <p>{dashboardData && dashboardData.agreePostsPercentage} %</p>
                                        </div>
                                        <h5>This {selectedTypeState}</h5>
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
                                    <li className='listatus'><h4>{dashboardData && dashboardData.pastDisagreePosts}</h4><h6>Past</h6></li>
                                    <li className='listatus'><h4>{dashboardData && dashboardData.currentDisagreePosts}</h4><h6>Current</h6></li>
                                    <li>
                                        <div className={dashboardData && dashboardData.disagreePostsPercentageStatus === 'down' ? "valuebar down" : "valuebar up"}>
                                            <BsArrowDown />
                                            <p>{dashboardData && dashboardData.disagreePostsPercentage} %</p>
                                        </div>
                                        <h5>This {selectedTypeState}</h5>
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
                                    <li className='listatus'><h4>{dashboardData && dashboardData.pastPostAwards}</h4><h6>Past</h6></li>
                                    <li className='listatus'><h4>{dashboardData && dashboardData.currentPostAwards}</h4><h6>Current</h6></li>
                                    <li>
                                        <div className={dashboardData && dashboardData.postAwardsPercentageStatus === 'down' ? "valuebar down" : "valuebar up"}>
                                            <BsArrowDown />
                                            <p>{dashboardData && dashboardData.postAwardsPercentage} %</p>
                                        </div>
                                        <h5>This {selectedTypeState}</h5>
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
                                    <li className='listatus'><h4>{dashboardData && dashboardData.pastComments}</h4><h6>Past</h6></li>
                                    <li className='listatus'><h4>{dashboardData && dashboardData.currentComments}</h4><h6>Current</h6></li>
                                    <li>
                                        <div className={dashboardData && dashboardData.commentsPercentageStatus === 'down' ? "valuebar down" : "valuebar up"}>
                                            <BsArrowDown />
                                            <p>{dashboardData && dashboardData.commentsPercentage} %</p>
                                        </div>
                                        <h5>This {selectedTypeState}</h5>
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
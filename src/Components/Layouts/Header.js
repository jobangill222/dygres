import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DarkModeSwitch from "./DarkModeSwitch";
import { BsBell, BsPencil } from 'react-icons/bs';
import { AiOutlineSetting, AiOutlineEye } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { Link } from "react-router-dom";


const Header = () => {


    return (
        <>
            <Navbar className="header-nav" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img className="lightmode" src="/images/logo.png" alt="logo" />
                        <img className="darkmode" src="/images/logowhite.png" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto me-0">

                            <div className="text-lightgray" href="#"><DarkModeSwitch /></div>

                            <div className="relative user-dropdown">
                                <Nav.Link className="text-lightgray" href="#"><BsBell /></Nav.Link>
                                <div className="Dropdown-listing notification-dropdown bg-white">
                                    <div className="arrowbar">
                                        <div className="arrowshape"></div>
                                        <div className="notification-head">
                                            <h4>Notifications</h4>
                                            <h6>Mark all as read</h6>
                                        </div>
                                        <div className="notification-body">
                                            <div className="notification-list">
                                                <ul>
                                                    <li><img src="/images/user.png" alt="img" /></li>
                                                    <li>
                                                        <div className="userdetail">
                                                            <h6>Methew Reed</h6>
                                                            <p>@methew11</p>
                                                        </div>
                                                        <p className="times">46 mins ago</p>
                                                    </li>
                                                </ul>
                                                <p className="notification">Methew Reed started Following you</p>
                                            </div>
                                            <div className="notification-list">
                                                <ul>
                                                    <li><img src="/images/user.png" alt="img" /></li>
                                                    <li>
                                                        <div className="userdetail">
                                                            <h6>Methew Reed</h6>
                                                            <p>@methew11</p>
                                                        </div>
                                                        <p className="times">46 mins ago</p>
                                                    </li>
                                                </ul>
                                                <p className="notification">Methew Reed started Following you</p>
                                            </div>
                                            <div className="notification-list">
                                                <ul>
                                                    <li><img src="/images/user.png" alt="img" /></li>
                                                    <li>
                                                        <div className="userdetail">
                                                            <h6>Methew Reed</h6>
                                                            <p>@methew11</p>
                                                        </div>
                                                        <p className="times">46 mins ago</p>
                                                    </li>
                                                </ul>
                                                <p className="notification">Methew Reed started Following you</p>
                                            </div>
                                            <div className="notification-list">
                                                <ul>
                                                    <li><img src="/images/user.png" alt="img" /></li>
                                                    <li>
                                                        <div className="userdetail">
                                                            <h6>Methew Reed</h6>
                                                            <p>@methew11</p>
                                                        </div>
                                                        <p className="times">46 mins ago</p>
                                                    </li>
                                                </ul>
                                                <p className="notification">Methew Reed started Following you</p>
                                            </div>
                                        </div>
                                        <div className="notification-foot">
                                            <Link to="/notification">See All</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Nav.Link className="text-lightgray" href="#">
                                <AiOutlineSetting />
                            </Nav.Link>

                            <div className="relative user-dropdown">
                                <img src="/images/user.png" alt="user-img" />
                                <div className="Dropdown-listing bg-white">
                                    <div className="arrowshape"></div>
                                    <h4 className="text-silver">Account</h4>
                                    <ul>
                                        <li className="text-secondry">
                                            <Link className="active" to="/profile"><AiOutlineEye />View Profile</Link>
                                        </li>
                                        <li className="text-secondry">
                                            <Link className="active" to="/editprofile"><BsPencil />Edit Profile</Link></li>
                                        <li className="text-secondry"><MdLogout />Log Out</li>
                                        <li className="text-secondry">
                                            <Link to="/login"><MdLogout />Log In</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
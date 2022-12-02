import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DarkModeSwitch from "./DarkModeSwitch";
import { AiOutlineSetting, AiOutlineEye } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { Link } from "react-router-dom";
import { BsPencil, BsFileMedicalFill, BsBell , BsSearch } from 'react-icons/bs';
import { BiLayerMinus } from 'react-icons/bi';
import { MdHowToVote, MdOutlineWhatshot } from 'react-icons/md';
import { useLocation } from "react-router-dom";

const Header = () => {
//assigning location variable
const location = useLocation();

//destructuring pathname from location
const { pathname } = location;

//Javascript split method to get the name of the path in array
const splitLocation = pathname.split("/");

    return (
        <>
            <Navbar className="header-nav" expand="md">
                <Container>
                    <div className="mainheader">
                        <Navbar.Brand >
                            <Link to="/">
                                <img className="lightmode" src="/images/logo.png" alt="logo" />
                            </Link>
                            <Link to="/">
                                <img className="darkmode" src="/images/logowhite.png" alt="logo" />
                            </Link>
                        </Navbar.Brand>
                        <Nav className="mx-auto me-0 mob-none">
                            <div className="text-lightgray" href="#"><DarkModeSwitch /></div>
                            <div className="relative user-dropdown notify-add">
                                <Nav.Link className="text-lightgray btndot" href="#"><BsBell /></Nav.Link>
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
                                            <Link to="/profile"><AiOutlineEye />View Profile</Link>
                                        </li>
                                        <li className="text-secondry">
                                            <Link to="/editprofile"><BsPencil />Edit Profile</Link></li>
                                        <li className="text-secondry"><MdLogout />Log Out</li>
                                        <li className="text-secondry">
                                            <Link to="/login"><MdLogout />Log In</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Nav>
                        <div className="mobilemenu">
                        <ul className="web-none">
                            <li><Link to="/notfound"><BsSearch /></Link></li>
                            <li><Link to="/notification"><BsBell /></Link></li>
                        </ul>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        
                        </div>
                        
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                            <ul className="sidebar-menu">
                                <li  className={splitLocation[1] === "new" ? "active" : ""}><Link exact to="/new"><BsFileMedicalFill /> New</Link></li>
                                <li  className={splitLocation[1] === "most-voted" ? "active" : ""}><Link to="/most-voted"><MdHowToVote />Most Voted</Link></li>
                                <li  className={splitLocation[1] === "hot" ? "active" : ""}><Link to="/hot"><MdOutlineWhatshot />hot</Link></li>
                                <li  className={splitLocation[1] === "notfound" ? "active" : ""}><Link to="/notfound"><BiLayerMinus />not voted</Link></li>
                            </ul>
                        </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    );
}

export default Header;
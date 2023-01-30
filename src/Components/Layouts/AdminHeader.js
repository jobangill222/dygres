import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkModeSwitch from "./DarkModeSwitch";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsBell, BsSearch } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DContext } from "../../Context/DContext";

const Header = () => {

    const navigate = useNavigate();

    const { setUser, setUserToken } = useContext(DContext);

    //Logout Functionality
    const logoutHandler = async (e) => {
        console.log("logout handler call");
        setUser(null);
        setUserToken(null);
        // localStorage.clear();
        localStorage.removeItem("accessToken");
        navigate("/login");
    };
    //End logout functionality

    return (
        <>
            <Navbar className="header-nav" expand="lg">
                <Container>
                    <div className="mainheader">
                        <Navbar.Brand>
                            <Link to="/admin/dashboard">
                                <img className="lightmode" src="/images/logo.png" alt="logo" />
                            </Link>
                            <Link to="/admin/dashboard">
                                <img
                                    className="darkmode"
                                    src="/images/logowhite.png"
                                    alt="logo"
                                />
                            </Link>
                        </Navbar.Brand>
                        <Nav className="mx-auto me-0 mob-none">
                            <Link to='/admin/dashboard' className="homeicon">
                                <BiHome />
                            </Link>
                            <div className="text-lightgray" href="#">
                                <DarkModeSwitch />
                            </div>


                            <div className="relative user-dropdown">
                                <img src="/images/user.png" alt="user-img" />
                                <div className="Dropdown-listing bg-white">
                                    <div className="arrowshape"></div>
                                    <h4 className="text-silver">Account</h4>
                                    <ul>
                                        <li className="text-secondry" onClick={logoutHandler}>
                                            <MdLogout />
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </Nav>
                        <div className="mobilemenu">
                            <ul className="web-none">
                                <li>
                                    <Link to="/notfound">
                                        <BsSearch />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notification">
                                        <BsBell />
                                    </Link>
                                </li>
                            </ul>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        </div>
                    </div>

                </Container>
            </Navbar>
        </>
    );
};

export default Header;

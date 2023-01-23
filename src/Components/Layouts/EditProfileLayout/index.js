import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Link, Outlet } from "react-router-dom";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import FooterMob from "../FooterMob";


const ProfileLayout = () => {
    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    return (
        <>
            <Header />
            <div className='body-wrapper p-0'>
                <Container>
                    <ul className="profiletabsbar">
                        <li className={splitLocation[1] === "editprofile" ? "active" : ""}><Link exact to="/editprofile">Account Settings</Link></li>
                        <li className={splitLocation[1] === "personalinformation" ? "active" : ""}><Link exact to="/personalinformation">About Me</Link></li>
                    </ul>
                    <Outlet />
                </Container>

            </div>
            <FooterMob />

        </>
    );
}

export default ProfileLayout;
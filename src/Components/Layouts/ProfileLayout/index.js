import React from "react";

import {
    Outlet
} from "react-router-dom";
import FooterMob from "../FooterMob";

import Header from "../Header";


const ProfileLayout = () => {


    return (
        <>
            <Header />
            <div className='body-wrapper p-0'> 
                <Outlet />
            </div>
            <FooterMob/>

        </>
    );
}

export default ProfileLayout;
import React from "react";

import {
    Outlet
} from "react-router-dom";

import Header from "../Header";


const ProfileLayout = () => {


    return (
        <>
            <Header />
            <div className='body-wrapper p-0'> 
                <Outlet />
            </div>

        </>
    );
}

export default ProfileLayout;
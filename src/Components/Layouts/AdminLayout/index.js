import React from "react";

import {
    Outlet
} from "react-router-dom";
import FooterMob from "../FooterMob";

import Header from "../Header";


const AdminLayout = () => {


    return (
        <>
            <Header />
            <div className='body-wrapper Adminlayout'>
                <Outlet />
            </div>
            <FooterMob/>
        </>
    );
}

export default AdminLayout;
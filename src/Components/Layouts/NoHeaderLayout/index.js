import React from "react";

import {
    Outlet
} from "react-router-dom";
import FooterMob from "../FooterMob";

import Header from "../Header";


const AdminLayout = () => {


    return (
        <>
            
            <div className='body-wrapper Noheader'>
                <Header />
                <Outlet />
                <FooterMob/>
            </div>
        </>
    );
}

export default AdminLayout;
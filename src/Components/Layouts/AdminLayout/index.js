import React from "react";

import {
    Outlet
} from "react-router-dom";
import FooterMob from "../FooterMob";

import AdminHeader from "../AdminHeader";


const AdminLayout = () => {


    return (
        <>
            <AdminHeader />
            <div className='body-wrapper Adminlayout'>
                <Outlet />
            </div>
            <FooterMob />
        </>
    );
}

export default AdminLayout;
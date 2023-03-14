import React from "react";

import {
    Outlet
} from "react-router-dom";
import AdminFooterMob from "../AdminFooterMob";

import AdminHeader from "../AdminHeader";


const AdminLayout = () => {


    return (
        <>
            <AdminHeader />
            <div className='body-wrapper Adminlayout'>
                <Outlet />
            </div>
            <AdminFooterMob />
        </>
    );
}

export default AdminLayout;
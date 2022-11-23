import React from "react";

import {
    Outlet
} from "react-router-dom";

import Header from "../Header";


const AdminLayout = () => {


    return (
        <>
            <Header />
            <div className='body-wrapper Adminlayout'>
                <Outlet />
            </div>
        </>
    );
}

export default AdminLayout;
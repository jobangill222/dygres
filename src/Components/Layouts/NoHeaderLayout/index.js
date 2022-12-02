import React from "react";

import {
    Outlet
} from "react-router-dom";

import Header from "../Header";


const AdminLayout = () => {


    return (
        <>
            
            <div className='body-wrapper Noheader'>
                <Header />
                <Outlet />
            </div>
        </>
    );
}

export default AdminLayout;
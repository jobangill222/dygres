import React from "react";
import Container from 'react-bootstrap/Container';
import {
     Outlet
} from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FooterMob from "../FooterMob";


const SiteLayout = () => {


    return (
        <>

            <Header />
            <div className='body-wrapper'>
                <Container className='somewhere-full'>
                    <Row className='somewhere-pad-0'>
                        <Col className="sidebar-menu" lg="3">
                            <Sidebar />
                        </Col>
                        <Col className='mainwrapper' lg="9">
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </div>
            <FooterMob/>

        </>
    );
}

export default SiteLayout;
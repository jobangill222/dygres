import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import {
    Outlet
} from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FooterMob from "../FooterMob";
import { DContext } from "../../../Context/DContext";

const SiteLayout = () => {

    const { fontSizeState, showSuggestions, setShowSuggestions } = useContext(DContext);

    const hideSuggestion = () => {
        if (showSuggestions) {
            setShowSuggestions(false)
        }
    }

    return (
        <>
            <div onClick={hideSuggestion}>
                <Header />
                <div className={fontSizeState ? `${fontSizeState} body-wrapper` : `body-wrapper`}>
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
                <FooterMob />
            </div>

        </>
    );
}

export default SiteLayout;
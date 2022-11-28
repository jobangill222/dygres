import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DigitalTabContent from "./DigitalTabContent";



const TopLatestPost = () => {


    return (
        <>
            <Tabs defaultActiveKey="top" id="uncontrolled-tab-example" className="digital-tabs" >
                <Tab eventKey="top" title="Top">
                    <DigitalTabContent/>
                </Tab>
                <Tab eventKey="Latest" title="Latest">
                    <DigitalTabContent/>
                </Tab>
            </Tabs>
        </>
    );
}

export default TopLatestPost;
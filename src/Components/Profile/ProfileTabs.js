import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProfileAbout from "./ProfileAbout";
import ProfileTabTimeline from "./ProfileTabTimeline";



const ProfileTabs = () => {


    return (
        <>
            <Tabs defaultActiveKey="Timeline" id="" className="digital-tabs" >
                <Tab eventKey="Timeline" title="Timeline">
                    <ProfileTabTimeline/>
                </Tab>
                <Tab eventKey="About you" title="About you">
                    <ProfileAbout/>
                </Tab>
            </Tabs>
        </>
    );
}

export default ProfileTabs;
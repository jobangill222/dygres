import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import GeneralInformation from "./GeneralInformation";
import PersonalInformation from "./PersonalInformation";

const EditProfile = () => {
    return (
        <>
            <Container>
                <Tabs defaultActiveKey="general" id="" className="digital-tabs" >
                    <Tab eventKey="general" title="General Information">
                        <GeneralInformation />
                    </Tab>
                    <Tab eventKey="personal" title="Personal Information">
                        <PersonalInformation />
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}

export default EditProfile;
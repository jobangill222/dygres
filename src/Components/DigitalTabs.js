import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DigitalTabContent from "./DigitalTabContent";

const DigitalTabs = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="Following"
        id="uncontrolled-tab-example"
        className="digital-tabs"
      >
        <Tab eventKey="Following" title="Following">
          <DigitalTabContent />
        </Tab>
        <Tab eventKey="Global" title="Global">
          <DigitalTabContent />
        </Tab>
        <Tab eventKey="Official" title="Official">
          <DigitalTabContent />
        </Tab>
      </Tabs>
    </>
  );
};

export default DigitalTabs;

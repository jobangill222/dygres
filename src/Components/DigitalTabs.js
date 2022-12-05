import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DigitalTabContent from "./DigitalTabContent";

const DigitalTabs = (props) => {
  const { setActiveTabState, postList } = props;

  return (
    <>
      <Tabs
        defaultActiveKey="Global"
        id="uncontrolled-tab-example"
        className="digital-tabs"
        onSelect={(e) => setActiveTabState(e)}
      >
        <Tab eventKey="Following" title="Following">
          {postList.map((post) => (
            <DigitalTabContent
              setActiveTabState={setActiveTabState}
              post={post}
            />
          ))}
        </Tab>
        <Tab eventKey="Global" title="Global">
          {postList.map((post) => (
            <DigitalTabContent
              setActiveTabState={setActiveTabState}
              post={post}
            />
          ))}
        </Tab>
        <Tab eventKey="Official" title="Official">
          {postList.map((post) => (
            <DigitalTabContent
              setActiveTabState={setActiveTabState}
              post={post}
            />
          ))}
        </Tab>
      </Tabs>
    </>
  );
};

export default DigitalTabs;

import React, { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DigitalTabContent from "./DigitalTabContent";
import { DContext } from "../Context/DContext";


const DigitalTabs = (props) => {

  const { postList } = useContext(DContext);

  const { setActiveTabState } = props;

  return (
    <>
      <Tabs
        defaultActiveKey="Global"
        id="uncontrolled-tab-example"
        className="digital-tabs"
        onSelect={(e) => setActiveTabState(e)}
      >
        <Tab eventKey="Following" title="Following">
          {/* {console.log("post list in folowing tab", postList)} */}
          {postList.map((post) => (
            <DigitalTabContent
              key={post._id}
              setActiveTabState={setActiveTabState}
              post={post}
            />
          ))}
        </Tab>
        <Tab eventKey="Global" title="Global">
          {postList.map((post) => (
            <DigitalTabContent
              key={post._id}
              setActiveTabState={setActiveTabState}
              post={post}
            />
          ))}
        </Tab>
        <Tab eventKey="Official" title="Official">
          {postList.map((post) => (
            <DigitalTabContent
              key={post._id}
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

import React, { useContext, useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DigitalTabContent from "./DigitalTabContent";
import { DContext } from "../Context/DContext";

// Import Modals
import UserListModal from "./Modals/UserListModal";

const DigitalTabs = (props) => {

  //Active Tabs
  const { setActiveTabState } = props;

  //Global states
  const { postList, selectedPostIDForPopup } = useContext(DContext);

  // Change state when click on count of agree disagree etc and change popupstate to true to open
  const [popupOpenStatus, setPopupOpenStatus] = useState(false);
  useEffect(() => {
    if (selectedPostIDForPopup) {
      setPopupOpenStatus(true);
    }
  }, [selectedPostIDForPopup])


  return (
    <>

      {/* Modal */}
      {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}

      <Tabs
        defaultActiveKey="Global"
        id="uncontrolled-tab-example"
        className="digital-tabs"
        onSelect={(e) => setActiveTabState(e)}
      >

        <Tab eventKey="Global" title="Global">
          {postList.map((post) => (
            <DigitalTabContent
              key={post._id}
              setActiveTabState={setActiveTabState}
              post={post}
            />
          ))}
        </Tab>


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

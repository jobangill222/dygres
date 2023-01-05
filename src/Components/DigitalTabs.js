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
  const { postList, selectedIDForPopup } = useContext(DContext);

  // Change state when click on count of agree disagree etc and change popupstate to true to open
  const [popupOpenStatus, setPopupOpenStatus] = useState(false);
  useEffect(() => {
    if (selectedIDForPopup) {
      setPopupOpenStatus(true);
    }
  }, [selectedIDForPopup])


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
          {postList.length ?
            postList.map((post) => (
              <DigitalTabContent
                key={post._id}
                setActiveTabState={setActiveTabState}
                post={post}
              />
            ))
            : <div className="empty-bar">
              <img src="/images/empty.png" alt='dummy' />
              <h4>No Post</h4>
            </div>
          }
        </Tab>


        <Tab eventKey="Following" title="Following">
          {/* {console.log("post list in folowing tab", postList)} */}
          {postList.length ?
            postList.map((post) => (
              <DigitalTabContent
                key={post._id}
                setActiveTabState={setActiveTabState}
                post={post}
              />
            ))
            : <div className="empty-bar">
              <img src="/images/empty.png" alt='dummy' />
              <h4>No Post</h4>
            </div>
          }
        </Tab>

        <Tab eventKey="Official" title="Official">
          {postList.length ?
            postList.map((post) => (
              <DigitalTabContent
                key={post._id}
                setActiveTabState={setActiveTabState}
                post={post}
              />
            ))
            : <div className="empty-bar">
              <img src="/images/empty.png" alt='dummy' />
              <h4>No Post</h4>
            </div>
          }
        </Tab>
      </Tabs>
    </>
  );
};

export default DigitalTabs;

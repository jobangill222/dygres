import React, { useContext, useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DigitalTabContent from "./DigitalTabContent";
import { DContext } from "../Context/DContext";

// Import Modals
import UserListModal from "./Modals/UserListModal";
import ViewPostsAwardModal from "./Modals/ViewPostsAwardModal";
import RetweetModal from "./Modals/RetweetModal";



const DigitalTabs = (props) => {

  //Active Tabs
  const { setActiveTabState } = props;

  //Global states
  const { postList, selectedIDForPopup, postIDForAwardOfPost, postIDForRetweet } = useContext(DContext);

  // Change state when click on count of agree disagree etc and change popupstate to true to open
  const [popupOpenStatus, setPopupOpenStatus] = useState(false);
  useEffect(() => {
    if (selectedIDForPopup) {
      setPopupOpenStatus(true);
    }
  }, [selectedIDForPopup])


  const [viewMoreAwardOfPost, setViewMoreAwardOfPost] = useState(false);
  useEffect(() => {
    if (postIDForAwardOfPost) {
      setViewMoreAwardOfPost(true);
    }
  }, [postIDForAwardOfPost])


  const [viewRetweetPopup, setViewRetweetPopup] = useState(false);
  useEffect(() => {
    if (postIDForRetweet) {
      setViewRetweetPopup(true);
    }
  }, [postIDForRetweet])


  return (
    <>

      {/* Modal */}
      {popupOpenStatus && <UserListModal popupOpenStatus={popupOpenStatus} setPopupOpenStatus={setPopupOpenStatus} />}

      {viewMoreAwardOfPost && <ViewPostsAwardModal viewMoreAwardOfPost={viewMoreAwardOfPost} setViewMoreAwardOfPost={setViewMoreAwardOfPost} />}

      {viewRetweetPopup && <RetweetModal viewRetweetPopup={viewRetweetPopup} setViewRetweetPopup={setViewRetweetPopup} />}

      <Tabs
        defaultActiveKey="Global"
        id="uncontrolled-tab-example"
        className="digital-tabs"
        onSelect={(e) => setActiveTabState(e)}
      >

        <Tab eventKey="Global" title="Global">
          {/* {console.log("post list in global tab render", postList)} */}
          {postList.length ?
            postList.map((post, index) => (
              <DigitalTabContent
                key={index * Math.random(100000)}
                setActiveTabState={setActiveTabState}
                post={post}
              />
            ))
            : <div className="empty-bar">
              <img src="/images/empty.png" alt='dummy' />
              <h4>No Posts</h4>
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
            :
            <div className="empty-bar">
              <img src="/images/empty.png" alt='dummy' />
              <h4>You’re not following anyone at the moment. :(</h4>
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
              <h4>No Posts</h4>
            </div>
          }
        </Tab>
      </Tabs>
    </>
  );
};

export default DigitalTabs;

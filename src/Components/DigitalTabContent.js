import React from "react";
// import { MdOutlineTimer } from "react-icons/md";
import Accordion from "react-bootstrap/Accordion";
import Threads from "./Threads";
import PostHead from "./PostList/PostHead";
import PostContent from "./PostList/PostContent";
import PostFoot from "./PostList/PostFoot";
// import PostEdit from "./PostList/PostEdit";

const DigitalTabContent = (props) => {
  // Prop Destrucutring
  // console.log("props.post", props.post);
  const { content, user } = props.post;
  return (
    <>
      <div className="digital-feeds p-0">
        <Accordion>
          <Accordion.Item eventKey="0">
            <div className="digital-feeds ">
              <PostHead user={user} />
              <div className="user-preview">
                <PostContent content={content} />
                <PostFoot />
              </div>
            </div>
            <Accordion.Body eventKey="0" className="thredsbar">
              <Threads />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      {/* <div className="digital-feeds ">
        <PostEdit />
      </div> */}
    </>
  );
};

export default DigitalTabContent;

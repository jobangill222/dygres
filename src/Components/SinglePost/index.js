import React from "react";
// import { MdOutlineTimer } from "react-icons/md";
import Accordion from "react-bootstrap/Accordion";

import Threads from "../Threads";
import SinglePostHead from "./SinglePostHead";
import SinglePostContent from "./SinglePostContent";
import SinglePostEdit from "./SinglePostEdit";
import SinglePostFoot from "./SinglePostFoot";



const SinglePost = () => {

    return (
        <>
            <div className="digital-feeds p-0">
                <Accordion>
                    <Accordion.Item >
                        <div className="digital-feeds ">
                            <SinglePostHead />
                            <div className="user-preview">
                                <SinglePostContent />
                                <SinglePostFoot />
                                {/* <SinglePostEdit /> */}
                            </div>
                        </div>
                        <Accordion.Body className="thredsbar">
                            <Threads />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
};

export default SinglePost;
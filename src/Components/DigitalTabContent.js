import React from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import Accordion from 'react-bootstrap/Accordion';
import Threads from './Threads';
import PostHead from './PostList/PostHead';
import PostContent from './PostList/PostContent';
import PostFoot from './PostList/PostFoot';
import PostEdit from './PostList/PostEdit';

const DigitalTabContent = () => {

    return (
        <>
        <div className="digital-feeds p-0">
             <Accordion >
                <Accordion.Item eventKey="0">
                    <div className="digital-feeds ">
                        <PostHead />
                        <div className="user-preview">
                            <PostContent/>
                            <PostFoot/>
                        </div>
                    </div>
                    <Accordion.Body eventKey="0" className='thredsbar'>
                        <Threads />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
            <div className="digital-feeds ">
                <div className="user-detail-bar">
                    <div className="detailleft">
                        <div className="avatar-img active">
                            <img src="/images/user.png" alt="user-img" />
                        </div>
                        <div className="user-detail">
                            <h4 className="text-secondry">Amanpreet Singh</h4>
                            <div className="user-availbility">
                                <h6 className="text-lightgray">@amans</h6>
                                <h5 className="text-lightgray greentime">1hr ago</h5>
                            </div>
                            <div className="levelbar text-darkwhite level2">Level2 <h6 className="level2-circle"><span className="text-white lvlstar">2</span></h6></div>
                        </div>
                        <ul className="awards-bar bg-darkgray">
                            <li className="text-whitesure"><img src="/images/award1.png" alt="awards" />5</li>
                            <li className="text-whitesure"><img src="/images/award2.png" alt="awards" />4</li>
                            <li className="text-whitesure"><img src="/images/award3.png" alt="awards" />6</li>
                            <li className="text-whitesure"><img src="/images/award4.png" alt="awards" />9</li>
                        </ul>
                    </div>
                    <div className="user-active-timer">
                        <ul>
                            <li className="text-green"><MdOutlineTimer />22hrs 20mins</li>
                        </ul>
                    </div>
                </div>
                <PostEdit/>
            </div>
           
        </>

    );
}

export default DigitalTabContent;
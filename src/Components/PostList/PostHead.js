import React from "react";
import { MdOutlineTimer } from 'react-icons/md';

const PostHead = () => {
    return (
        <>
            <div className="user-detail-bar">
                    <div className="detailleft">
                        <div className="userleftside">
                            <div className="avatar-img active">
                                <img src="/images/user.png" alt="user-img" />
                            </div>
                            <div className="user-detail">
                                <h4 className="text-secondry">Amanpreet Singh</h4>
                                <div className="user-availbility">
                                    <h6 className="text-lightgray">@amans</h6>
                                    <h5 className="text-lightgray greentime">1hr ago</h5>
                                </div>
                                <div className="levelbar text-darkwhite level1">Level1 <h6 className="level1-circle"><span className="text-white lvlstar">2</span></h6></div>
                            </div>
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
        </>
    );
}

export default PostHead;
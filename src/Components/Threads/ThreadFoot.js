import React from 'react'
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import Accordion from 'react-bootstrap/Accordion';

// import { BsFillFlagFill, BsPencil } from 'react-icons/bs';
import { ImForward } from 'react-icons/im';
import { RiMessageFill } from 'react-icons/ri';

export default function ThreadFoot() {
    return (
        <>

            <div className="action-bar">
                <ul className="actionleftbar">
                    <li className='active' ><AiFillLike /><span className="number">12</span>Agree</li>
                    {/* <li><FaGift /><span className="number">6</span>Award</li> */}
                    <li><AiFillDislike /><span className="number">12</span>Disagree</li>
                    <li>
                        <Accordion.Header><FaComments /><span className="number">12</span>Threads</Accordion.Header>
                    </li>
                    <li>
                        <RiMessageFill />Reply
                    </li>
                    {/* <li>
                                        <Dropdown className="hoverdropdown">
                                            <Dropdown.Toggle className="p-0 bg-transparent border-0 text-lightgray" variant="success" id="dropdown-basic">
                                                <BsFillFlagFill /><span className="number">12</span>Report
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href=""><BsPencil />Edit Post</Dropdown.Item>
                                                <Dropdown.Item ><RiDeleteBin6Line />Delete Post</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li> */}
                </ul>
                <ul className="actionrytbar">
                    <li><ImForward />Share</li>
                </ul>
            </div>

        </>
    )
}

import React from "react";
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import { BsFillImageFill, BsPencil } from 'react-icons/bs';
import ProfileTabs from "./ProfileTabs";
import { Link } from "react-router-dom";

const Profile = () => {


    const tooltip = (
        <Tooltip id="tooltip">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter.
        </Tooltip>
      );


    return (
        <>
            <div className="profile-feature-image">
                <img src="/images/feature.png" alt="feature-img" />
            </div>
            <div className="profile-user-detail">
                <Container>
                    <div className="user-detail-bar">
                        <div className="detailleft">
                            <OverlayTrigger placement="top" overlay={tooltip}>
                                <div className="avatar-img">
                                    <img src="/images/u100.png" alt="user-img" />
                                </div>
                            </OverlayTrigger>

                            <div className="user-detail">
                                <h4 className="text-secondry">Amanpreet Singh</h4>
                                <div className="user-availbility">
                                    <h6 className="text-lightgray">@amans</h6>
                                </div>
                                <div className="levelbar text-darkwhite level1">Level1 <h6 className="level1-circle"><span className="text-white lvlstar">2</span></h6></div>
                                <ul class="user-detail-listing">
                                    <li>
                                        <p class="text-secondry">6</p>
                                        <h6 class="text-offwhite">Posts</h6>
                                    </li>
                                    <li>
                                        <p class="text-secondry">10</p>
                                        <h6 class="text-offwhite">Following</h6>
                                    </li>
                                    <li>
                                        <p class="text-secondry">145</p>
                                        <h6 class="text-offwhite">Followers</h6>
                                    </li>
                                    <li>
                                        <p class="text-secondry">578</p>
                                        <h6 class="text-offwhite">Awards</h6>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className="user-edit-cover">
                            <ul>
                                <li>
                                    <Link to="/"><BsFillImageFill />Edit Cover</Link>
                                </li>
                                <li>
                                    <Link to="/editprofile"><BsPencil />Edit profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </Container>
            </div>
            <Container>
                <ProfileTabs />
            </Container>
        </>
    );
}

export default Profile;
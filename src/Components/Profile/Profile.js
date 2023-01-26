import React, { useContext, useEffect, useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import { BsFillImageFill, BsPencil } from 'react-icons/bs';
import ProfileTabs from "./ProfileTabs";
import { Link } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import ViewAllAwardsIGot from '../Modals/ViewAllAwardsIGot';
import { toast } from "react-toastify";

const Profile = () => {

    const { user, userStats, setSelectedIDForPopup, setPopupType, updateCoverImageDContext } = useContext(DContext);

    const tooltip = (
        <Tooltip id="tooltip">
            {user?.thoughts ? user.thoughts : "crickets"}
        </Tooltip>
    );

    const verificationtooltip = (
        <Tooltip id="verificationtooltip">
            {user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? 'Verified Email' : user?.isPhotoVerify === 1 ? "Verified Human" : "No Verification"}
        </Tooltip>
    );

    // console.log('user', user)


    const [verificationLevelState, setVerificationLevelState] = useState(0);
    //Verification Level
    useEffect(() => {
        setVerificationLevelState(user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? '1' : user?.isPhotoVerify === 1 ? "2" : "0");
    }, [user])


    const myFollowers = async () => {
        setPopupType('followers-list');
        setSelectedIDForPopup(user._id)
    }

    const myFollowing = async () => {
        setPopupType('following-list');
        setSelectedIDForPopup(user._id)
    }


    const [awardIGotPopupState, setAwardIGotPopupState] = useState(false);
    const viewAwardIGot = async () => {
        setAwardIGotPopupState(true);
    }



    //Set file state
    const [file, setFile] = useState();
    const imageRef = useRef(null);

    //Upload Image function
    const uploadCoverImage = async (e) => {

        const imageSize = e.target.files[0].size;
        const imageType = e.target.files[0].type;
        console.log("imageType", imageType);

        if (imageSize > 10485760) {
            toast("Image should should be 10 MB.");
        }
        else if (imageType !== "image/png" && imageType !== "image/ppg" && imageType !== "image/jpeg") {
            toast("Only png, jpg and jpeg allowed.");
        }
        else {
            const url = URL.createObjectURL(e.target.files[0]);
            setFile(e.target.files[0]);
            // console.log('url' , url)
            imageRef.current.src = url;
            imageRef.current.onload = function () {
                URL.revokeObjectURL(imageRef.current.src); // free memory
            };
        }
    };


    //Submit form to update data
    const submitHandler = async () => {

        //Convert to Bodyfrom data
        var bodyFormData = new FormData();
        bodyFormData.append("coverImage", file);

        await updateCoverImageDContext(bodyFormData);
        // console.log('axiosRes in update gen Info', axiosRes);
        setFile('');
    };


    return (
        <>

            {awardIGotPopupState && <ViewAllAwardsIGot awardIGotPopupState={awardIGotPopupState} setAwardIGotPopupState={setAwardIGotPopupState} />}



            <div className="profile-feature-image">
                <img src={user?.coverImage ? user.coverImage : "/images/feature.png"} alt="feature-img" ref={imageRef} />

            </div>
            <div className="profile-user-detail">
                <Container>
                    <div className="user-detail-bar">
                        <div className="detailleft">
                            <OverlayTrigger placement="top" overlay={tooltip}>
                                <div className="avatar-img">
                                    <img src={user?.profileImage ? user.profileImage : `/images/u100.png`} alt="user-img" />
                                </div>
                            </OverlayTrigger>

                            <div className="user-detail">

                                <h4 className="text-secondry">{user?.name ? user.name : ""}</h4>
                                <div className="user-availbility">
                                    <h6 className="text-lightgray">@{user?.username}</h6>
                                </div>
                                {/* {console.log('useruseruser', user)} */}
                                <OverlayTrigger placement="top" overlay={verificationtooltip}>
                                    <div className="levelbar text-darkwhite level1">Level {verificationLevelState}
                                        {/* <h6 className="level1-circle"><span className="text-white lvlstar">{user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? '1' : user?.isPhotoVerify === 1 ? "2" : "0"}</span></h6> */}
                                    </div>
                                </OverlayTrigger>
                                <ul className="user-detail-listing">
                                    <li>
                                        <p className="text-secondry">{userStats?.totalPosts}</p>
                                        <h6 className="text-offwhite">Posts</h6>
                                    </li>
                                    <li onClick={myFollowing}>
                                        <p className="text-secondry">{userStats?.totalFollowing}</p>
                                        <h6 className="text-offwhite">Following</h6>
                                    </li>
                                    <li onClick={myFollowers}>
                                        <p className="text-secondry">{userStats?.totalFollowers}</p>
                                        <h6 className="text-offwhite">Followers</h6>
                                    </li>
                                    <li onClick={viewAwardIGot}>
                                        <p className="text-secondry">{userStats?.totalAwards}</p>
                                        <h6 className="text-offwhite">Awards</h6>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className="user-edit-cover">
                            <ul>
                                <li>
                                    <Link to="/editprofile"><BsPencil />Edit profile</Link>
                                </li>
                                <li>
                                    {/* <Link to="/"><BsFillImageFill />Edit Cover</Link> */}
                                    <button onChange={uploadCoverImage}>
                                        <BsFillImageFill />
                                        <input type='file' />Edit Cover
                                    </button>

                                </li>
                                {file &&
                                    <li onClick={submitHandler}>
                                        <button className='savebtn' type='button'>Save</button>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>

                </Container>
            </div>
            <Container>
                <ProfileTabs user={user} />
            </Container>
        </>
    );
}

export default Profile;
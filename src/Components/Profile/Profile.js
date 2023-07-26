import React, { useContext, useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Tooltip from "react-bootstrap/tooltip";
import OverlayTrigger from "react-bootstrap/overlayTrigger";
import { BsFillImageFill, BsPencil } from "react-icons/bs";
import ProfileTabs from "./ProfileTabs";
import { Link, useNavigate } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import ViewAllAwardsIGot from "../Modals/ViewAllAwardsIGot";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import { verificationLevel } from "../../helper/verificationLevel";
import UserListModal from "../Modals/UserListModal";

const Profile = () => {
  const navigate = useNavigate();
  const {
    user,
    userStats,
    setSelectedIDForPopup,
    popupType,
    setPopupType,
    updateCoverImageDContext,
    isLoading,
    setIsLoading,
    setIsShowRulesModal,
    isDummyUser,
  } = useContext(DContext);

  const tooltip = (
    <Tooltip id="tooltip">
      {user?.thoughts ? user.thoughts : "*crickets*"}
    </Tooltip>
  );

  const [verificationLevelState, setVerificationLevelState] = useState(0);

  const verificationtooltip = (
    <Tooltip id="verificationtooltip">
      {/* {user?.isEmailVerify === 1 && user?.isPhotoVerify === 0 ? 'Verified Email' : user?.isPhotoVerify === 1 ? "Verified Human" : "No Verification"} */}
      {verificationLevelState && verificationLevelState === 4
        ? "Verified official account"
        : verificationLevelState === 1
        ? "Verified Email"
        : verificationLevelState === 2
        ? "Verified Human"
        : "New account"}
    </Tooltip>
  );

  // console.log('user', user)

  //Verification Level
  useEffect(() => {
    getLevel();
  }, [user]);

  const getLevel = async () => {
    // const res = await verificationLevel(user?.isEmailVerify, user?.isPhotoVerify);
    const res = await verificationLevel(user?.level, user?.isOfficial);

    setVerificationLevelState(res);
  };

  const myFollowers = async () => {
    setPopupType("followers-list");
    setSelectedIDForPopup(user._id);
  };

  const myFollowing = async () => {
    setPopupType("following-list");
    setSelectedIDForPopup(user._id);
  };

  const [awardIGotPopupState, setAwardIGotPopupState] = useState(false);
  const viewAwardIGot = async () => {
    setAwardIGotPopupState(true);
  };

  //Set file state
  const [file, setFile] = useState();
  const imageRef = useRef(null);

  //Upload Image function
  const uploadCoverImage = async (e) => {
    const imageSize = e.target.files[0].size;
    const imageType = e.target.files[0].type;
    console.log("imageType", imageType);

    if (imageSize > 10485760) {
      toast("Images must be smaller than 10 MB.");
    } else if (
      imageType !== "image/png" &&
      imageType !== "image/ppg" &&
      imageType !== "image/jpeg"
    ) {
      toast(
        "Unsupported image format. Please upload a png, jpg, or .jpeg instead."
      );
    } else {
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
    setIsLoading(true);
    //Convert to Bodyfrom data
    var bodyFormData = new FormData();
    bodyFormData.append("coverImage", file);

    await updateCoverImageDContext(bodyFormData);
    // console.log('axiosRes in update gen Info', axiosRes);
    setFile("");
    setIsLoading(false);
  };

  // Change state when click on count of agree disagree etc and change popupstate to true to open
  const [popupOpenStatus, setPopupOpenStatus] = useState(false);
  useEffect(() => {
    if (popupType) {
      setPopupOpenStatus(true);
    }
  }, [popupType]);

  return (
    <>
      {isLoading && <Loader />}

      {popupOpenStatus && (
        <UserListModal
          popupOpenStatus={popupOpenStatus}
          setPopupOpenStatus={setPopupOpenStatus}
        />
      )}

      {awardIGotPopupState && (
        <ViewAllAwardsIGot
          awardIGotPopupState={awardIGotPopupState}
          setAwardIGotPopupState={setAwardIGotPopupState}
        />
      )}

      <div className="profile-feature-image">
        <img
          src={user?.coverImage ? user.coverImage : "/images/feature.png"}
          alt="feature-img"
          ref={imageRef}
        />
      </div>
      <div className="profile-user-detail">
        <Container>
          <div className="user-detail-bar">
            <div className="detailleft">
              <OverlayTrigger placement="top" overlay={tooltip}>
                <div className="avatar-img">
                  <img
                    src={
                      user?.profileImage
                        ? user.profileImage
                        : `/images/u100.png`
                    }
                    alt="user-img"
                    style={
                      user?.profileImage
                        ? { border: "3px solid var(--base-green)" }
                        : { border: "none" }
                    }
                  />
                </div>
              </OverlayTrigger>

              <div className="user-detail">
                <h4 className="text-secondry">{user?.name ? user.name : ""}</h4>
                <div className="d-flex align-items-center text_level useravail-text-align">
                  <div className="user-availbility">
                    <h6 className="text-lightgray">@{user?.username}</h6>
                  </div>
                  {/* {console.log('useruseruser', user)} */}
                  <div
                    className="rules-tag"
                    onClick={() => setIsShowRulesModal(true)}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={verificationtooltip}
                    >
                      {verificationLevelState === 4 ? (
                        <div className="levelbar text-darkwhite level1">
                          Official
                        </div>
                      ) : (
                        <div className="levelbar text-darkwhite level1">
                          Level {verificationLevelState}
                        </div>
                      )}
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-edit-cover">
              <ul>
                <li>
                  <Link className="green-button" to="/editprofile">
                    <BsPencil />
                    Edit profile
                  </Link>
                </li>
                <li>
                  {/* <Link to="/"><BsFillImageFill />Edit Cover</Link> */}
                  {/* <button onChange={uploadCoverImage}>
                                        <BsFillImageFill />
                                        <input type='file' title="Cover image must be 1920 x 422 px." />Edit Cover
                                    </button> */}
                </li>
                {file && (
                  <li onClick={submitHandler}>
                    <button className="savebtn" type="button">
                      Save
                    </button>
                  </li>
                )}
              </ul>
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
        </Container>
      </div>
      <Container>
        <ProfileTabs user={user} />
      </Container>
    </>
  );
};

export default Profile;

import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkModeSwitch from "./DarkModeSwitch";
import { AiOutlineEye } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GrNotes } from "react-icons/gr";

import { BsPencil, BsFileMedicalFill, BsBell, BsSearch } from "react-icons/bs";
import { BiLayerMinus, BiHome, BiCopy } from "react-icons/bi";
import { MdHowToVote, MdOutlineWhatshot } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import { useNavigate } from "react-router-dom";
import SingleNotificationList from "../Notification/SingleNotificationList";
import { FcAbout } from "react-icons/fc";
import { TbUser, TbUserPlus } from "react-icons/tb";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import RulesModal from "../Modals/RulesModal";
import ReferModal from "../Modals/ReferUserModal";
import HelpCenterModal from "../Modals/HelpCenterModal";

import DataSaveConfirmationModal from "../Modals/DataSaveConfirmationModal";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import FoundationalRuleModal from "../Modals/FoundationalRuleModal";
import Tooltip from 'react-bootstrap/tooltip';
import { OverlayTrigger } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  // Context Variables
  const {
    user,
    setUser,
    userToken,
    setUserToken,
    notificationList,
    isShowRulesModal,
    setIsShowRulesModal,
    isShowDataSaveConfirmationPopup,
    isNewNotificationArrive,
    isDummyUser,
  } = useContext(DContext);
  // console.log("console user Details in header", user);

  //Logout Functionality
  const logoutHandler = async (e) => {
    // console.log("logout handler call");
    setUser(null);
    setUserToken(null);
    // localStorage.clear();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isDummyLoggedIn");
    navigate("/login");
  };
  //End logout functionality

  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const [isShowHelpCenterModal, setIsShowHelpCenterModal] = useState(false);

  const [isDeleteAccountState, setIsDeleteAccountState] = useState(false);
  const deleteAccount = async () => {
    setIsDeleteAccountState(true);
  };

  const [isShowFoundationalRulePopup, setIsShowFoundationalRuleModal] =
    useState(false);
  //share referral

  const [shareLinkUrl, setShareLinkUrl] = useState(null);
  const [shareShowModalState, setShareShowModalState] = useState(false);
  const ShareShow = async () => {
    console.log(isDummyUser(), "dummay user");
    if (isDummyUser()) {
      console.log("user is not logged in");
      navigate("/login");
    } else {
      if (user?.username === undefined) {
        navigate("/login");
        setShareShowModalState(false);
      } else {
        setShareShowModalState(true);
        const baseURL = window.location.origin;
        setShareLinkUrl(`${baseURL}/share/` + user?.username);
      }
    }
  };


  const shareDisableToolTip = (
    <Tooltip id="shareDisableToolTip">
      Verify email to share
    </Tooltip>
  );

  return (
    <>
      {isShowRulesModal && (
        <RulesModal setIsShowRulesModal={setIsShowRulesModal} />
      )}

      {isShowDataSaveConfirmationPopup && <DataSaveConfirmationModal />}

      {isShowHelpCenterModal && (
        <HelpCenterModal
          isShowHelpCenterModal={isShowHelpCenterModal}
          setIsShowHelpCenterModal={setIsShowHelpCenterModal}
        />
      )}

      {isDeleteAccountState && (
        <DeleteAccountModal
          isDeleteAccountState={isDeleteAccountState}
          setIsDeleteAccountState={setIsDeleteAccountState}
        />
      )}

      {isShowFoundationalRulePopup && (
        <FoundationalRuleModal
          isShowFoundationalRulePopup={isShowFoundationalRulePopup}
          setIsShowFoundationalRuleModal={setIsShowFoundationalRuleModal}
        />
      )}
      {shareShowModalState && (
        <ReferModal
          isShowReferModal={shareShowModalState}
          setIsShowReferModal={setShareShowModalState}
          url={shareLinkUrl}
        />
      )}

      <Navbar className="header-nav" expand="lg">
        <Container>
          <div className="mainheader">
            {userToken ? (
              <>
              <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">dygres</Tooltip>}>
                <Navbar.Brand>
                  <Link to="/new">
                    <img
                      className="lightmode"
                      src="/images/dygreslogo.png"
                      alt="logo"
                    />
                  </Link>
                  <Link to="/new">
                    <img
                      className="darkmode"
                      src="/images/dygreslogo.png"
                      alt="logo"
                    />
                  </Link>
                </Navbar.Brand>
                </OverlayTrigger>
              </>
            ) : (
              <>
              <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">dygres</Tooltip>}>
                <Navbar.Brand>
                  <Link to="/">
                    <img
                      className="lightmode"
                      src="/images/dygreslogo.png"
                      alt="logo"
                    />
                  </Link>

                  <Link to="/">
                    <img
                      className="darkmode"
                      src="/images/dygreslogo.png"
                      alt="logo"
                    />
                  </Link>
                </Navbar.Brand>
                </OverlayTrigger>
              </>
            )}

            <Nav className="mx-auto me-0 mob-none">
              {userToken ? (
                <>
                  <Link to="/new" className="homeicon">
                    <BiHome color="var(--base-primary)" />
                  </Link>
                </>
              ) : (
                <Link to="/" className="homeicon">
                  <BiHome />
                </Link>
              )}

              <div className="text-lightgray" href="#">
                <DarkModeSwitch />
              </div>

              <div className="text-lightgray user_icon" href="#">

                {user?.isEmailVerify === 0 ?
                  <>
                    <div className="user_icon">
                      <OverlayTrigger overlay={shareDisableToolTip} placement="bottom" >
                        <div>
                          <span>{user?.referradCount ? user.referradCount : 0}</span>
                          <TbUser />
                        </div>
                      </OverlayTrigger>
                    </div>
                  </>
                  :
                  <div className="user_icon" onClick={ShareShow}>
                    <span>{user?.referradCount ? user.referradCount : 0}</span>
                    <TbUser />
                  </div>
                }
              </div>

              <div
                className="cursor-pointer helpicon"
                href="#"
                onClick={() => setIsShowHelpCenterModal(true)}
              >
                <BsQuestionCircle />
              </div>

              {pathname === "/" ? (
                <div className="cursor-pointer loginbtn">
                  <Link to="/login">Login</Link>
                </div>
              ) : null}

              {userToken ? (
                <>
                  {/* <div className="relative user-dropdown notify-add notification-come"> */}
                  <div
                    className={
                      isNewNotificationArrive
                        ? "relative user-dropdown notify-add notification-come"
                        : "relative user-dropdown notify-add"
                    }
                  >
                    <Nav.Link
                      className="text-lightgray btndot"
                      href="#"
                      onClick={() => {
                        navigate("/notification");
                      }}
                    >
                      <BsBell />
                    </Nav.Link>
                    <div className=" Dropdown-listing notification-dropdown bg-white">
                      <div className="scroll_slim arrowbar">
                        <div className="arrowshape"></div>
                        <div className="notification-head">
                          <h4>Notifications</h4>
                          {/* <h6>Mark all as read</h6> */}
                        </div>

                        {/* <div className="notification-body">
                          <div className="notification-list">
                            <ul>
                              <li>
                                <img src="/images/user.png" alt="img" />
                              </li>
                              <li>
                                <div className="userdetail">
                                  <h6>Methew Reed</h6>
                                  <p>@methew11</p>
                                </div>
                                <p className="times">46 mins ago</p>
                              </li>
                            </ul>
                            <p className="notification">
                              Methew Reed started Following you
                            </p>
                          </div>
                        </div> */}
                        {notificationList.length ? (
                          notificationList.map((singleNotification) => (
                            <SingleNotificationList
                              key={singleNotification._id}
                              singleNotification={singleNotification}
                            />
                          ))
                        ) : (
                          <div className="empty-bar">
                            <img src="/images/empty.png" alt="dummy" />
                            <h4>No Notification</h4>
                          </div>
                        )}

                        <div className="notification-foot">
                          <Link to="/notification">See All</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Nav.Link className="text-lightgray" href="#">
                    <AiOutlineSetting />
                  </Nav.Link> */}
                  <div className="relative user-dropdown">
                    <img
                      src={
                        user?.profileImage
                          ? user.profileImage
                          : "/images/user.png"
                      }
                      alt="user-img"
                    />

                    {isDummyUser() ? null : (
                      <>
                        <div className="Dropdown-listing bg-white">
                          <div className="arrowshape"></div>
                          <h4 className="text-silver">Account</h4>
                          <ul>
                            <li className="text-secondry">
                              <Link to="/profile">
                                <AiOutlineEye />
                                View Profile
                              </Link>
                            </li>
                            <li className="text-secondry">
                              <Link to="/editprofile">
                                <BsPencil />
                                Edit Profile
                              </Link>
                            </li>

                            <li
                              className="text-secondry"
                              onClick={deleteAccount}
                            >
                              {/* <Link to="/editprofile"> */}
                              <AiFillDelete />
                              Delete Account
                              {/* </Link> */}
                            </li>
                            <li
                              className="text-secondry"
                              onClick={logoutHandler}
                            >
                              <MdLogout />
                              Log Out
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : null}
            </Nav>

            {userToken ? (
              <div className="mobilemenu">
                <ul className="web-none">
                  <li>
                    <Link to="/notfound">
                      <BsSearch />
                    </Link>
                  </li>
                  <li>
                    <Link to="/notification">
                      <BsBell />
                    </Link>
                  </li>
                </ul>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              </div>
            ) : null}
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="sidebar-menu">
              <li className={splitLocation[1] === "new" ? "active" : ""}>
                <Link exact to="/new">
                  <BsFileMedicalFill /> New
                </Link>
              </li>
              <li className={splitLocation[1] === "Hot" ? "active" : ""}>
                <Link to="/Hot">
                  <MdOutlineWhatshot />
                  Hot
                </Link>
              </li>
              <li className={splitLocation[1] === "Most-voted" ? "active" : ""}>
                <Link to="/Most-voted">
                  <MdHowToVote />
                  Most Voted
                </Link>
              </li>

              <li
                className={
                  splitLocation[1] === "trending-hashtags" ? "active" : ""
                }
              >
                <Link to="/trending-hashtags">
                  <BiLayerMinus />
                  Trending hashtags
                </Link>
              </li>

              <li
                className={splitLocation[1] === "notification" ? "active" : ""}
              >
                <Link to="/notification">
                  <BsBell />
                  Notifications
                </Link>
              </li>

              <li>
                <Link
                  onClick={(e) => {
                    setIsShowFoundationalRuleModal(true);
                    e.preventDefault();
                  }}
                  to="/"
                >
                  <GrNotes />
                  Foundational Rules
                </Link>
              </li>

              <li className="svggray">
                <Link
                  onClick={(e) => {
                    window.open("https://dygres.com/about/");
                    e.preventDefault();
                  }}
                  to="/"
                >
                  <FcAbout />
                  About Us
                </Link>
              </li>

              {isDummyUser ? (
                <></>
              ) : (
                <>
                  <li className="logout" onClick={logoutHandler}>
                    <Link to="/logout">
                      <MdLogout />
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* share model */}
      {/* <Modal
        className="Actions-modal share-popup"
        show={shareShowModalState}
        onHide={shareClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Share post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="share-media">
            <li>
              <button className="sharebtn" type="button">
                <BsTwitter />
              </button>
              <p>Twitter</p>
            </li>
            <li>
              <button className="sharebtn" type="button">
                <FaFacebookF />
              </button>
              <p>Facebook</p>
            </li>
            <li>
              <button className="sharebtn" type="button">
                <FaRedditAlien />
              </button>
              <p>Reddit</p>
            </li>
            <li>
              <button className="sharebtn" type="button">
                <BsWhatsapp />
              </button>
              <p>WhatsApp</p>
            </li>
            <li>
              <button className="sharebtn" type="button">
                <AiFillLinkedin />
              </button>
              <p>Linkedin</p>
            </li>
            <li>
              <button className="sharebtn" type="button">
                <BsTwitter />
              </button>
              <p>Twitter</p>
            </li>
          </ul>
          <div className="shareurl-bar">
            <p>{shareLinkUrl ? shareLinkUrl : null}</p>
            {copied ? (
              <>
                <div className="copiedbar">
                  <TiTickOutline />{" "}
                  <p
                    className="
                  "
                  >
                    Copied
                  </p>
                </div>
              </>
            ) : (
              <a
              // onClick={copyText}
              >
                <BiCopy />
              </a>
            )}
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default Header;

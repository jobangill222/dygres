import React, { useContext, useState } from "react";
import { BsPencil, BsFileMedicalFill, BsBell } from "react-icons/bs";
import { BiSearch, BiLayerMinus } from "react-icons/bi";
import { MdHowToVote, MdOutlineWhatshot } from "react-icons/md";

import { GrNotes } from "react-icons/gr";
import { FcAbout } from "react-icons/fc";

import { Link } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import Tooltip from "react-bootstrap/tooltip";
import OverlayTrigger from "react-bootstrap/overlayTrigger";
import { useNavigate } from "react-router-dom";
import ViewAllAwardsIGot from "../Modals/ViewAllAwardsIGot";
import FoundationalRuleModal from "../Modals/FoundationalRuleModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const {
    user,
    userStats,
    setSelectedIDForPopup,
    setPopupType,
    searchState,
    setSearchState,
    searchSuggestionDContext,
    showSuggestions,
    setShowSuggestions,
    setHashTagClickState,
    isDummyUser,
  } = useContext(DContext);

  const tooltip = (
    <Tooltip id="tooltip">
      {user?.thoughts ? user.thoughts : "*crickets*"}
    </Tooltip>
  );

  // console.log('user', user);

  const openViewProfile = async () => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const myFollowers = async () => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      setPopupType("followers-list");
      setSelectedIDForPopup(user._id);
    }
  };

  const myFollowing = async () => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      setPopupType("following-list");
      setSelectedIDForPopup(user._id);
    }
  };

  const [awardIGotPopupState, setAwardIGotPopupState] = useState(false);
  const viewAwardIGot = async () => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      setAwardIGotPopupState(true);
    }
  };

  //Search
  const [suggestionList, setSuggestionList] = useState([]);
  const searchTyping = async (event) => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      let value;
      if (event.target.value[0] === "@") {
        value = event.target.value.replace(/^./, "");
      } else {
        value = event.target.value;
      }

      setSearchState(event.target.value);
      if (!value) {
        setShowSuggestions(false);
        return;
      } else {
        setShowSuggestions(true);
        const axiosRes = await searchSuggestionDContext(value);
        setSuggestionList(axiosRes.list);
        // navigate("/new");
      }
    }
  };

  const searchClickHashTag = (name) => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      setHashTagClickState(true);
      setSearchState(name);
      setShowSuggestions(false);
      localStorage.setItem("hashTagName", name);
      navigate("/hashtagPosts");
    }
  };

  const searchClickUserName = (username, userID) => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      setSearchState(username);
      setShowSuggestions(false);
      // localStorage.setItem('sessionUserID', userID)
      navigate("/UsersProfile/" + username);
    }
  };

  //End search

  const ignoreUpperClick = (event) => {
    event.stopPropagation();
  };

  const [isShowFoundationalRulePopup, setIsShowFoundationalRuleModal] =
    useState(false);

  return (
    <>
      {awardIGotPopupState && (
        <ViewAllAwardsIGot
          awardIGotPopupState={awardIGotPopupState}
          setAwardIGotPopupState={setAwardIGotPopupState}
        />
      )}

      {isShowFoundationalRulePopup && (
        <FoundationalRuleModal
          isShowFoundationalRulePopup={isShowFoundationalRulePopup}
          setIsShowFoundationalRuleModal={setIsShowFoundationalRuleModal}
        />
      )}

      <div className="sidebar-profile">
        {/* <div className="feature-image">
                    <img src={user && user?.coverImage ? user.coverImage : "/images/feature.png"} alt="feature-img" />

                    {/* <input type="file" className="uploadimg-input" />
                    <Link to={isDummyUser() ? '/login' : "/editprofile"}>
                        <div className="edit-bar">
                            <BsPencil className="text-primary" />
                        </div>
                    </Link>
                </div> */}
        <div className="User-detail">
          <OverlayTrigger placement="top" overlay={tooltip}>
            <div className="usermain-img">
              <img
                src={
                  user?.profileImage
                    ? user.profileImage
                    : `/images/user-120.png`
                }
                alt="user-main-img"
                style={
                  user?.profileImage
                    ? { border: "5px solid var(--base-green)" }
                    : { border: "none" }
                }
              />

              {isDummyUser() ? (
                <div class="user_info_sidebar">
                  <p></p>
                  {/* <Link to={isDummyUser() ? "/login" : "/editprofile"}>
                    <span>
                      <BsPencil />
                    </span>
                    &nbsp; Edit Profile
                  </Link> */}
                </div>
              ) : (
                <div class="user_info_sidebar">
                  <p>{user?.username}</p>
                  <Link to={isDummyUser() ? "/login" : "/editprofile"}>
                    <span>
                      <BsPencil />
                    </span>
                    &nbsp; Edit Profile
                  </Link>
                </div>
              )}
            </div>
          </OverlayTrigger>
          <ul className="user-detail-listing">
            <li onClick={openViewProfile}>
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
          {/* <h4 className="text-secondry username text-center">{user ? user?.name : user?.username}</h4> */}
          {/* <h4 className="text-secondry username text-center">Amanpreet</h4> */}

          <ul className="user-detaiting-listing">
            {/* <li>UI/UX Designer <img src="/images/ui-ux.png" alt="icons" /></li>
                        <li>Workoholic <img src="/images/workholic.png" alt="icons" /></li>
                        <li>Begginer <img src="/images/beginer.png" alt="icons" /></li> */}
            {/* <li>{user?.bio ? user.bio : 'No bio'}</li> */}
          </ul>

          {/* <div className="search-input-form">
                        <form className="user-searchform">
                            <input type="text" className="bg-gray" placeholder="Search" value={searchState ? searchState : ''} onChange={searchTyping} />
                            <button className="bg-lightgray text-lightgray"><BiSearch /></button>
                        </form>
                    </div> */}

          <div className="search-input-form">
            <div className="user-searchform">
              <input
                type="text"
                value={searchState}
                onChange={searchTyping}
                placeholder="Search"
                className="bg-gray"
                onClick={ignoreUpperClick}
              />
              <button className="bg-lightgray text-lightgray">
                <BiSearch />
              </button>
            </div>

            {showSuggestions && (
              <ul>
                {searchState &&
                  searchState[0] === "#" &&
                  suggestionList.map((suggestion) => (
                    <li
                      key={suggestion?.name}
                      onClick={() => searchClickHashTag(suggestion?.name)}
                    >
                      {suggestion?.name}
                    </li>
                  ))}
                {searchState &&
                  searchState[0] !== "#" &&
                  suggestionList.map((suggestion) => (
                    <li
                      key={suggestion?.username}
                      onClick={() =>
                        searchClickUserName(
                          suggestion?.username,
                          suggestion?._id
                        )
                      }
                    >
                      <img
                        src={
                          suggestion?.profileImage !== null
                            ? suggestion.profileImage
                            : "/images/user-120.png"
                        }
                        alt="icon"
                      />
                      {suggestion?.username}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        {/* Menu start here */}
        <ul className="sidebar-menu">
          <li>
            <Link exact to={isDummyUser() ? "/login" : "/new"}>
              <BsFileMedicalFill /> New
            </Link>
          </li>
          <li>
            <Link to={isDummyUser() ? "/login" : "/hot"}>
              <MdOutlineWhatshot />
              Hot
            </Link>
          </li>
          <li>
            <Link to={isDummyUser() ? "/login" : "/most-voted"}>
              <MdHowToVote />
              Most Votes
            </Link>
          </li>
          {/* <li><Link to="/not-voted"><BiLayerMinus />Least Votes</Link></li> */}

          <li>
            <Link to={isDummyUser() ? "/login" : "/trending-hashtags"}>
              <BiLayerMinus />
              Trending hashtags
            </Link>
          </li>

          <li>
            <Link to={isDummyUser() ? "/login" : "/notification"}>
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
        </ul>
        {/* Menu ends here */}
      </div>
    </>
  );
};

export default Sidebar;

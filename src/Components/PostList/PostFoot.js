import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  AiFillLike,
  AiFillDislike,
  // AiOutlinePlus,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaGift, FaComments, FaFacebookF, FaRedditAlien } from "react-icons/fa";
import {
  BsFillFlagFill,
  BsPencil,
  BsThreeDots,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";
import { ImDrive, ImForward } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiSpeakerphone } from "react-icons/hi";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Countdown from "react-countdown";
import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AwardModal from "../Modals/AwardModal";
import { MdOutlineTimer } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";

import RetweetModal from "../../Components/Modals/RetweetModal";

import moment from "moment";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const PostFoot = (props) => {
  const navigate = useNavigate();

  // const timeAgo = new TimeAgo('en-US')

  //Props
  const {
    agree_count,
    is_agree,
    disagree_count,
    is_disagree,
    report_count,
    commentCount,
    is_report,
    postUserID,
    postID,
    setIsEditFieldOpen,
    isPostDisable,
    awardCount,
    setAwardCount,
    created_at,
    postListingType,
    amplify_count,
    isPostByOfficial,
  } = props;

  //Functions to call api
  const {
    setUserStats,
    agreeUnagreePost,
    disAgreeUnDisAgreePost,
    reportPostDContext,
    deletePostDContext,
    user,
    postList,
    setPostList,
    setSelectedIDForPopup,
    setPopupType,
    setPostIDForSinglePostState,
    checkIsAlreadyAmplifyDContext,
    isDummyUser,
  } = useContext(DContext);

  //Set states
  const [postAgreeCount, setPostAgreeCount] = useState(agree_count);
  const [isAgree, setIsAgree] = useState(false);

  const [postDisAgreeCount, setPostDisAgreeCount] = useState(disagree_count);
  const [isDisAgree, setIsDisAgree] = useState(false);

  const [postReportCount, setPostReportCount] = useState(report_count);
  const [isReport, setIsReport] = useState(false);

  const [isthreadopen, setIsthreadopen] = useState(false);

  useEffect(() => {
    // console.log("isthreadopen", isthreadopen);
    if (isDummyUser()) {
    } else {
      props.onCommentBoxOpen(isthreadopen);
    }
  }, [isthreadopen]);

  // useeffect to render count and pass true false status for active and un active footer options
  useEffect(() => {
    if (is_agree === 1) {
      setIsAgree(true);
    } else {
      setIsAgree(false);
    }
    setPostAgreeCount(agree_count);
  }, [is_agree]);

  useEffect(() => {
    if (is_disagree === 1) {
      setIsDisAgree(true);
    } else {
      setIsDisAgree(false);
    }
    setPostDisAgreeCount(disagree_count);
  }, [is_disagree]);

  useEffect(() => {
    if (is_report === 1) {
      setIsReport(true);
    } else {
      setIsReport(false);
    }
    setPostReportCount(report_count);
  }, [is_report]);

  const [agreeDisagreeButtonDisableState, setAgreeDisagreeButtonDisableState] =
    useState(false);

  // Aggree Modal
  const AgreePost = async (postID) => {
    console.log("aggree icon clicked");
    if (isDummyUser()) {
      navigate("/login");
    } else {
      if (!agreeDisagreeButtonDisableState) {
        setAgreeDisagreeButtonDisableState(true);
        const agreeAxiosRes = await agreeUnagreePost(postID);
        if (agreeAxiosRes.status === "success") {
          if (agreeAxiosRes.action === "agree") {
            let newAgreeCountWhenAgree = postAgreeCount + 1;
            setPostAgreeCount(newAgreeCountWhenAgree);
            setIsAgree(true);
          } else {
            let newAgreeCountWhenUnagree = postAgreeCount - 1;
            setPostAgreeCount(newAgreeCountWhenUnagree);
            setIsAgree(false);
          }
        } else {
          toast(agreeAxiosRes.message);
        }
        setAgreeDisagreeButtonDisableState(false);
      }
    }
  };

  // DisAggree Modal

  const DisAgreePost = async (postID) => {
    console.log("disagree icon clicked");
    if (isDummyUser()) {
      navigate("/login");
    } else {
      if (!agreeDisagreeButtonDisableState) {
        setAgreeDisagreeButtonDisableState(true);
        const disagreeAxiosRes = await disAgreeUnDisAgreePost(postID);
        if (disagreeAxiosRes.status === "success") {
          if (disagreeAxiosRes.action === "disagree") {
            let newDisAgreeCountWhenDisAgree = postDisAgreeCount + 1;
            setPostDisAgreeCount(newDisAgreeCountWhenDisAgree);
            setIsDisAgree(true);
          } else {
            let newDisAgreeCountWhenUnDisagree = postDisAgreeCount - 1;
            setPostDisAgreeCount(newDisAgreeCountWhenUnDisagree);
            setIsDisAgree(false);
          }
        } else {
          toast(disagreeAxiosRes.message);
        }
        setAgreeDisagreeButtonDisableState(false);
      }
    }
  };

  // Report Modal
  const [EditReportShow, setEditreportshow] = useState(false);
  const EditReportClose = () => setEditreportshow(false);
  const EditReport = async (postID) => {
    if (isDummyUser()) {
      console.log("user is not logged in");
      navigate("/login");
    } else {
      if (isReport) {
        toast(
          "You have already reported this content. Thank you for your patience while we process your report."
        );
      } else {
        setEditreportshow(true);
      }
    }
  };
  const [reportReason, setReportReason] = useState(null);
  const [reportDescription, setReportDescription] = useState("");
  const submitReport = async (e) => {
    e.preventDefault();
    // console.log('post Id to be report', postID);
    // console.log('reportReason', reportReason);
    // console.log('reportDescription', reportDescription);
    if (!reportReason) {
      toast("Please select the reason(s) for your report.");
    } else {
      const reportAxiosRes = await reportPostDContext(
        postID,
        reportReason,
        reportDescription
      );
      console.log("reportAxiosRes", reportAxiosRes);
      if (reportAxiosRes.status === "success") {
        let newReportCount = postReportCount + 1;
        setPostReportCount(newReportCount);
        setIsReport(true);
        setEditreportshow(false);
        toast("Report successfully submitted.");
      } else {
        toast(reportAxiosRes.message);
      }
    }
  };

  // Delete Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const showDeletePostPopupWarning = () => {
    if (isDummyUser()) {
      console.log("user is not logged in");
      navigate("/login");
    } else {
      setShow(true);
    }
  };
  const yesDeletePost = async () => {
    console.log("user is not logged in");

    const axiosDeleteRes = await deletePostDContext(postID);
    if (axiosDeleteRes.status === "success") {
      setShow(false);
      const result = postList.filter((post) => post._id !== postID);
      setPostList(result);

      // Update user stats state
      setUserStats((previousState) => {
        return {
          ...previousState,
          totalPosts: previousState.totalPosts - 1,
        };
      });
    }
    toast(axiosDeleteRes.message);
  };

  // open popup by set state in selected postid which is global state and set popup type state
  const viewUserListPopup = async (type) => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      setSelectedIDForPopup(postID);
      setPopupType(type);
    }
  };

  const [awardPopupOpenStatus, setAwardPopupOpenStatus] = useState(false);
  const [selectedPostIDForAwardPopup, setSelectedPostIDForAwardPopup] =
    useState(postID); //Either be postID or comment ID to get user list whom agree or disagree and modal will open if there is any value change in this state(Define in component/DigitalTabs , Pages/Hot,new,Notvoted etc)
  const viewAwardModal = () => {
    if (isDummyUser()) {
      navigate("/login");
    } else {
      setAwardPopupOpenStatus(true);
      setSelectedPostIDForAwardPopup(postID);
    }
  };

  //Make multiselect report reason
  const selectReportReason = async (reason) => {
    if (reportReason === null) {
      setReportReason(reason);
    } else {
      var arr = reportReason.split(",");
      const index = arr.indexOf(reason);
      if (index > -1) {
        // only splice arr when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
        setReportReason(arr.toString());
      } else {
        setReportReason(reportReason + "," + reason);
      }
    }
  };

  // Edit Post Renderer callback with condition
  const [isPostEditableState, setIsPostEditableState] = useState(null);
  const editRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // setIsPostDisable(true)
      setIsPostEditableState(true);
      return <Completionist />;
    } else {
      return (
        <span style={{ color: "red" }}>
          {" "}
          <MdOutlineTimer />
          {minutes}:{seconds}
        </span>
      );
    }
  };

  // delete Post Renderer callback with condition
  const [isPostDeletableableState, setIsPostDeletableableState] =
    useState(null);
  const deleteRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // setIsPostDisable(true)
      setIsPostDeletableableState(true);
      return <Completionist />;
    } else {
      return (
        <span style={{ color: "red" }}>
          {" "}
          <MdOutlineTimer />
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const Completionist = () => (
    <span style={{ color: "red" }}>
      <MdOutlineTimer />
      Time over
    </span>
  );

  const viewPost = async (postID) => {
    // localStorage.setItem('PostIdForSinglePost', postID);

    if (isDummyUser()) {
      console.log("user is not logged in");
      navigate("/login");
    } else {
      setPostIDForSinglePostState(postID);
      const baseURL = window.location.origin;
      window.open(`${baseURL}/SinglePostDetail/` + postID, "_blank");
    }
  };

  // Share Modal
  const [shareLinkUrl, setShareLinkUrl] = useState(null);

  const [shareShowModalState, setShareShowModalState] = useState(false);
  const shareClose = () => setShareShowModalState(false);
  const ShareShow = async () => {
    if (isDummyUser()) {
      console.log("user is not logged in");
      navigate("/login");
    } else {
      setShareShowModalState(true);
      const baseURL = window.location.origin;
      setShareLinkUrl(`${baseURL}/SinglePostDetail/` + postID);
    }
  };

  //Copy functionality
  const [copied, setCopied] = React.useState(false);

  const onChangeCopyValue = useCallback(({ target: { value } }) => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, []);

  const onCopy = useCallback(() => {
    setCopied(true);
  }, []);

  const [amplifyCountState, setAmplifyCountState] = useState(0);
  useEffect(() => {
    setAmplifyCountState(amplify_count);
  }, [amplify_count]);

  const [viewRetweetPopup, setViewRetweetPopup] = useState(false);

  const retweetPost = async () => {
    if (user._id !== postUserID) {
      const axiosRes = await checkIsAlreadyAmplifyDContext(postID);
      if (axiosRes.status === "success") {
        setViewRetweetPopup(true);
      } else {
        toast(axiosRes.message);
      }
    } else {
      viewUserListPopup("apmlified-user-of-post-list");
    }
  };

  return (
    <>
      {viewRetweetPopup && (
        <RetweetModal
          viewRetweetPopup={viewRetweetPopup}
          setViewRetweetPopup={setViewRetweetPopup}
          amplifyCountState={amplifyCountState}
          setAmplifyCountState={setAmplifyCountState}
          postIDForRetweet={postID}
          isPostByOfficial={isPostByOfficial}
        />
      )}

      <div className="action-bar">
        <ul className="actionleftbar">
          <li className="Agreeli">
            <div
              className={isAgree ? `active` : ""}
              onClick={() => !isPostDisable && AgreePost(postID)}
            >
              <AiFillLike />
            </div>
            <div
              className="list-text"
              onClick={() => viewUserListPopup("agree-post-user-list")}
            >
              <span className="number">{postAgreeCount}</span>
              Agree
            </div>
          </li>

          <li className="Disagreeli">
            <div
              className={isDisAgree ? `active` : ""}
              onClick={() => !isPostDisable && DisAgreePost(postID)}
            >
              <AiFillDislike />
            </div>
            <div
              className="list-text"
              onClick={() => viewUserListPopup("disagree-post-user-list")}
            >
              <span className="number">{postDisAgreeCount}</span>
              Disagree
            </div>
          </li>

          {/* <li onClick={AwardsShow}> */}
          {/* {console.log('awardPopupOpenStatus', awardPopupOpenStatus)} */}

          <li className="Awardsli awardsbtn-disable" onClick={viewAwardModal}>
            <div>
              <FaGift />
            </div>
            <span className="number">{awardCount}</span>Awards
          </li>

          {awardPopupOpenStatus && (
            <AwardModal
              selectedPostIDForAwardPopup={selectedPostIDForAwardPopup}
              setSelectedPostIDForAwardPopup={setSelectedPostIDForAwardPopup}
              awardPopupOpenStatus={awardPopupOpenStatus}
              setAwardPopupOpenStatus={setAwardPopupOpenStatus}
              setAwardCount={setAwardCount}
            />
          )}

          <li className="Threadsli">
            {/* <div className={isthreadopen ? 'accordionhead active' : 'accordionhead'} isthreadopen={isthreadopen ? isthreadopen : ""} onClick={() => setIsthreadopen(!isthreadopen)}> */}
            <div
              className={
                isthreadopen ? "accordionhead active" : "accordionhead"
              }
              onClick={() => setIsthreadopen(!isthreadopen)}
            >
              <FaComments />
              <span className="number">{commentCount}</span>Threads
            </div>
          </li>

          {/* <li >
            <div className={isReport ? `active` : ""} onClick={() => EditReport(postID)}><BsFillFlagFill /></div>
            <div className="list-text" onClick={() => viewUserListPopup('report-post-user-list')}>
              <span className="number">{postReportCount}</span>
              Report</div>
          </li> */}
          <li className="Reportsli" onClick={() => EditReport(postID)}>
            <div>
              <BsFillFlagFill />
            </div>
            <div className="list-text">
              <span className="number">{postReportCount}</span>
              Reports
            </div>
          </li>

          <li className="Amplifyli">
            <div className="" onClick={retweetPost}>
              <div>
                <HiSpeakerphone />
              </div>
            </div>
            <div
              className="list-text"
              onClick={() => viewUserListPopup("apmlified-user-of-post-list")}
            >
              <span className="number">{amplifyCountState}</span>
              Amplify
            </div>
          </li>

          {postListingType !== "singlePost" && (
            <li className="viewpostli" onClick={() => viewPost(postID)}>
              <div>
                <BsArrowUpRightSquareFill />
              </div>
              <p>View post</p>
            </li>
          )}

          <li className="editpostli">
            <Dropdown className="hoverdropdown">
              <Dropdown.Toggle
                className="p-0 bg-transparent border-0 text-lightgray"
                variant="success"
                id="dropdown-basic"
              >
                {user?._id === postUserID && <BsThreeDots />}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setIsEditFieldOpen(true)}
                  disabled={isPostEditableState ? true : false}
                >
                  <p>
                    <BsPencil />
                    Edit Post
                  </p>
                  <Countdown
                    date={moment(created_at) + 3600 * 1000}
                    renderer={editRenderer}
                  ></Countdown>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={showDeletePostPopupWarning}
                  disabled={isPostDeletableableState ? true : false}
                >
                  <p>
                    <RiDeleteBin6Line />
                    Delete Post
                  </p>
                  <Countdown
                    date={moment(created_at) + 1800 * 1000}
                    renderer={deleteRenderer}
                  ></Countdown>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <ul className="actionrytbar">
          <li onClick={ShareShow}>
            <div>
              <ImForward />
            </div>
            <p>Share</p>
          </li>
          {postListingType !== "singlePost" && (
            <li className="viewpost-btn" onClick={() => viewPost(postID)}>
              <div>
                <BsArrowUpRightSquareFill />
              </div>
              <p>View post</p>
            </li>
          )}
        </ul>
      </div>
      {/* Delete modal */}
      <Modal
        className="Actions-modal deletemodal"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete this post ?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={yesDeletePost}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Awards modal */}
      {/* <Modal
        className="Actions-modal awards-modal z-1050"
        show={showAwards}
        onHide={AwardsClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Awards</Modal.Title>
          <button onClick={ShowAddMore} className="btn-add">
            Buy more
            <AiOutlinePlus />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <img src="/gif/thumbsdown2.gif" alt="img" />
                <h4>Owned: 56</h4>
              </div>
            </Col>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <img src="/gif/thumbsdown2.gif" alt="img" />
                <h4>Owned: 56</h4>
              </div>
            </Col>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <img src="/gif/thumbsdown2.gif" alt="img" />
                <h4>Owned: 56</h4>
              </div>
            </Col>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <img src="/gif/thumbsdown2.gif" alt="img" />
                <h4>Owned: 56</h4>
              </div>
            </Col>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <img src="/gif/thumbsdown2.gif" alt="img" />
                <h4>Owned: 56</h4>
              </div>
            </Col>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <img src="/gif/thumbsdown2.gif" alt="img" />
                <h4>Owned: 56</h4>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      BuyAwards modal 
      <Modal
        className="Actions-modal buymore-modal "
        show={showBuyAwards}
        onHide={ShowBuyAwardsClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Buy awards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <p className="Begde-bar">X100</p>
                <div className="awards-img">
                  <img src="/images/awards.png" alt="img" />
                </div>
                <h5>Package Name</h5>
                <h3>₹599</h3>
              </div>
            </Col>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <p className="Begde-bar">X100</p>
                <div className="awards-img">
                  <img src="/images/awards.png" alt="img" />
                </div>
                <h5>Package Name</h5>
                <h3>₹599</h3>
              </div>
            </Col>
            <Col className="col-md-4">
              <div className="Awrds-li">
                <p className="Begde-bar">X100</p>
                <div className="awards-img">
                  <img src="/images/awards.png" alt="img" />
                </div>
                <h5>Package Name</h5>
                <h3>₹599</h3>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal> */}
      {/* Edit Report */}
      <Modal
        className="Actions-modal Editreportmodal"
        show={EditReportShow}
        onHide={EditReportClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="report-tabs">
            <li
              onClick={() => selectReportReason("abuse or harassment")}
              className={
                reportReason && reportReason.includes("abuse or harassment")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              abuse or harassment
            </li>
            <li
              onClick={() => selectReportReason("child exploitation")}
              className={
                reportReason && reportReason.includes("child exploitation")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              child exploitation
            </li>
            <li
              onClick={() =>
                selectReportReason("copyright or trademark infringement")
              }
              className={
                reportReason &&
                reportReason.includes("copyright or trademark infringement")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              copyright or trademark infringement
            </li>
            <li
              onClick={() => selectReportReason("cyberbullying")}
              className={
                reportReason && reportReason.includes("cyberbullying")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              cyberbullying
            </li>
            <li
              onClick={() => selectReportReason("deepfake")}
              className={
                reportReason && reportReason.includes("deepfake")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              deepfake
            </li>
            <li
              onClick={() => selectReportReason("doxxing")}
              className={
                reportReason && reportReason.includes("doxxing")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              doxxing
            </li>
            <li
              onClick={() =>
                selectReportReason("election or political interference")
              }
              className={
                reportReason &&
                reportReason.includes("election or political interference")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              election or political interference
            </li>
            <li
              onClick={() => selectReportReason("explicit adult content")}
              className={
                reportReason && reportReason.includes("explicit adult content")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              explicit adult content
            </li>
            <li
              onClick={() => selectReportReason("graphic violence")}
              className={
                reportReason && reportReason.includes("graphic violence")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              graphic violence
            </li>
            <li
              onClick={() =>
                selectReportReason("hate speech or hateful conduct")
              }
              className={
                reportReason &&
                reportReason.includes("hate speech or hateful conduct")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              hate speech or hateful conduct
            </li>
            <li
              onClick={() =>
                selectReportReason("impersonating a dygres team member")
              }
              className={
                reportReason &&
                reportReason.includes("impersonating a dygres team member")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              impersonating a dygres team member
            </li>
            <li
              onClick={() =>
                selectReportReason("misleading or deceptive identity")
              }
              className={
                reportReason &&
                reportReason.includes("misleading or deceptive identity")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              misleading or deceptive identity
            </li>
            <li
              onClick={() => selectReportReason("phishing")}
              className={
                reportReason && reportReason.includes("phishing")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              phishing
            </li>
            <li
              onClick={() => selectReportReason("platform manipulation")}
              className={
                reportReason && reportReason.includes("platform manipulation")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              platform manipulation
            </li>
            <li
              onClick={() => selectReportReason("sensitive or offensive media")}
              className={
                reportReason &&
                reportReason.includes("sensitive or offensive media")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              sensitive or offensive media
            </li>
            <li
              onClick={() =>
                selectReportReason("sexual exploitation or sexual violence")
              }
              className={
                reportReason &&
                reportReason.includes("sexual exploitation or sexual violence")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              sexual exploitation or sexual violence
            </li>
            <li
              onClick={() => selectReportReason("someone is impersonating me")}
              className={
                reportReason &&
                reportReason.includes("someone is impersonating me")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              someone is impersonating me
            </li>
            <li
              onClick={() => selectReportReason("spam")}
              className={
                reportReason && reportReason.includes("spam")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              spam
            </li>
            <li
              onClick={() => selectReportReason("suicide baiting")}
              className={
                reportReason && reportReason.includes("suicide baiting")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              suicide baiting
            </li>
            <li
              onClick={() => selectReportReason("suicide or self-harm risk")}
              className={
                reportReason &&
                reportReason.includes("suicide or self-harm risk")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              suicide or self-harm risk
            </li>
            <li
              onClick={() => selectReportReason("suspected bot")}
              className={
                reportReason && reportReason.includes("suspected bot")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              suspected bot
            </li>
            <li
              onClick={() =>
                selectReportReason("terrorism or violent extremism")
              }
              className={
                reportReason &&
                reportReason.includes("terrorism or violent extremism")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              terrorism or violent extremism
            </li>
            <li
              onClick={() => selectReportReason("tragedy cooldown period")}
              className={
                reportReason && reportReason.includes("tragedy cooldown period")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              tragedy cooldown period
            </li>
            <li
              onClick={() =>
                selectReportReason("unlabeled manipulated or deceptive media")
              }
              className={
                reportReason &&
                reportReason.includes(
                  "unlabeled manipulated or deceptive media"
                )
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              unlabeled manipulated or deceptive media
            </li>
            <li
              onClick={() =>
                selectReportReason(
                  "unlabeled synthetic or AI generated content"
                )
              }
              className={
                reportReason &&
                reportReason.includes(
                  "unlabeled synthetic or AI generated content"
                )
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              unlabeled synthetic or AI generated content
            </li>
            <li
              onClick={() => selectReportReason("violence.")}
              className={
                reportReason && reportReason.includes("violence.")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              violence
            </li>
            <li
              onClick={() => selectReportReason("witch hunting")}
              className={
                reportReason && reportReason.includes("witch hunting")
                  ? "active report_reasons"
                  : "report_reasons"
              }
            >
              witch hunting
            </li>
          </ul>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Describe (optional)</Form.Label>
              <Form.Control
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                as="textarea"
                placeholder="Please describe your issue."
                style={{ height: "92px" }}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit" onClick={submitReport}>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Share Post */}
      <Modal
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
                  <TiTickOutline /> <p className="copytext">Copied</p>
                </div>
              </>
            ) : (
              <a onClick={onChangeCopyValue}>
                <CopyToClipboard
                  onCopy={onCopy}
                  // options={{ message: "Whoa!" }}
                  text={shareLinkUrl ? shareLinkUrl : null}
                >
                  <BiCopy />
                </CopyToClipboard>
              </a>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostFoot;

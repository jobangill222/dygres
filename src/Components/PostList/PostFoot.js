import React, { useState, useContext, useEffect } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlinePlus,
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
import { ImForward } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";


const PostFoot = (props) => {
  //Props
  const { agree_count, is_agree, disagree_count, is_disagree, report_count, commentCount, is_report, postUserID, postID, setIsEditFieldOpen, isPostDisable } = props;

  //Functions to call api
  const { setUserStats, agreeUnagreePost, disAgreeUnDisAgreePost, reportPostDContext, deletePostDContext, user, postList, setPostList, setSelectedIDForPopup, setPopupType } = useContext(DContext);

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
    props.onCommentBoxOpen(isthreadopen);
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


  // Aggree Modal
  const AgreePost = async (postID) => {
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
  };

  // DisAggree Modal
  const DisAgreePost = async (postID) => {
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
    }
    else {
      toast(disagreeAxiosRes.message);
    }
  };

  // Report Modal
  const [EditReportShow, setEditreportshow] = useState(false);
  const EditReportClose = () => setEditreportshow(false);
  const EditReport = async (postID) => {
    if (isReport) {
      toast('Already reported');
    } else {
      setEditreportshow(true);
    }
  }
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const submitReport = async (e) => {
    e.preventDefault();
    console.log('post Id to be report', postID);
    console.log('reportReason', reportReason);
    console.log('reportDescription', reportDescription);
    if (!reportReason) {
      toast("please select reason.")
    } else {
      const reportAxiosRes = await reportPostDContext(postID, reportReason, reportDescription)
      console.log('reportAxiosRes', reportAxiosRes);
      if (reportAxiosRes.status === "success") {
        let newReportCount = postReportCount + 1;
        setPostReportCount(newReportCount);
        setIsReport(true);
        setEditreportshow(false);
      }
      toast(reportAxiosRes.message);
    }
  }


  // Delete Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }
  const yesDeletePost = async () => {
    const axiosDeleteRes = await deletePostDContext(postID);
    if (axiosDeleteRes.status === "success") {
      setShow(false);
      const result = postList.filter(post => post._id !== postID);
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
  }


  // Awards Modal
  const [showAwards, setAwardsClose] = useState(false);
  const AwardsClose = () => setAwardsClose(false);
  const AwardsShow = () => setAwardsClose(true);
  // BuyMore Awards
  const [showBuyAwards, setShowAwardsClose] = useState(false);
  const ShowBuyAwardsClose = () => setShowAwardsClose(false);
  const ShowAddMore = () => setShowAwardsClose(true);

  // Share Modal
  const [ReportShare, setshareShow] = useState(false);
  const shareClose = () => setshareShow(false);
  const ShareShow = () => setshareShow(true);



  // open popup by set state in selected postid which is global state and set popup stype state
  const viewPopup = async (type) => {
    setSelectedIDForPopup(postID)
    // console.log('type', type);
    setPopupType(type);
  }

  return (
    <>
      <div className="action-bar">
        <ul className="actionleftbar">
          <li>
            <div
              className={isAgree ? `active` : ""}
              onClick={() => !isPostDisable && AgreePost(postID)}><AiFillLike />
            </div>
            <div className="list-text" onClick={() => viewPopup('agree-post-user-list')} >
              <span className="number">{postAgreeCount}</span>
              Agree</div>
          </li>

          <li>
            <div className={isDisAgree ? `active` : ""}
              onClick={() => !isPostDisable && DisAgreePost(postID)}><AiFillDislike />
            </div>
            <div className="list-text" onClick={() => viewPopup('disagree-post-user-list')} >
              <span className="number">{postDisAgreeCount}</span>
              Disagree</div>
          </li>


          <li onClick={AwardsShow}>
            <FaGift />
            <span className="number">6</span>Award
          </li>




          <li>
            <div className={isthreadopen ? 'accordionhead active' : 'accordionhead'} isthreadopen={isthreadopen ? isthreadopen : ""} onClick={() => setIsthreadopen(!isthreadopen)}>
              <FaComments />
              <span className="number">{commentCount}</span>Threads
            </div>
          </li>


          <li >
            <div className={isReport ? `active` : ""} onClick={() => EditReport(postID)}><BsFillFlagFill /></div>
            <div className="list-text" onClick={() => viewPopup('report-post-user-list')}>
              <span className="number">{postReportCount}</span>
              Report</div>
          </li>


          <li>
            <Dropdown className="hoverdropdown">
              <Dropdown.Toggle
                className="p-0 bg-transparent border-0 text-lightgray"
                variant="success"
                id="dropdown-basic"
              >
                {user?._id === postUserID && <BsThreeDots />}

              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setIsEditFieldOpen(true)} >
                  <BsPencil />
                  Edit Post
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShow}>
                  <RiDeleteBin6Line />
                  Delete Post
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </li>
        </ul>
        <ul className="actionrytbar">
          <li onClick={ShareShow}>
            <ImForward />
            Share
          </li>
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
      <Modal
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
      {/* BuyAwards modal */}
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
      </Modal>
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
            <li onClick={() => setReportReason('Spam')} className={reportReason === "Spam" ? `active` : ""} >Spam</li>
            <li onClick={() => setReportReason('Harassment')} className={reportReason === "Harassment" ? `active` : ""}>Harassment</li>
            <li onClick={() => setReportReason('Hate')} className={reportReason === "Hate" ? `active` : ""}>Hate</li>
            <li onClick={() => setReportReason('Misinformation')} className={reportReason === "Misinformation" ? `active` : ""}>Misinformation</li>
            <li onClick={() => setReportReason('Self-harm')} className={reportReason === "Self-harm" ? `active` : ""}>Self-harm</li>
          </ul>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Describe (optional)</Form.Label>
              <Form.Control
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                as="textarea"
                placeholder="Describe your issue for report........."
                style={{ height: "92px" }}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit" onClick={submitReport} >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Share Post */}
      <Modal
        className="Actions-modal share-popup"
        show={ReportShare}
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
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Control placeholder="https://example.com/article/social-share-modal" />
            </Form.Group>
            <Form.Group>
              <Button type="submit">
                <BiCopy />
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostFoot;

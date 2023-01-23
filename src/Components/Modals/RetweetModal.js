import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";
import HighLight from "../HighLight"
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import moment from "moment";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export default function SingleAward(props) {

    const timeAgo = new TimeAgo('en-US')

    const { viewRetweetPopup, setViewRetweetPopup } = props;

    const { postIDForRetweet, setPostIDForRetweet, getSinglePostDetailDContext, createPostDContext, setUserStats, setIsPostState } = useContext(DContext);

    const closePopup = async () => {
        setViewRetweetPopup(false)
        setPostIDForRetweet(null)
    }

    useEffect(() => {
        postDetail();
    }, [])


    const [postDetailForRetweet, setPostDetailForRetweet] = useState(null);
    const [userVerificationLevel, setUserVerificationLevel] = useState(0);
    const postDetail = async () => {
        const axiosRes = await getSinglePostDetailDContext(postIDForRetweet);
        // console.log('axiosRes', axiosRes);
        setPostDetailForRetweet(axiosRes.list[0])

        //Userlevel verification
        if (axiosRes.list[0]?.user?.isEmailVerify === 1 && axiosRes.list[0]?.user?.isPhotoVerify === 0) {
            setUserVerificationLevel(1);
        }
        else if (axiosRes.list[0]?.user?.isPhotoVerify === 1) {
            setUserVerificationLevel(2);
        }
        else {
            setUserVerificationLevel(0);
        }

    }


    const verificationtooltip = (
        <Tooltip id="verificationtooltip">
            {userVerificationLevel === 1 ? 'Verified Email' : userVerificationLevel === 2 ? "Verified Human" : "No Verification"}
        </Tooltip>
    );



    const title = [
        "A penny for your thoughts",
        "A penny for your thoughts? Hell, how about a dime?",
        "Share your thoughts",
        "INSERT IDEA TO CONTINUE",
        "Welcome to idea central… population, you!",
        "Express thyself, mortal!",
        "Hello human, want to talk? 🙂",
        "What’s up?",
        "What’s on your mind?",
        "Welcome earthling, what do you have to share today?",
        "Ready to dygres?",
        "The worlds worst kept secret",
        "BREAKING NEWS!",
        "The world is waiting… to hear from you!",
        "I was today years old when…",
        "How are you feeling today?",
        "How’s your week going?",
        "Anything you need to talk about?",

        "Say something",
        "Unload word hoard here",
        "Time to empty the mental library?",
        "Need to talk? We’re listening.",
        "Express your thoughts",
        "Never be afraid to express yourself",
        "Unleash your brainchildren",
        "Speak up, we want to hear from you.",
        "The world is waiting…",
        "It was a dark and stormy night",
        "It was the best of times, it was the worst of times.",
        "It’s creativity time! :D",

        "How’s it going?",
        "How are you today?",
        "Let your dreams blossom",
        "Tappity tap tappity tap tap",
        "Caps lock is not actually cruise control for cool.",
        "Caps lock may be cruise control for cool, but you still have to steer",
        "Thought cabinet unlocked",
        "New thought/idea unlocked",
        "This may be the greatest/best thing you've ever written",
        "Ready for your magnum opus?",
        "Write your little heart out",
        "Share your dygressions",
        "Let’s dygres",
        "Shall we dygres?",
        "Is it sharing time already?",
        "Think brain, think!",
        "Another day, another dygression.",
        "What would you like to dygres on today?",
        "How will you be dygressing today?",
        "Great to see you again!",
        "Welcome back to another amazing idea",
        "Incredible thoughts",
        "Show us your genius",
    ];

    const placeholder = title[Math.floor(Math.random() * title.length)];



    const [createPostState, setCreatePostState] = useState("");
    //Submit post
    const submitPost = async () => {
        if (!createPostState) {
            toast("Consider entering text into the box before clicking submit.");
        } else {
            // console.log("createPostState", createPostState);
            //   alert("Post successfully.");
            try {
                const axiosRes = await createPostDContext(createPostState, postIDForRetweet);
                if (axiosRes.status === "success") {
                    setIsPostState("1");
                    // Update user stats state
                    setUserStats((previousState) => {
                        return {
                            ...previousState,
                            totalPosts: previousState.totalPosts + 1,
                        };
                    });

                    setCreatePostState("");

                    setViewRetweetPopup(false)
                    setPostIDForRetweet(null)

                } else {
                    toast(axiosRes.message);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };



    return (
        <>
            {console.log('postDetailForRetweet,postDetailForRetweet', postDetailForRetweet)}
            {/* Aggree modal */}
            <Modal className="Actions-modal" show={viewRetweetPopup} onHide={closePopup} centered >

                <Modal.Header closeButton>
                    <Modal.Title>
                        Amplify</Modal.Title>
                </Modal.Header>
                <Modal.Body className="retweetmodal">
                    <div className="digital-feeds feed-type">

                        <div className="user-preview">
                            <div className="Description-bar">
                                <Form>
                                    <Form.Group className='feedtype-textarea' controlId="formBasicEmail">
                                        <Form.Control type="text" style={{ height: '110px' }}
                                            as="textarea"
                                            rows={6}
                                            maxLength={420}
                                            placeholder={placeholder}
                                            name="content"
                                            value={createPostState}
                                            max="420"
                                            onChange={(e) => {
                                                setCreatePostState(e.target.value);
                                            }} />
                                    </Form.Group>
                                </Form>
                                {/* <p className="word-note">Character {createPostState.length}/420</p> */}
                                <p className="word-note">{420 - createPostState.length}</p>

                            </div>
                        </div>
                        <div className="digital-feeds diffrentiate-bar">
                            <div className="user-detail-bar">
                                <div className="detailleft">
                                    <div className="userleftside">
                                        <div className="avatar-img active">
                                            <img src={postDetailForRetweet?.user?.profileImage ? postDetailForRetweet?.user?.profileImage : `/images/user.png`} alt="user-img" />
                                        </div>
                                        <div className="user-detail">
                                            <div className="follow-bar">
                                                <h4 className="text-secondry">
                                                    {postDetailForRetweet?.user?.name ? postDetailForRetweet?.user.name : postDetailForRetweet?.user?.username}
                                                </h4>
                                            </div>
                                            <div className="user-availbility">
                                                <h6 className="text-lightgray">@{postDetailForRetweet?.user?.username}</h6>
                                                <h5 className="text-lightgray greentime">{timeAgo.format(moment(postDetailForRetweet?.created_at)._d.getTime())}</h5>
                                            </div>
                                            {/* {console.log('userVerificationLeveluserVerificationLevel', userVerificationLevel)} */}
                                            <OverlayTrigger placement="top" overlay={verificationtooltip}>
                                                <div className="levelbar text-darkwhite level1">
                                                    Level {userVerificationLevel}
                                                    {/* <h6 className="level1-circle">
                                                    <span className="text-white lvlstar">{userVerificationLevel}</span>
                                                </h6> */}
                                                </div>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-preview">
                                <div className="Description-bar">
                                    <p>
                                        {/* {postDetailForRetweet?.content} */}
                                        <HighLight content={postDetailForRetweet?.content ? postDetailForRetweet?.content : " "} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="text-end m-0">
                        <Button className="outline-primary text-white mx-4" onClick={closePopup}>Cancel</Button>
                        <Button className="bg-primary text-white" onClick={submitPost}>Post</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

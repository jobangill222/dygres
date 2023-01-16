import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { DContext } from "../Context/DContext";

const WhatsMind = (props) => {
  //To change state when post is posted
  const { setIsPostState } = props;

  //Set create post state
  const [createPostState, setCreatePostState] = useState("");

  // Function to all api
  const { createPostDContext, setUserStats } = useContext(DContext);

  //Submit post
  const submitPost = async () => {
    if (!createPostState) {
      toast("Post cannot be empty.");
    } else {
      // console.log("createPostState", createPostState);
      //   alert("Post successfully.");
      try {
        const parentPostID = null;
        const axiosRes = await createPostDContext(createPostState, parentPostID);
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
        } else {
          toast(axiosRes.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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

  return (
    <>
      <div className="Whatsmind-bar">
        <Form>
          <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={6}
              maxLength={420}
              placeholder={placeholder}
              name="content"
              value={createPostState}
              max="420"
              onChange={(e) => {
                setCreatePostState(e.target.value);
              }}
            />
            <p className="word-note">Character {createPostState.length}/420</p>
            <div className="text-end">
              <Button className="bg-primary text-white" onClick={submitPost}>
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default WhatsMind;

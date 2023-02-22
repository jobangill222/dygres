import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { DContext } from "../Context/DContext";
import { MentionsInput, Mention } from 'react-mentions';

const WhatsMind = (props) => {
  //To change state when post is posted
  const { setIsPostState, placeholderState } = props;

  //Set create post state
  const [createPostState, setCreatePostState] = useState("");

  // Function to all api
  const { createPostDContext, setUserStats, suggestionWhilePostingDContext } = useContext(DContext);

  //Submit post
  const submitPost = async () => {
    if (!createPostState) {
      toast("Hmm… you might consider entering some text before clicking submit.");
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



  //Suggestion of user
  const fetchSuggestionList = async (trigger, query, callback) => {
    // Call your API to fetch matching items based on the trigger and query
    if (trigger === '@') {
      const results = await suggestionWhilePostingDContext(query && query);
      const newArray = results.list.map(item => {
        return {
          id: item._id,
          profileImage: item?.profileImage ? item.profileImage : '/images/user.png',
          display: item.username
        };
      });
      callback(newArray);

    } else if (trigger === '#') {
      const results = await suggestionWhilePostingDContext("#" + query);
      const newArray = results.list.map(item => {
        return {
          id: item._id,
          display: item.name
        };
      });
      callback(newArray);
    }
  };


  const handleUserSuggestion = (id, display) => {
    setCreatePostState(createPostState.replace(/@[^\s]*\s?$/, `@${display} `));
  };
  const handleHashSuggestion = (id, display) => {
    setCreatePostState(createPostState.replace(/#[^\s]*\s?$/, `${display} `));
  };


  return (
    <>
      <div className="Whatsmind-bar">
        <Form>
          <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">

            <MentionsInput
              className='whatsmind-inputbar'
              as="textarea"
              rows={6}
              maxLength={420}
              placeholder={placeholderState}
              name="content"
              value={createPostState}
              max="420"
              onChange={(e) => {
                setCreatePostState(e.target.value)
              }}
            >
              <Mention
                trigger='@'
                data={(query, callback) => fetchSuggestionList('@', query, callback)}
                onAdd={handleUserSuggestion}
                displayTransform={(id, display) => `@${display + ' '}`}
                renderSuggestion={(
                  suggestion,
                  search,
                  highlightedDisplay,
                  index,
                  focused
                ) => (
                  <div className={`user-suggestion ${focused ? 'focused' : ''}`}>
                    <img src={suggestion.profileImage} />
                    <div className="user-suggestion-details">
                      <div className="user-suggestion-name">{highlightedDisplay}</div>
                    </div>
                  </div>
                )}
              />


              <Mention
                trigger='#'
                data={(query, callback) => fetchSuggestionList('#', query, callback)}
                onAdd={handleHashSuggestion}
                displayTransform={(id, display) => `#${display + ' '}`}
                renderSuggestion={(
                  suggestion,
                  search,
                  highlightedDisplay,
                  index,
                  focused
                ) => (
                  <div className={`user-suggestion ${focused ? 'focused' : ''}`}>
                    <div className="user-suggestion-details">
                      <div className="user-suggestion-name">{highlightedDisplay}</div>
                    </div>
                  </div>
                )}
              />

            </MentionsInput>




            {/* <Form.Control
              as="textarea"
              rows={6}
              maxLength={420}
              placeholder={placeholderState}
              name="content"
              value={createPostState}
              max="420"
              onChange={(e) => {
                setCreatePostState(e.target.value);
              }}
            /> */}
            {/* <p className="word-note">Character {createPostState.length}/420</p> */}
            <p className="word-note">{420 - createPostState.length}</p>

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

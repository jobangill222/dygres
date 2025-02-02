import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { DContext } from "../Context/DContext";
// import { MentionsInput, Mention } from "react-mentions";
import { useLocation, useNavigate } from "react-router-dom";

import Editor from "./TextEditor/Editor";

const WhatsMind = (props) => {
  //To change state when post is posted
  const { placeholderState, setActiveTabState } = props;
  const { setIsPostState } = useContext(DContext);

  //Set create post state
  const [createPostState, setCreatePostState] = useState("");

  // Function to all api
  const {
    createPostDContext,
    setUserStats,
    suggestionWhilePostingDContext,
    isDummyUser,
  } = useContext(DContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const text = searchParams.get("text");

  useEffect(() => {
    if (text) {
      setCreatePostState(text);
    }
  }, [text]);

  const navigate = useNavigate();
  //Submit post
  const submitPost = async () => {
    if (isDummyUser()) {
      console.log("please login first");
      navigate("/login");
    } else {
      if (!createPostState.replace(/<[^>]*>/g, '')) {
        toast(
          "Hmm… you might consider entering some text before clicking submit."
        );
      } else {
        // console.log("createPostState", createPostState);
        //   alert("Post successfully.");
        try {
          const parentPostID = null;
          const axiosRes = await createPostDContext(
            createPostState,
            parentPostID
          );
          if (axiosRes.status === "success") {
            setIsPostState(true);
            // Update user stats state
            setUserStats((previousState) => {
              return {
                ...previousState,
                totalPosts: previousState.totalPosts + 1,
              };
            });

            setCreatePostState("");

            // setActiveTabState("Global");

            searchParams.delete("text");
            const newSearch = searchParams.toString();

            navigate("/new");
          } else {
            toast(axiosRes.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  //Suggestion of user
  const fetchSuggestionList = async (trigger, query, callback) => {
    // Call your API to fetch matching items based on the trigger and query
    if (trigger === "@") {
      const results = await suggestionWhilePostingDContext(query && query);
      const newArray = results.list.map((item) => {
        return {
          id: item._id,
          profileImage: item?.profileImage
            ? item.profileImage
            : "/images/user.png",
          display: item.username,
        };
      });
      callback(newArray);
    } else if (trigger === "#") {
      const results = await suggestionWhilePostingDContext("#" + query);
      const newArray = results.list.map((item) => {
        return {
          id: item._id,
          display: item.name,
        };
      });
      callback(newArray);
    }
  };
  // console.log(createPostState);

  return (
    <>
      <div className="Whatsmind-bar maineditor">
        <Editor
          value={createPostState}
          setValue={setCreatePostState}
          userDropDown="create_post_user_dropdown"
          hashtagDropDown="create_post_hashtag_dropdown"
          placeholderState={placeholderState}
          className={createPostState ? "active" : ""}
        />
        <div className="text-end whtsmind-btn-space">
          <Button className="bg-primary text-white" onClick={submitPost}>
            dygres
          </Button>
        </div>

        {/* <Form>
          <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
            <MentionsInput
              className="whatsmind-inputbar"
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
            >
              <Mention
                trigger="@"
                data={(query, callback) =>
                  fetchSuggestionList("@", query, callback)
                }
                onAdd={handleUserSuggestion}
                displayTransform={(id, display) => `@${display + " "}`}
                renderSuggestion={(
                  suggestion,
                  search,
                  highlightedDisplay,
                  index,
                  focused
                ) => (
                  <div
                    className={`user-suggestion ${focused ? "focused" : ""}`}
                  >
                    <img src={suggestion.profileImage} />
                    <div className="user-suggestion-details">
                      <div className="user-suggestion-name">
                        {highlightedDisplay}
                      </div>
                    </div>
                  </div>
                )}
              />

              <Mention
                trigger="#"
                data={(query, callback) =>
                  fetchSuggestionList("#", query, callback)
                }
                onAdd={handleHashSuggestion}
                displayTransform={(id, display) => `#${display + " "}`}
                renderSuggestion={(
                  suggestion,
                  search,
                  highlightedDisplay,
                  index,
                  focused
                ) => (
                  <div
                    className={`user-suggestion ${focused ? "focused" : ""}`}
                  >
                    <div className="user-suggestion-details">
                      <div className="user-suggestion-name">
                        {highlightedDisplay}
                      </div>
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
        {/* <p className="word-note">{420 - createPostState.length}</p> */}
        {/* <div className="text-end">
              <Button className="bg-primary text-white" onClick={submitPost}>
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>  */}
        {/* } */}
      </div>
    </>
  );
};

export default WhatsMind;

import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { DContext } from "../Context/DContext";
// import { MentionsInput, Mention } from "react-mentions";
import { useLocation, useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";

import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Mention from "@tiptap/extension-mention";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";

import { MenuBar } from "./TextEditor/Menubar/Menubar";
import suggestion from "./TextEditor/suggestion";
import FormBox from "./TextEditor/FormBox";

const WhatsMind = (props) => {
  //To change state when post is posted
  const { setIsPostState, placeholderState, setActiveTabState } = props;

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
      if (!createPostState) {
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
            setActiveTabState("Global");

            searchParams.delete("text");
            const newSearch = searchParams.toString();

            navigate({
              pathname: location.pathname,
              search: newSearch,
            });
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

  const handleUserSuggestion = (id, display) => {
    setCreatePostState(createPostState.replace(/@[^\s]*\s?$/, `@${display} `));
  };
  const handleHashSuggestion = (id, display) => {
    setCreatePostState(createPostState.replace(/#[^\s]*\s?$/, `${display} `));
  };

  // text editor
  const limit = 280;

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      // console.log(editor.getJSON());
    },

    extensions: [
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      // Place it here
      Placeholder.configure({
        placeholder: "Write something ….  ",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Mention.configure({
        renderLabel({ options, node }) {
          console.log(
            `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
            "renderlabel"
          );
        },
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),

      CharacterCount.configure({
        limit,
      }),
    ],
    // content: `
    //   <p>Write your content here </p>
    // `,
  });

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  const users = [
    {
      id: "walter",
      display: "Walter White",
    },

    {
      id: "jesse",
      display: "Jesse Pinkman",
    },
    {
      id: "gus",
      display: 'Gustavo "Gus" Fring',
    },
    {
      id: "saul",
      display: "Saul Goodman",
    },
    {
      id: "hank",
      display: "Hank Schrader",
    },
    {
      id: "skyler",
      display: "Skyler White",
    },
    {
      id: "mike",
      display: "Mike Ehrmantraut",
    },
    {
      id: "lydia",
      display: "Lydìã Rôdarté-Qüayle",
    },
  ];

  const [mentionsValue, setMentionsValue] = useState("");

  const handleMentionsChange = (event, newValue) => {
    setMentionsValue(newValue);
  };

  const handleAddMention = (mention) => {
    console.log("Added a new mention:", mention);
  };
  return (
    <>
      <div className="Whatsmind-bar">
        <FormBox
          value={mentionsValue}
          data={users}
          onChange={handleMentionsChange}
          onAdd={handleAddMention}
        />
        {/* <MenuBar editor={editor} />
        <div
          className="hashtag-popup-container"
          style={{ display: "none" }}
        ></div>
        <EditorContent editor={editor} />

        {editor && (
          <div>
            <div
              className={`character-count ${
                editor.storage.characterCount.characters() === limit
                  ? "character-count--warning"
                  : ""
              }`}
            >
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                className="character-count__graph"
              >
                <circle r="10" cx="10" cy="10" fill="#e9ecef" />
                <circle
                  r="5"
                  cx="10"
                  cy="10"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                  transform="rotate(-90) translate(-20)"
                />
                <circle r="6" cx="10" cy="10" fill="white" />
              </svg>

              <div className="character-count__text">
                {editor.storage.characterCount.characters()}/{limit} characters
              </div>
            </div>
            <div className="text-end">
              <Button className="bg-primary text-white" onClick={submitPost}>
                Submit
              </Button>
            </div>
          </div>
        )} */}
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

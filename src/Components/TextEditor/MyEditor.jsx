import React, { useState, useRef, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { modules } from "./QuillModules";
import { DContext } from "../../Context/DContext";
import { handleDropdown } from "../../helper/editorhelper";

const userList = ["User1", "User2", "User3"];
const tagList = ["Tag1", "Tag2", "Tag3"];

function MyEditor({ value, setValue }) {
  // const [value, setValue] = useState("");
  const { suggestionWhilePostingDContext } = useContext(DContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userLists, setUserList] = useState(null);
  const [hashTag, setHashTagList] = useState(null);
  const [query, setQuery] = useState("");

  const quillInstanceRef = useRef(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    insertUsername(user);
    const userDropdown = document.getElementById("user-dropdown");
    if (userDropdown) {
      userDropdown.style.display = "none";
    }

    const tagDropdown = document.getElementById("tag-dropdown");
    if (tagDropdown) {
      tagDropdown.style.display = "none";
    }
  };

  const userListData = async (query) => {
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
    setUserList(newArray);
  };

  const hashtagData = async (query) => {
    const results = await suggestionWhilePostingDContext("#" + query);
    console.log(results, "results");
    const newArray = results.list.map((item) => {
      return {
        id: item._id,
        display: item.name,
      };
    });
    setHashTagList(newArray);
  };

  //
  const insertUsername = (username) => {
    const quillRef = quillInstanceRef.current.getEditor();
    const cursorPosition = quillRef.getSelection(true)?.index;

    quillRef.insertText(cursorPosition, `${username}`);
  };

  useEffect(() => {
    console.log("xyx");
    const editor = quillInstanceRef.current.getEditor();

    editor.on("text-change", () => {
      setTimeout(() => {
        const currentSelection = editor.getSelection(true);
        const currentCursorPosition = currentSelection
          ? currentSelection.index
          : null;

        const currentLineText = editor.getLine(currentCursorPosition);
        let lastElement = currentLineText[0]?.children?.head?.text;

        const lastWord = lastElement.split(" ").pop();
        const queryValue = lastElement.slice(-3);

        console.log(
          lastWord,
          "last world",
          lastWord.startsWith("#"),
          "start with #"
        );

        if (lastWord.startsWith("@")) {
          // Show the select dropdown at the cursor position
          const dropdown = document.getElementById("user-dropdown");
          if (queryValue.length >= 1 && queryValue.length <= 3) {
            setQuery(queryValue);

            userListData(query);
            console.log(userLists, "user lists");
            console.log(query, "qer");
            const { top, left } = editor.getBounds(currentCursorPosition);
            dropdown.style.top = `${top + 20}px`;
            dropdown.style.left = `${left}px`;
            dropdown.style.display = "block";
          }
        }
        console.log("1");

        if (lastWord.startsWith("#")) {
          console.log("2");
          // Show the select dropdown at the cursor position
          const dropdown = document.getElementById("tag-dropdown");
          if (queryValue.length >= 1 && queryValue.length <= 3) {
            setQuery(queryValue);

            hashtagData(queryValue);

            const { top, left } = editor.getBounds(currentCursorPosition);
            dropdown.style.top = `${top + 20}px`;
            dropdown.style.left = `${left}px`;
            dropdown.style.display = "block";
            dropdown.style.fontStyle = "bold";
          }
        }
      }, 0);
    });
  }, [value]);

  return (
    <>
      <div class="editor">
        <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={setValue}
          ref={quillInstanceRef}
        />
        <div id="user-dropdown" style={{ display: "none" }}>
          {/* Render the user dropdown here */}
          {userLists?.map((user, index) => (
            <div key={index} onClick={() => handleSelectUser(user.display)}>
              {user.display}
            </div>
          ))}
        </div>
        <div id="tag-dropdown" style={{ display: "none" }}>
          {/* Render the user dropdown here */}
          {hashTag?.map((user, index) => (
            <div key={index} onClick={() => handleSelectUser(user.display)}>
              {user.display}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyEditor;

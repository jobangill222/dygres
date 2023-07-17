import React, { useState, useRef, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { modules } from "./QuillModules";
import { DContext } from "../../Context/DContext";
import { debounce, searchQuery, modifyString } from "../../helper/editorhelper";

function Editor({ value, setValue }) {
  const { suggestionWhilePostingDContext } = useContext(DContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userLists, setUserList] = useState([]);
  const [hashTag, setHashTagList] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cachedUserList, setCachedUserList] = useState({});
  const [cachedHashTagList, setCachedHashTagList] = useState({});

  const quillInstanceRef = useRef(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    if (user) {
      insertUsername(user);
    }
    const userDropdown = document.getElementById("user-dropdown");

    if (userDropdown) {
      userDropdown.style.display = "none";
    }

    const tagDropdown = document.getElementById("tag-dropdown");

    if (tagDropdown) {
      tagDropdown.style.display = "none";
    }
  };

  const insertUsername = (username) => {
    const quillRef = quillInstanceRef.current.getEditor();
    const cursorPosition = quillRef.getSelection(true)?.index + 1;

    const currentLine = quillRef.getText();

    let split = currentLine.split(/\s+/).length;

    const startIndex = cursorPosition - query.length + (split > 1 ? 0 : 0);
    const endIndex = query.length;

    quillRef.deleteText(startIndex, endIndex);

    quillRef.insertText(startIndex, split > 1 && modifyString(username), {
      username: true,
    });
  };

  useEffect(() => {
    const editor = quillInstanceRef.current.getEditor();

    editor.on("text-change", () => {
      const currentSelection = editor.getSelection(true);
      const currentCursorPosition = currentSelection
        ? currentSelection.index
        : null;

      const currentLineText = editor.getLine(currentCursorPosition);
      let lastElement = currentLineText[0]?.children?.head?.text;

      const lastWord =
        lastElement.split(" ").length >= 2
          ? lastElement.split(" ").pop()
          : lastElement;

      if (lastWord.length > 1 && lastWord.startsWith("@")) {
        const dropdown = document.getElementById("user-dropdown");
        let withoutAt = lastWord.slice(1);
        setQuery(lastWord);
        debounce(
          searchQuery(
            "@",
            suggestionWhilePostingDContext,
            withoutAt,
            setLoading,
            setCachedUserList,
            cachedUserList,
            setUserList
          ),
          500
        );

        const { top, left } = editor.getBounds(currentCursorPosition);

        dropdown.style.top = `${top + 20}px`;
        dropdown.style.left = `${left}px`;
        dropdown.style.display = userLists.length === 0 ? "none" : "block";
      } else {
        let userDropdown = document.getElementById("user-dropdown");
        if (userDropdown) {
          userDropdown.style.display = "none";
        }
      }

      if (lastWord.length > 1 && lastWord.startsWith("#")) {
        const dropdown = document.getElementById("tag-dropdown");

        setQuery(lastWord);
        // debounceHashtagData(lastWord);
        debounce(
          searchQuery(
            "#",
            suggestionWhilePostingDContext,
            lastWord,
            setLoading,
            setCachedHashTagList,
            cachedHashTagList,
            setHashTagList
          ),
          500
        );

        setQuery(lastWord);

        const { top, left } = editor.getBounds(currentCursorPosition);

        dropdown.style.top = `${top + 20}px`;
        dropdown.style.left = `${left}px`;
        dropdown.style.display = hashTag.length === 0 ? "none" : "block";
        dropdown.style.fontStyle = "bold";
      } else {
        const tagDropdown = document.getElementById("tag-dropdown");
        if (tagDropdown) {
          tagDropdown.style.display = "none";
        }
      }
    });

    // console.log(userLists, "userLists");
    // console.log(hashTag, "hashtags");
  }, [value]);

  // Debounce function to delay API calls

  return (
    <>
      <div className="editor">
        <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={setValue}
          ref={quillInstanceRef}
        />
        <div id="user-dropdown" style={{ display: "none" }}>
          {loading ? (
            <div>
              <p>Loading....</p>
            </div>
          ) : (
            userLists.map((user, index) => (
              <div key={index} onClick={() => handleSelectUser(user.display)}>
                {user.display ? user?.display : "Not found "}
              </div>
            ))
          )}
        </div>
        <div id="tag-dropdown" style={{ display: "none" }}>
          {loading ? (
            <div>
              <p>Loading....</p>
            </div>
          ) : (
            hashTag.map((tag, index) => (
              <div key={index} onClick={() => handleSelectUser(tag.display)}>
                {tag.display ? tag.display : "not found"}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Editor;

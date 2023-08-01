import React, { useState, useEffect, useContext } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import "emoji-mart/css/emoji-mart.css";
import quillEmoji from "quill-emoji";
import { DContext } from "../../Context/DContext";
import { debounce, searchQuery, modifyString } from "../../helper/editorhelper";
// modulesSS.js

Quill.register(
  {
    "formats/emoji": quillEmoji.EmojiBlot,
    "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
    "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
    "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
  },
  true
);
 
function Editor({
  value,
  setValue,
  userDropDown,
  hashtagDropDown,
  placeholderState,
}) {
  const { suggestionWhilePostingDContext } = useContext(DContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLists, setUserList] = useState([]);
  const [hashTag, setHashTagList] = useState([]);
  const [query, setQuery] = useState("");
  const [cachedUserList, setCachedUserList] = useState({});
  const [cachedHashTagList, setCachedHashTagList] = useState({});
  const [showUserDropDown, setShowUserDropDown] = useState(false);
  const [showTagDropDown, setShowTagDropDown] = useState(false);
  const [contentLength, setContentLength] = useState(0);
  
  const quillInstanceRef = React.useRef();

  const handleSelectDropDownOption = (user) => {
    setSelectedUser(user);
    if (user) {
      insertUsername(user);
    }
    setTimeout(() => {
      setShowUserDropDown(false);
      setShowTagDropDown(false);
    }, 100);
    // Clear the selected user state to prevent showing the dropdowns again
    setSelectedUser(null);
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
      if (!lastElement) {
        setShowUserDropDown(false);
        setShowTagDropDown(false);
      } else {
        const words = lastElement.split(/\s+/);
        const lastWord = words[words.length - 1]; // Get the last word
        let lastChar = lastElement.slice(-1);
        if (
          // lastWord.length > 1 &&
          lastChar !== " " &&
          lastWord.startsWith("@")
        ) {
          const dropdown = document.getElementById(userDropDown);
          let withoutAt = lastWord.slice(1);
          setQuery(lastWord);
          debounce(
            searchQuery(
              "@",
              suggestionWhilePostingDContext,
              withoutAt,
              setCachedUserList,
              cachedUserList,
              setUserList
            ).then((res) => {
              const { top, left } = editor.getBounds(currentCursorPosition);
              setShowUserDropDown(
                res && res.length > 0 && words.length > 0 && lastChar !== " "
              );
              dropdown.style.top = `${top + 100}px`;
              dropdown.style.left = `${left}px`;
            }),
            500
          );
        } else if (
          // lastWord.length > 1 &&
          lastChar !== " " &&
          lastWord.startsWith("#")
        ) {
          const dropdown = document.getElementById(hashtagDropDown);
          setQuery(lastWord);
          // debounceHashtagData(lastWord);
          debounce(
            searchQuery(
              "#",
              suggestionWhilePostingDContext,
              lastWord,
              setCachedHashTagList,
              cachedHashTagList,
              setHashTagList
            ).then((res) => {
              const { top, left } = editor.getBounds(currentCursorPosition);
              console.log(
                res && res.length > 0 && words.length > 0 && lastChar !== " ",
                "Test Drop Dwon"
              );
              setShowTagDropDown(
                res && res.length > 0 && words.length > 0 && lastChar !== " "
              );
              dropdown.style.top = `${top + 100}px`;
              dropdown.style.left = `${left} px`;
              dropdown.style.fontStyle = "bold";
            }),
            500
          );
        } else {
          setShowUserDropDown(false);
          setShowTagDropDown(false);
        }
      }
      console.log(editor.getLength() - 1, "Length 1");
      // limit on content editor
      if (editor.getLength() - 1 > 420) {
        editor.deleteText(420, editor.getLength());
        // console.log("Limit extented");
      }
    });
    const quillElement = editor.container;
    if (quillElement && editor.getLength() > 1) {
      quillElement.classList.add("quillactive");
    }
    return () => {
      editor.off("text-change");
    };
  }, [value]);
  // Set word count
  const handleTextChange = (content, delta, source, editor) => {
    let count = editor.getLength() - 1;
    // console.log('count' , count)
    setContentLength(count);
    setValue(content);
  };

  //Restrict paster image
  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    if (clipboardData) {
      const types = clipboardData.types || [];
      if (types.includes("Files")) {
        e.preventDefault(); // Prevent the default paste behavior
      }
    }
  };


  const modulesR = {
    toolbar: [
      [{ header: [4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      // [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [
        "link",
        // "image"
      ],
      [{ list: "ordered" }, { list: "bullet" }],

      ["user-list"], // Custom option for user list
      ["emoji"],
      ["clean"],
    ],

    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "link",
    "list",
    "user-list",
    "emoji",
    "clean",
  ];
  return (
    <> 
      <div className="editor">
        <ReactQuill
          className={value.replace(/<[^>]*>/g, "") ? "quillactive" : ""}
          theme="snow" 
          modules={modulesR}
          formats={formats}
          value={value}
          onChange={handleTextChange}
          ref={quillInstanceRef}
          placeholder={placeholderState}
          onPaste={handlePaste} 
        />
        <div
          id={userDropDown}
          style={{ display: showUserDropDown ? "block" : "none" }}
        > 
          {userLists.map((user, index) => (
            <div key={index} onClick={() => handleSelectDropDownOption(user.display)}>
              {user.display ? user?.display : "Not found "}
            </div>
          ))} 
        </div>
        <div
          id={hashtagDropDown}
          style={{ display: showTagDropDown ? "block" : "none" }}
        > 
          {hashTag.map((tag, index) => (
            <div key={index} onClick={() => handleSelectDropDownOption(tag.display)}>
              {tag.display ? tag.display : "not found"}
            </div>
          ))}
        </div>
      </div>
​
      <p className="counter-text">{420 - contentLength}</p>
    </>
  );
}
export default Editor;










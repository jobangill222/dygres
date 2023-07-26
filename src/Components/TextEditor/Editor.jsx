import React, { useState, useRef, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { modules } from "./QuillModules";
import { DContext } from "../../Context/DContext";
import { debounce, searchQuery, modifyString } from "../../helper/editorhelper";

function Editor({ value, setValue , userDropDown , hashtagDropDown  , placeholderState }) { 

  const { suggestionWhilePostingDContext } = useContext(DContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userLists, setUserList] = useState([]);
  const [hashTag, setHashTagList] = useState([]);
  const [query, setQuery] = useState("");
  const [cachedUserList, setCachedUserList] = useState({});
  const [cachedHashTagList, setCachedHashTagList] = useState({});
  const [showUserDropDown, setShowUserDropDown] = useState(false);
  const [showTagDropDown, setShowTagDropDown] = useState(false);

  const quillInstanceRef = useRef(null);

  const handleSelectUser = (user) => {
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

      if(!lastElement){
        setShowUserDropDown(false)
        setShowTagDropDown(false)
      }else{
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
      
    });
    return () => {
      editor.off("text-change");
    };
  }, [value]);



  const handleTextChange = (content, delta, source, editor) => {

    // console.log('content.length' , content.length)

    // Check if the text length exceeds the limit (420 characters)
    if (content.length > 420) {
      // Truncate the content to the first 420 characters
      content = content.slice(0, 420);
      // Update the editor's content with the truncated text
      editor.setContents(editor.clipboard.convert(content));
    }
  
    // Update the state with the new value
    setValue(content);
  };


  return (
    <>
      <div className="editor">
        <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={handleTextChange}
          ref={quillInstanceRef}
          placeholder={placeholderState}
        />
        <div
          id={userDropDown}
          style={{ display: showUserDropDown ? "block" : "none" }}
        >
          {/* {loading ? (
            <div>
              <p>Loading....</p>
            </div>
          ) : ( */}
          {userLists.map((user, index) => (
            <div key={index} onClick={() => handleSelectUser(user.display)}>
              {user.display ? user?.display : "Not found "}
            </div>
          ))}
          {/* )} */}
        </div>
        <div
          id={hashtagDropDown}
          style={{ display: showTagDropDown ? "block" : "none" }}
        >
          {/* {loading ? (
            <div>
              <p>Loading....</p>
            </div>
          ) : ( */}
          {hashTag.map((tag, index) => (
            <div key={index} onClick={() => handleSelectUser(tag.display)}>
              {tag.display ? tag.display : "not found"}
            </div>
          ))}
          
        </div>
      </div>

      {/* <p>{420 - value.replace(/(<([^>]+)>)/gi, "").length}</p> */}

    </>
  );
}

export default Editor;

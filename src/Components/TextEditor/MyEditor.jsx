import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import { modules } from "./QuillModules";
const userList = ["User1", "User2", "User3"];
const tagList = ["Tag1", "Tag2", "Tag3"];

function MyEditor({ submitPost }) {
  const [value, setValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const quillInstanceRef = useRef(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    insertUsername(user);
  };
  console.log(value, "value");
  //
  const insertUsername = (username) => {
    const quillRef = quillInstanceRef.current.getEditor();
    const cursorPosition = quillRef.getSelection(true)?.index;

    quillRef.insertText(cursorPosition, `${username}`);
  };

  useEffect(() => {
    const editor = quillInstanceRef.current.getEditor();

    editor.on("text-change", () => {
      setTimeout(() => {
        const currentSelection = editor.getSelection(true);
        const currentCursorPosition = currentSelection
          ? currentSelection.index
          : null;

        const currentLineText = editor.getLine(currentCursorPosition);
        let lastElement = currentLineText[0]?.children?.head?.text;
        const lastChar = lastElement.at(-1);

        if (lastChar === "@") {
          // Show the select dropdown at the cursor position
          const dropdown = document.getElementById("user-dropdown");
          if (dropdown) {
            const { top, left } = editor.getBounds(currentCursorPosition);
            dropdown.style.top = `${top + 20}px`;
            dropdown.style.left = `${left}px`;
            dropdown.style.display = "block";
          }
        } else {
          // Hide the select dropdown
          const dropdown = document.getElementById("user-dropdown");
          if (dropdown) {
            dropdown.style.display = "none";
          }
        }

        if (lastChar === "#") {
          // Show the select dropdown at the cursor position
          const dropdown = document.getElementById("tag-dropdown");
          if (dropdown) {
            const { top, left } = editor.getBounds(currentCursorPosition);
            dropdown.style.top = `${top + 20}px`;
            dropdown.style.left = `${left}px`;
            dropdown.style.display = "block";
          }
        } else {
          // Hide the select dropdown
          const dropdown = document.getElementById("tag-dropdown");
          if (dropdown) {
            dropdown.style.display = "none";
          }
        }
      }, 0);
    });
  }, []);

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
          {userList.map((user) => (
            <div key={user} onClick={() => handleSelectUser(user)}>
              {user}
            </div>
          ))}
        </div>
        <div id="tag-dropdown" style={{ display: "none" }}>
          {/* Render the user dropdown here */}
          {tagList.map((user) => (
            <div key={user} onClick={() => handleSelectUser(user)}>
              {user}
            </div>
          ))}
        </div>
      </div>
      <div className="text-end">
        <Button className="bg-primary text-white" onClick={submitPost}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default MyEditor;

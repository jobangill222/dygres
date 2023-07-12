import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MentionsInput, Mention } from "react-mentions";

const FormBox = ({ value, data, onChange, onAdd }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    onChange(newEditorState);
  };
  const neverMatchingRegex = /($a)/;

  let dataEmo = [
    {
      tag: "code",
      name: "code",
    },
    {
      tag: "dev",
      name: "dev",
    },
    {
      tag: "html",
      name: "html",
    },
    {
      tag: "css",
      name: "css",
    },
  ];

  const queryEmojis = (query, callback) => {
    if (query.length === 0) return;

    const matches = dataEmo
      .filter((tag) => {
        return tag.name.indexOf(query.toLowerCase()) > -1;
      })
      .slice(0, 10);
    return matches.map(({ tag }) => ({ id: `${tag}` }));
  };

  return (
    <div>
      <MentionsInput
        value={value}
        onChange={onChange}
        placeholder={"Press '#' for hashtag, mention people using '@'"}
      >
        <Mention
          trigger="@"
          displayTransform={(username) => `@${username}`}
          markup="@__id__"
          data={data}
          regex={/@(\S+)/}
          style={{ backgroundColor: "lightblue" }}
          appendSpaceOnAdd
        />
        <Mention
          trigger="#"
          markup="#__id__"
          data={queryEmojis}
          regex={neverMatchingRegex}
          style={{ backgroundColor: "lightyellow" }}
          appendSpaceOnAdd
        />
      </MentionsInput>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
};

export default FormBox;

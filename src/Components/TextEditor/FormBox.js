import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MentionsInput, Mention } from "react-mentions";
import styles from "./styles";
const FormBox = ({ data, value, onChange, onAdd }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const [value, setValue] = useState("");

  // const handleEditorChange = (newEditorState) => {
  //   setEditorState(newEditorState);
  //   setValue(convertToRaw(newEditorState.getCurrentContent()).blocks[0].text);
  // };

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
        style={styles}
        placeholder={"Press '#' for hashtag, mention people using '@'"}
        // value={editorState}
        // onChange={handleEditorChange}
        allowSpaceInQuery={true}
      >
        <Mention
          trigger="@"
          displayTransform={(username) => `@${username}`}
          markup="@__id__"
          data={data}
          regex={/@(\S+)/}
          style={styles}
          appendSpaceOnAdd
        />
        <Mention
          trigger="#"
          displayTransform={(username) => `#${username}`}
          markup="#__id__"
          regex={neverMatchingRegex}
          data={queryEmojis}
          appendSpaceOnAdd
        />
      </MentionsInput>
    </div>
  );
};

export default FormBox;

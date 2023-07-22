import React from "react";
import ShowPostText from "../TextEditor/ShowPostAsPlainText"

const PostContent = ({ postContent }) => {

  return (
    <>
      <ShowPostText postContent={postContent ? postContent : "loading"} />
    </>
  );
};

export default PostContent;

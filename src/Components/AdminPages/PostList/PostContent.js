import React from "react";
import HighLight from "../HighLight";
const PostContent = ({ postContent }) => {

  return (
    <>
      <div className="Description-bar">
        <p>
          <HighLight content={postContent} />
        </p>
      </div>

    </>
  );
};

export default PostContent;

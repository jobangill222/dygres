import React from "react";
// import { highlightName } from "../../helper/highlightName";
import HighLight from "../HighLight";

const PostContent = ({ postContent }) => {

  // console.log('postContentpostContent', postContent)
  // const finalPostContent = highlightName(postContent);

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

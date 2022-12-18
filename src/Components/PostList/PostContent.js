import React from "react";
import { highlightName } from "../../helper/highlightName";

const PostContent = ({ postContent }) => {

  const finalPostContent = highlightName(postContent);

  return (
    <>
      <div className="Description-bar">
        <p>
          {finalPostContent}
          {/* <span className="text-primary">#HelloWorld</span>{" "}
          <span className="text-primary">@methewreed</span>{" "}
          <span className="text-primary">@iamhannah</span> */}
        </p>
      </div>
    </>
  );
};

export default PostContent;

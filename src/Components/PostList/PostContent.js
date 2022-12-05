import React from "react";

const PostContent = ({ content }) => {
  return (
    <>
      <div className="Description-bar">
        <p>
          {content}
          {/* <span className="text-primary">#HelloWorld</span>{" "}
          <span className="text-primary">@methewreed</span>{" "}
          <span className="text-primary">@iamhannah</span> */}
        </p>
      </div>
    </>
  );
};

export default PostContent;

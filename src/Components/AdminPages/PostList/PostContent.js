import React from "react";
import HighLight from "../HighLight";
const PostContent = ({ postContent }) => {


  const lines = postContent.split('\n');

  return (
    <>
      <div className="Description-bar">
        <p>
          {/* <HighLight content={postContent} /> */}

          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {/* {line} */}
              <HighLight key={index} content={line} />
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>

    </>
  );
};

export default PostContent;

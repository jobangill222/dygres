import React from "react";
// import { highlightName } from "../../helper/highlightName";
import HighLight from "../HighLight";
const PostContent = ({ postContent }) => {

  // console.log('postContentpostContent', postContent)
  // const finalPostContent = highlightName(postContent);

  const lines = postContent.split('\n');

  return (
    <>
      <div className="Description-bar">
        <p>
          {/* <HighLight content={postContent} /> */}

          <div>
            {lines.map((line, index) => (
              <React.Fragment key={index}>
                {/* {line} */}
                <HighLight key={index} content={line} />
                <br />
              </React.Fragment>
            ))}
          </div>

        </p>
      </div>

    </>
  );
};

export default PostContent;

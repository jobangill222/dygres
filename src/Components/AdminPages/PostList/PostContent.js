import React from "react";
// import HighLight from "../HighLight";
import ShowPostText from "../ShowPostAsPlainText";
const PostContent = ({ postContent }) => {


  // const lines = postContent.split('\n');

  return (
    <>
      <div className="Description-bar ">
        <p>
          {/* <HighLight content={postContent} /> */}

          {/* {lines.map((line, index) => (
            <React.Fragment key={index}>
              <HighLight key={index} content={line} />
              {line === "" ?
                <br />
                : null
              }
            </React.Fragment>
          ))} */}
          <ShowPostText postContent={postContent ? postContent : "loading"} />
        </p>
      </div>

    </>
  );
};

export default PostContent;

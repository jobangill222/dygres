import React, { useEffect, useRef } from "react";
import { convertUrlsToLinks, createMarkup } from "../../helper/editorhelper";

const PostContent = ({ postContent }) => {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clickedElement = event.target.textContent;
    alert(`Clicked on ${clickedElement}`);
  };

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const atElements = contentRef.current.querySelectorAll(".highlighted");

      atElements.forEach((element) => {
        element.addEventListener("click", handleClick);
      });
    }
  }, [postContent]);

  let content = createMarkup(postContent);

  return (
    <>
      <div
        ref={contentRef}
        className="Description-bar"
        dangerouslySetInnerHTML={content}
      ></div>
    </>
  );
};

export default PostContent;

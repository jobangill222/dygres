import React, { useState } from "react";
// import { MdOutlineTimer } from "react-icons/md";
import Threads from "./Threads/index";
import PostHead from "./PostList/PostHead";
import PostContent from "./PostList/PostContent";
import PostFoot from "./PostList/PostFoot";
import PostEdit from "./PostList/PostEdit";

const DigitalTabContent = (props) => {
  // Prop Destrucutring
  // console.log("props.post", props.post);
  const { content, user, agree_count, is_agree, disagree_count, is_disagree, report_count, comment_count, award_count, is_report, userID, _id, is_follow, created_at
  } = props.post;

  //States

  const [commentCount, setCommentCount] = useState(comment_count);
  const [awardCount, setAwardCount] = useState(award_count);

  const [isEditFieldOpen, setIsEditFieldOpen] = useState(false);
  const [postContent, setPostContent] = useState(content);
  const [isThreadBoxOpen, setIsThreadBoxOpen] = useState(false);

  const [isPostDisable, setIsPostDisable] = useState(false);


  const handleCommentBoxOpen = (e) => {
    // console.log("thread open", e);
    setIsThreadBoxOpen(e);
  }

  return (
    <>
      <div className="digital-feeds p-0">

        <div className="accordionitem" >
          <div className="digital-feeds ">
            <PostHead postUserDetails={user} is_follow={is_follow} postUserID={userID} created_at={created_at} setIsPostDisable={setIsPostDisable} />
            <div className="user-preview">


              {isEditFieldOpen === false &&
                <PostContent postContent={postContent} />
              }
              {isEditFieldOpen === false &&
                <PostFoot
                  agree_count={agree_count}
                  is_agree={is_agree}
                  disagree_count={disagree_count}
                  is_disagree={is_disagree}
                  report_count={report_count}
                  commentCount={commentCount}

                  is_report={is_report}
                  postUserID={userID}
                  postID={_id}
                  onCommentBoxOpen={handleCommentBoxOpen}
                  setIsEditFieldOpen={setIsEditFieldOpen}
                  isPostDisable={isPostDisable}

                  awardCount={awardCount}
                />
              }

              {isEditFieldOpen && <PostEdit postID={_id} postContent={postContent} setPostContent={setPostContent} setIsEditFieldOpen={setIsEditFieldOpen} />}

            </div>
          </div>

          {isThreadBoxOpen &&
            <>
              {console.log("rednder")}

              <div className="thredsbar">
                <Threads isThreadBoxOpen={isThreadBoxOpen} postID={_id} commentID="" setCommentCount={setCommentCount} />
              </div>
            </>
          }
        </div>
      </div>

    </>
  );
};

export default DigitalTabContent;

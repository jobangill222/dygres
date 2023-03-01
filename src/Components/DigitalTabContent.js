import React, { useState, useEffect, useContext } from "react";
// import { MdOutlineTimer } from "react-icons/md";
import Threads from "./Threads/index";
import PostHead from "./PostList/PostHead";
import PostContent from "./PostList/PostContent";
import PostFoot from "./PostList/PostFoot";
import PostEdit from "./PostList/PostEdit";
import PostRetweetFrom from './PostList/PostRetweetFrom';
import { useNavigate } from "react-router-dom";
import { DContext } from "../Context/DContext";


const DigitalTabContent = (props) => {
  // Prop Destrucutring
  // console.log("props.post", props.post);
  const { content, user, agree_count, is_agree, disagree_count, is_disagree, report_count, comment_count, award_count, is_report, userID, _id, is_follow, created_at, parentPostID, parentPostDetail
    , postAward, amplify_count, isPostByOfficial } = props.post;

  const { postListingType, specificCommentFirst } = props;


  const { setPostIDForSinglePostState } = useContext(DContext);

  // console.log('props.post', props.post)

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

  const navigate = useNavigate();

  const viewParentPostDetail = async (postID) => {
    // localStorage.setItem('PostIdForSinglePost', postID);
    setPostIDForSinglePostState(postID);
    navigate('/SinglePostDetail/' + postID)
  }


  useEffect(() => {
    // console.log('postListingType', postListingType);
    if (postListingType === 'singlePost') {
      setIsThreadBoxOpen(true);
      //Move to top
      window.scrollTo(0, 0);
    }
  }, [])

  return (
    <>
      <div className="digital-feeds p-0">

        <div className="accordionitem" >
          <div className="digital-feeds ">
            <PostHead postUserDetails={user} is_follow={is_follow} postUserID={userID} created_at={created_at} setIsPostDisable={setIsPostDisable} postAward={postAward} postID={_id} isPostByOfficial={isPostByOfficial} />
            <div className="user-preview">


              {isEditFieldOpen === false &&
                <>
                  <PostContent postContent={postContent} />
                  {parentPostID !== null &&
                    <div onClick={() => viewParentPostDetail(parentPostID)}>
                      <PostRetweetFrom parentPostDetail={parentPostDetail} />
                    </div>
                  }

                </>
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
                  setAwardCount={setAwardCount}

                  created_at={created_at}

                  postListingType={postListingType}

                  amplify_count={amplify_count}

                  isPostByOfficial={isPostByOfficial}

                />
              }

              {isEditFieldOpen && <PostEdit postID={_id} postContent={postContent} setPostContent={setPostContent} setIsEditFieldOpen={setIsEditFieldOpen} />}

            </div>
          </div>

          {isThreadBoxOpen &&
            <>
              <div className="thredsbar">
                <Threads isThreadBoxOpen={isThreadBoxOpen} postID={_id} commentID="" setCommentCount={setCommentCount} specificCommentFirst={specificCommentFirst} />
              </div>
            </>
          }
        </div>
      </div>

    </>
  );
};

export default DigitalTabContent;

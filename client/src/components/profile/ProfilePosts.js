import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Member1 from "../../images/member-1.png";
import {
  DeleteForeverOutlined,
  ForumOutlined,
  MoreHorizOutlined,
  ReportGmailerrorredOutlined,
  Send,
  SentimentSatisfiedAltOutlined,
  ShareOutlined,
  ThumbUp,
} from "@mui/icons-material";
import Picker from "emoji-picker-react";
import { ProfileIntro } from "./ProfileIntro";
import { ProfilePhotos } from "./ProfilePhotos";
import { ProfileFriends } from "./ProfileFriends";
import PostInput from "../../helpers/postCreation";
import { deletePost } from "../../helpers/apiServices";
import axios from "axios";

export const ProfilePosts = ({ currentUser, setFriendId, setCurrentUser }) => {
  const [activePostId, setActivePostId] = useState(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [commentsShow, setCommentShow] = useState(false);

  function showAllComments() {
    setCommentShow(!commentsShow);
  }

  const handleSendComment = async (postId) => {
    try {
      const userId = currentUser._id;
      const response = await axios.post(`/api/posts/add-comment/${postId}`, {
        text: inputStr,
        userId: userId,
      });

      console.log("Comment added:", response.data.comments);
      const updatedPosts = currentUser.posts.map((post) => {
        console.log(post.comments);
        if (post._id === postId) {
          const updatedPost = {
            ...post,
            comments: [response.data.comments],
          };
          return updatedPost;
        }
        return post;
      });

      const updatedCurrentUser = {
        ...currentUser,
        posts: updatedPosts,
      };

      setCurrentUser(updatedCurrentUser);

      localStorage.setItem("user", JSON.stringify(updatedCurrentUser));

      setInputStr("");
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const onEmojiClick = (event) => {
    setInputStr((prevInput) => prevInput + event.emoji);
  };

  const handlePostSettings = (postId) => {
    setActivePostId(postId === activePostId ? null : postId);
  };

  const handleCommentInput = (postId) => {
    setActiveCommentPostId(postId === activeCommentPostId ? null : postId);
  };

  const handleDeletePost = async (postId) => {
    console.log(postId);
    await deletePost(postId, setCurrentUser);
  };

  return (
    <div className="profile-info">
      <div className="info-col">
        <ProfileIntro currentUser={currentUser} />
        <ProfilePhotos currentUser={currentUser} />
        <ProfileFriends currentUser={currentUser} setFriendId={setFriendId} />
      </div>
      <div className="post-col">
        <PostInput currentUser={currentUser} setCurrentUser={setCurrentUser} />

        {currentUser?.posts?.map((post, idx) => (
          <div className="post-container" key={idx}>
            <div className="post-row">
              <div className="user-profile">
                <img
                  src={`../images/${currentUser?.profileImage}`}
                  alt="profileImg"
                />
                <div>
                  <p>{currentUser?.firstName + " " + currentUser?.lastName}</p>
                  <span>{post?.timestamp}</span>
                </div>
              </div>
              <a style={{ cursor: "pointer" }}>
                {" "}
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  onClick={() => handlePostSettings(post._id)}
                />
              </a>
              {activePostId === post._id && (
                <div className="post-settings">
                  <span>
                    <div>
                      <ReportGmailerrorredOutlined />{" "}
                    </div>{" "}
                    <div className="more-post-profile">Report</div>
                  </span>
                  <span onClick={() => handleDeletePost(post._id)}>
                    {" "}
                    <div>
                      <DeleteForeverOutlined />
                    </div>{" "}
                    <div className="more-post-profile">Delete</div>{" "}
                  </span>
                </div>
              )}
            </div>
            <p className="post-text">{post?.text}</p>
            <img
              src={`../images/${post?.postContent}`}
              alt="feedImage"
              className="post-img"
            />

            <div className="post-row-buttons">
              <div className="activity-icons">
                <div>
                  <ThumbUp className="likeButton" /> {post?.likes?.length}
                </div>
                <div onClick={() => handleCommentInput(post._id)}>
                  <ForumOutlined className="commentShareBtn" />{" "}
                  {post?.comments[0]?.length}
                </div>
                <div>
                  <ShareOutlined className="commentShareBtn" />{" "}
                  {post?.shares?.length}
                </div>
              </div>
              {!activeCommentPostId && (
                <div className="post-profile-icon">
                  <img
                    src={`../images/${currentUser?.profileImage}`}
                    alt="profileImg"
                  />
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              )}
            </div>
            {activeCommentPostId === post._id && (
              <>
                <div className="comment-section">
                  <div className="post-profile-icon">
                    <img
                      src={`../images/${currentUser?.profileImage}`}
                      alt="profileImg"
                    />
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                  <div className="emoji-send-section">
                    <input
                      type="text"
                      className="input-style"
                      placeholder=" Write a comment..."
                      value={inputStr}
                      onChange={(e) => setInputStr(e.target.value)}
                    />
                    <SentimentSatisfiedAltOutlined
                      className="emoji-icon"
                      onClick={() => setShowPicker((val) => !val)}
                    />
                    {showPicker && (
                      <Picker
                        className="emoji-tab"
                        onEmojiClick={onEmojiClick}
                      />
                    )}
                    <Send
                      className="emoji-icon"
                      onClick={() => handleSendComment(post._id)}
                    />
                  </div>
                </div>
                {console.log(post)}
                <div
                  className={`comment-content-main-section ${
                    commentsShow ? "show-content" : ""
                  }`}
                >
                  <p className="see-all-comments" onClick={showAllComments}>
                    {!commentsShow ? "See all comments" : "Show less comments"}
                  </p>
                  {post?.comments[0]?.map((comment, index) => (
                    <div key={index} className="comment-content-section">
                      <img src={Member1} alt="user_image"></img>
                      <div className="comment-options">
                        <div>
                          <h5>User Name</h5>
                          <p>{comment?.text}</p>
                        </div>
                        <MoreHorizOutlined />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

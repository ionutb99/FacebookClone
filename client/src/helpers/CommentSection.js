import React, { useState } from "react";
import Member1 from "../../src/images/member-1.png";
import {
  MoreHorizOutlined,
  Send,
  SentimentSatisfiedAltOutlined,
} from "@mui/icons-material";
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { fetchFriendDataById } from "./apiServices";

const CommentSection = ({
  post,
  thisCurrentUser,
  currentUser,
  setCurrentUser,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [commentsShow, setCommentShow] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [userWhoComment, setUserWhoComment] = useState([]);


  //   post?.comments?.map(async (comment) => {
  //    try {
  //      const user = await fetchFriendDataById(comment.user_id);
  //      console.log(user.firstName + user.lastName)
      
  //     setUserWhoComment((prevUsers) => ({
  //       ...prevUsers,
  //       user
  //     }))
  //   }catch (error) {
       
  //   }
  //   )
  // }
  

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

  function showAllComments() {
    setCommentShow(!commentsShow);
  }

  const onEmojiClick = (event) => {
    setInputStr((prevInput) => prevInput + event.emoji);
  };

  return (
    <>
      <div className="comment-section">
        <div className="post-profile-icon">
          <img
            src={`../images/${thisCurrentUser?.profileImage}`}
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
            <Picker className="emoji-tab" onEmojiClick={onEmojiClick} />
          )}
          <Send
            className="emoji-icon"
            onClick={() => handleSendComment(post._id)}
          />
        </div>
      </div>
      <div
        className={`comment-content-main-section ${
          commentsShow ? "show-content" : ""
        }`}
      >
        <p className="see-all-comments" onClick={showAllComments}>
          {!commentsShow ? "See all comments" : "Show less comments"}
        </p>
        {post?.comments?.map((comment, index) => (
          <div key={index} className="comment-content-section">
            <img src={Member1} alt="user_image"></img>
            <div className="comment-options">
              <div>
                <h5>asdsad</h5>
                <p>{comment?.text}</p>
              </div>
              <MoreHorizOutlined />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentSection;

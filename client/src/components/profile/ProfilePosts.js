import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import {
  ForumOutlined,
  ShareOutlined,
  ThumbUp,
} from "@mui/icons-material";
import { ProfileIntro } from "./ProfileIntro";
import { ProfilePhotos } from "./ProfilePhotos";
import { ProfileFriends } from "./ProfileFriends";
import PostInput from "../../helpers/postCreation";
import { deletePost } from "../../helpers/apiServices";

export const ProfilePosts = ({ currentUser, setFriendId, setCurrentUser }) => {
  const [activePostId, setActivePostId] = useState(null);
  

  const handlePostSettings = (postId) => {
    setActivePostId(postId === activePostId ? null : postId);
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
        <PostInput
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

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
                  <span>Edit</span>
                  <span onClick={() => handleDeletePost(post._id)}>Delete</span>
                </div>
              )}
            </div>
            <p className="post-text">{post?.text}</p>
            <img
              src={`../images/${post?.postContent}`}
              alt="feedImage"
              className="post-img"
            />

            <div className="post-row">
              <div className="activity-icons">
                <div>
                  <ThumbUp className="likeButton" /> {post?.likes?.length}
                </div>
                <div>
                  <ForumOutlined className="commentShareBtn" />{" "}
                  {post?.comments?.length}
                </div>
                <div>
                  <ShareOutlined className="commentShareBtn" />{" "}
                  {post?.shares?.length}
                </div>
              </div>
              <div className="post-profile-icon">
                <img
                  src={`../images/${currentUser?.profileImage}`}
                  alt="profileImg"
                />
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  DeleteForeverOutlined,
  ForumOutlined,
  ReportGmailerrorredOutlined,
  ShareOutlined,
  ThumbUp,
} from "@mui/icons-material";
import { ProfileIntro } from "./ProfileIntro";
import { ProfilePhotos } from "./ProfilePhotos";
import { ProfileFriends } from "./ProfileFriends";
import PostInput from "../../helpers/postCreation";
import { deletePost } from "../../helpers/apiServices";
import axios from "axios";
import CommentSection from "../../helpers/CommentSection";

export const ProfilePosts = ({ currentUser, setFriendId, setCurrentUser }) => {
  const [thisCurrentUser, setThisCurrentUser] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  

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

  useEffect(() => {
    const getCurrentUser = async () => {
      const userID = currentUser?._id;
      try {
        const response = await axios.get(`/api/user/${userID}`);
        setThisCurrentUser(response.data);
      } catch (error) {
        console.error("Get Current User: " + error);
      }
    };

    getCurrentUser();
  }, [currentUser]);

  return (
    <div className="profile-info">
      <div className="info-col">
        <ProfileIntro currentUser={currentUser} />
        <ProfilePhotos currentUser={currentUser} />
        <ProfileFriends currentUser={currentUser} setFriendId={setFriendId} />
      </div>
      <div className="post-col">
        <PostInput currentUser={currentUser} setCurrentUser={setCurrentUser} />

        {thisCurrentUser?.posts?.map((post, idx) => (
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
                  {post?.comments?.length}
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
              <CommentSection
                post={post}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                thisCurrentUser={thisCurrentUser}

              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

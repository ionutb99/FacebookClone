import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Member1 from "../images/member-1.png";
import Member2 from "../images/member-2.png";
import Member3 from "../images/member-3.png";
import AddFriends from "../images/add-friends.png";
import Message from "../images/message.png";
import ProfileJob from "../images/profile-job.png";
import ProfileStudy from "../images/profile-study.png";
import ProfileHome from "../images/profile-home.png";
import ProfileLocation from "../images/profile-location.png";

import {
  ForumOutlined,
  InsertEmoticonOutlined,
  MoreHoriz,
  MoreHorizOutlined,
  PhotoCamera,
  Settings,
  ShareOutlined,
  ThumbUp,
  VideoCall,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Profile = ({ currentUser, setCurrentUser }) => {
  const [isSettingsIntroOpen, setIsSettingsIntroOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [photoVideoContent, setPhotoVideoContent] = useState("");
  const [isPhotoVideoOverlayOpen, setIsPhotoVideoOverlayOpen] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  const navigate = useNavigate();

  const settingsMenuToggle = () => {
    setIsSettingsIntroOpen(!isSettingsIntroOpen);
  };

  const handlePostSettings = (postId) => {
    setActivePostId(postId === activePostId ? null : postId);
  };

  const handleDeletePost = async (postId) => {
    console.log(postId);
    try {
      await axios.delete(`/api/posts/delete/${postId}`);

      const userDataString = localStorage.getItem("user");

      const currentUser = JSON.parse(userDataString);

      const updatedPosts = currentUser.posts.filter(
        (post) => post._id !== postId
      );

      setCurrentUser({
        ...currentUser,
        posts: updatedPosts,
      });

      const updatedUser = {
        ...currentUser,
        posts: updatedPosts,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handlePost = async () => {
    try {
      const response = await axios.post(
        `/api/posts/create/${currentUser?._id}`,
        {
          text: postText,
          postContent: photoVideoContent,
        }
      );
      const newPost = response.data.posts[response.data.posts.length - 1];
      console.log(newPost);
      const updatedPosts = [...currentUser.posts, newPost];
      setCurrentUser({
        ...currentUser,
        posts: updatedPosts,
      });

      const updatedUser = {
        ...currentUser,
        posts: updatedPosts,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setPostText("");
      setPhotoVideoContent("");
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  const togglePhotoVideoOverlay = () => {
    setIsPhotoVideoOverlayOpen(!isPhotoVideoOverlayOpen);
  };

  const handleSavePhotoVideoContent = () => {
    // Handle saving the photo/video content
    console.log("Photo/Video content:", photoVideoContent);

    // Close the overlay
    setIsPhotoVideoOverlayOpen(false);
  };

  console.log(currentUser);

  return (
    <div className="profile-container">
      <img src={`../images/${currentUser?.coverPhoto}`} alt="coverImg" className="cover-img" />
      <div className="profile-details">
        <div className="pd-left">
          <div className="pd-row">
            <img
              src={`../images/${currentUser?.profileImage}`}
              alt="profileImage"
              className="pd-image"
            />
            <Settings
              className="edit-photo-cover"
              onClick={() => navigate(`/photos/update/${currentUser._id}`)}
            />
            <div>
              <h3>
                {currentUser?.firstName} {currentUser?.lastName}
              </h3>
              <p>{currentUser?.friends.length} Friends - 0 mutual</p>
              <img src={Member1} alt="member1" />
            </div>
          </div>
        </div>

        <div className="pd-right">
          <button type="button">
            <img src={AddFriends} alt="addFriends" /> Friend
          </button>
          <button type="button">
            <img src={Message} alt="message" /> Message
          </button>
          <br />
        </div>
      </div>

      <div className="profile-info">
        <div className="info-col">
          <div className="profile-intro">
            <h3>Intro</h3>
            <MoreHorizOutlined
              className="edit-intro"
              onClick={settingsMenuToggle}
            />
            <div
              className={isSettingsIntroOpen ? "intro-settings" : ""}
              onClick={() =>
                navigate(`/profile/update-info/${currentUser._id}`)
              }
            >
              {isSettingsIntroOpen && "Edit"}
            </div>
            <p className="intro-text">{currentUser?.intro} </p>
            <hr />
            <ul>
              <li>
                <img src={ProfileJob} alt="profileJob" />
                {currentUser?.profileJob}
              </li>
              <li>
                <img src={ProfileStudy} alt="profileStudy" />
                {currentUser?.profileStudy}
              </li>
              <li>
                <img src={ProfileStudy} alt="profileStudy" />
                {currentUser?.profileStudyGraduate}
              </li>
              <li>
                <img src={ProfileHome} alt="profileHome" />
                {currentUser?.profileHome}
              </li>
              <li>
                <img src={ProfileLocation} alt="profileLocation" />
                {currentUser?.profileLocation}
              </li>
            </ul>
          </div>

          <div className="profile-intro">
            <div className="title-box">
              <h3>Photos</h3>
              <a href="#">All Photos</a>
            </div>

            <div className="photo-box">
              {currentUser?.posts.map((post, idx) => (
                <div key={idx}>
                  <img src={post?.postContent} alt="photoContent" />
                </div>
              ))}
            </div>
          </div>

          <div className="profile-intro">
            <div className="title-box">
              <h3>Friends</h3>
              <a href="#">All Friends</a>
            </div>
            <p>
              {currentUser?.friends.length} (
              {currentUser?.friends.length / Math.random()} mutual)
            </p>

            <div className="friend-box">
              <div>
                <img src={Member1} alt="member1" />
                <p>Joseph N</p>
              </div>
              <div>
                <img src={Member2} alt="member2" />
                <p>Nathan N</p>
              </div>
              <div>
                <img src={Member3} alt="member3" />
                <p>George D</p>
              </div>
            </div>
          </div>
        </div>
        <div className="post-col">
          <div className="write-post-container">
            <div className="user-profile">
              <img src={`../images/${currentUser?.profileImage}`} alt="profileImg" />
              <div>
                <p>{currentUser?.firstName + " " + currentUser?.lastName}</p>
                <small>
                  Public <FontAwesomeIcon icon={faCaretDown} />
                </small>
              </div>
            </div>

            <div className="post-input-container">
              <div className="input-row">
                <textarea
                  rows="3"
                  placeholder="What's on your mind, John?"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                ></textarea>
                <button onClick={handlePost}>Post</button>
              </div>
              <div className="add-post-links">
                <a>
                  <VideoCall className="addPostIconLive" /> Live Video
                </a>
                <a onClick={togglePhotoVideoOverlay}>
                  <PhotoCamera className="addPostIconPhoto" /> Photo/Video
                </a>
                <a>
                  <InsertEmoticonOutlined className="addPostIconFeeling" />{" "}
                  Feeling/Activity{" "}
                </a>
              </div>
              {isPhotoVideoOverlayOpen && (
                <div className="photo-video-overlay">
                  <textarea
                    rows="1"
                    placeholder="Enter Photo/Video URL here"
                    value={photoVideoContent}
                    onChange={(e) => setPhotoVideoContent(e.target.value)}
                  ></textarea>
                  <button onClick={handleSavePhotoVideoContent}>Save</button>
                </div>
              )}
            </div>
          </div>

          {currentUser?.posts?.map((post, idx) => (
            <div className="post-container" key={idx}>
              <div className="post-row">
                <div className="user-profile">
                  <img src={`../images/${currentUser?.profileImage}`} alt="profileImg" />
                  <div>
                    <p>
                      {currentUser?.firstName + " " + currentUser?.lastName}
                    </p>
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
                    <span onClick={() => handleDeletePost(post._id)}>
                      Delete
                    </span>
                  </div>
                )}
              </div>
              <p className="post-text">{post?.text}</p>
              <img
                src={post?.postContent}
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
                  <img src={`../images/${currentUser?.profileImage}`} alt="profileImg" />
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

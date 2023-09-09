import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ProfileJob from "../images/profile-job.png";
import ProfileStudy from "../images/profile-study.png";
import ProfileHome from "../images/profile-home.png";
import ProfileLocation from "../images/profile-location.png";

import {
  Add,
  AttachFile,
  ForumOutlined,
  InsertEmoticonOutlined,
  MoreHoriz,
  MoreHorizOutlined,
  PhotoCamera,
  ShareOutlined,
  ThumbUp,
  VideoCall,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Profile = ({ currentUser, setCurrentUser }) => {
  const [isSettingsIntroOpen, setIsSettingsIntroOpen] = useState(false);
  const [isSettingsProfileOpen, setIsSettingsProfileOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [photoVideoContent, setPhotoVideoContent] = useState(null);
  const [isPhotoVideoOverlayOpen, setIsPhotoVideoOverlayOpen] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  const navigate = useNavigate();

  const settingsMenuToggle = () => {
    setIsSettingsIntroOpen(!isSettingsIntroOpen);
  };
  const settingsProfileToggle = () => {
    setIsSettingsProfileOpen(!isSettingsProfileOpen);
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
      if (!postText || !photoVideoContent) {
        console.error("Post text and photo/video content cannot be empty.");
        return;
      }

      const formData = new FormData();
      formData.append("text", postText);
      formData.append("postContent", photoVideoContent);

      const response = await axios.post(
        `/api/posts/create/${currentUser?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newPost = response.data.posts[response.data.posts.length - 1];
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
      setPhotoVideoContent(null);
    } catch (error) {
      console.error(
        "Error creating post: ",
        error.response?.data || error.message
      );
    }
  };

  const togglePhotoVideoOverlay = () => {
    setIsPhotoVideoOverlayOpen(!isPhotoVideoOverlayOpen);
  };

  const handleSavePhotoVideoContent = () => {
    console.log("Photo/Video content:", photoVideoContent);
    setIsPhotoVideoOverlayOpen(false);
  };

  console.log(currentUser);

  const friendsWithStatusFriends = currentUser?.friends.filter(
    (friend) => friend.friendship_status === "friends"
  );

  const [friendData, setFriendData] = useState([]);

  const fetchFriendData = async () => {
    const friendIds = friendsWithStatusFriends.map((friend) => friend.user_id);
    const friendPromises = friendIds.map(async (friendId) => {
      try {
        const response = await axios.get(`/api/user/${friendId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching friend data: ", error);
        return null;
      }
    });

    const friendDataArray = await Promise.all(friendPromises);
    setFriendData(friendDataArray.filter(Boolean));
  };

  useEffect(() => {
    fetchFriendData();
  }, []);

  return (
    <div className="profile-container">
      <img
        src={`../images/${currentUser?.coverPhoto}`}
        alt="coverImg"
        className="cover-img"
      />
      <div className="profile-details">
        <div className="pd-left">
          <div className="pd-row">
            <img
              src={`../images/${currentUser?.profileImage}`}
              alt="profileImage"
              className="pd-image"
            />

            <div>
              <h3>
                {currentUser?.firstName} {currentUser?.lastName}
              </h3>
              <p>{currentUser?.friends.filter((friend) => friend.friendship_status !== "request").length} Friends</p>
              {/* <img src={} alt="member1" /> */}
            </div>
          </div>
        </div>

        <div className="pd-right">
          <button type="button">
            <Add /> <b>Add to story</b>
          </button>

          <br />
          <MoreHoriz
            className="edit-photo-cover"
            onClick={settingsProfileToggle}
          />
          <div
            className={isSettingsProfileOpen ? "profile-settings" : ""}
            onClick={() => navigate(`/photos/update/${currentUser._id}`)}
          >
            {isSettingsProfileOpen && "Edit"}
          </div>
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
                  <img
                    src={`../images/${post?.postContent}`}
                    alt="photoContent"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="profile-intro">
            <div className="title-box">
              <h3>Friends</h3>
              <a>All Friends</a>
            </div>
            <p>
              {currentUser?.friends.filter((friend) => friend.friendship_status !== "request").length} (
              {Math.round(currentUser?.friends.length)} mutual)
            </p>

            <div className="friend-box">
              {friendData.map((friend) => (
                <div key={friend._id}>
                  <img
                    src={`../images/${friend.profileImage}`}
                    alt={`profile-${friend._id}`}
                    onClick={() => navigate(`/user/${friend._id}`)}
                  />
                  <p>
                    {friend.firstName} {friend.lastName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="post-col">
          <div className="write-post-container">
            <div className="user-profile">
              <img
                src={`../images/${currentUser?.profileImage}`}
                alt="profileImg"
              />
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
                  <div>
                    <label htmlFor="postContent" className="custom-file-upload">
                      Choose Post: <AttachFile />
                    </label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="postContent"
                      accept="image/*, video/*"
                      name="postContent"
                      onChange={(e) => setPhotoVideoContent(e.target.files[0])}
                    />
                  </div>
                  <button onClick={handleSavePhotoVideoContent}>Save</button>
                </div>
              )}
            </div>
          </div>

          {currentUser?.posts?.map((post, idx) => (
            <div className="post-container" key={idx}>
              <div className="post-row">
                <div className="user-profile">
                  <img
                    src={`../images/${currentUser?.profileImage}`}
                    alt="profileImg"
                  />
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
    </div>
  );
};

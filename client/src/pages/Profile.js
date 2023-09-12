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
import { addPost, deletePost, fetchFriendData } from "../helpers/apiServices";
import PostInput from "../helpers/postCreation";

export const Profile = ({ currentUser, setCurrentUser, setFriendId }) => {
  const [isSettingsIntroOpen, setIsSettingsIntroOpen] = useState(false);
  const [isSettingsProfileOpen, setIsSettingsProfileOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [photoVideoContent, setPhotoVideoContent] = useState(null);
  const [isPhotoVideoOverlayOpen, setIsPhotoVideoOverlayOpen] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [friendData, setFriendData] = useState([]);

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
    await deletePost(postId, setCurrentUser);
  };

  const handlePost = async () => {
    addPost(
      currentUser,
      setCurrentUser,
      setPostText,
      setPhotoVideoContent,
      postText,
      photoVideoContent
    );
  };

  const togglePhotoVideoOverlay = () => {
    setIsPhotoVideoOverlayOpen(!isPhotoVideoOverlayOpen);
  };

  const handleSavePhotoVideoContent = () => {
    console.log("Photo/Video content:", photoVideoContent);
    setIsPhotoVideoOverlayOpen(false);
  };

  const friendsWithStatusFriends = currentUser?.friends.filter(
    (friend) => friend.friendship_status === "friends"
  );

  const handleFriendProfile = (personIds) => {
    setFriendId(personIds);
    navigate(`/user/${personIds}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const friendDataArray = await fetchFriendData(friendsWithStatusFriends);
      setFriendData(friendDataArray);
    };

    fetchData();
  }, []);

  console.log(currentUser);

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
              <p>
                {
                  currentUser?.friends.filter(
                    (friend) => friend.friendship_status == "friends"
                  ).length
                }{" "}
                Friends
              </p>
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
              {
                currentUser?.friends.filter(
                  (friend) => friend.friendship_status == "friends"
                ).length
              }{" "}
              ( 0 mutual)
            </p>

            <div className="friend-box">
              {friendData.map((friend) => (
                <div key={friend._id}>
                  <img
                    src={`../images/${friend.profileImage}`}
                    alt={`profile-${friend._id}`}
                    onClick={() => handleFriendProfile(friend._id)}
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
          <PostInput
            currentUser={currentUser}
            postText={postText}
            setPostText={setPostText}
            handlePost={handlePost}
            togglePhotoVideoOverlay={togglePhotoVideoOverlay}
            setPhotoVideoContent={setPhotoVideoContent}
            isPhotoVideoOverlayOpen={isPhotoVideoOverlayOpen}
            handleSavePhotoVideoContent={handleSavePhotoVideoContent}
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

//420

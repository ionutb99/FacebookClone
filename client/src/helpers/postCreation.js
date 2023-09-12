import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  VideoCall,
  PhotoCamera,
  InsertEmoticonOutlined,
} from "@mui/icons-material";
import { AttachFile } from "@mui/icons-material";

const PostInput = ({
  currentUser,
  postText,
  setPostText,
  handlePost,
  togglePhotoVideoOverlay,
  setPhotoVideoContent,
  isPhotoVideoOverlayOpen,
  handleSavePhotoVideoContent,
}) => {
  return (
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
  );
};

export default PostInput;

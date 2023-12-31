import React, { useState } from "react";
import {
  VideoCall,
  PhotoCamera,
  InsertEmoticonOutlined,
} from "@mui/icons-material";
import { AttachFile } from "@mui/icons-material";
import { addPost } from "./apiServices";

export const PostCreationContent = ({
  currentUser, setCurrentUser
}) => {
  const [postText, setPostText] = useState("");
  const [photoVideoContent, setPhotoVideoContent] = useState(null);
  const [isPhotoVideoOverlayOpen, setIsPhotoVideoOverlayOpen] = useState(false);
  
  const togglePhotoVideoOverlay = () => {
    setIsPhotoVideoOverlayOpen(!isPhotoVideoOverlayOpen);
  };

  const handleSavePhotoVideoContent = () => {
    console.log("Photo/Video content:", photoVideoContent);
    setIsPhotoVideoOverlayOpen(false);
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


  return (
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
  );
};

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { PostCreationContent } from "./postCreationContent";

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
      <PostCreationContent
        postText={postText}
        setPostText={setPostText}
        handlePost={handlePost}
        togglePhotoVideoOverlay={togglePhotoVideoOverlay}
        setPhotoVideoContent={setPhotoVideoContent}
        isPhotoVideoOverlayOpen={isPhotoVideoOverlayOpen}
        handleSavePhotoVideoContent={handleSavePhotoVideoContent}
      />
    </div>
  );
};

export default PostInput;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImg from "../../images/profile-pic.png";
import FeedImage1 from "../../images/feed-image-3.png";

import { faCaretDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { ForumOutlined, ShareOutlined, ThumbUp } from "@mui/icons-material";

export const PostContentHome = () => {
  return (
    <>
      <div className="post-container">
        <div className="post-row">
          <div className="user-profile">
            <img src={ProfileImg} alt="profileImg" />
            <div>
              <p>Paul Walker </p>
              <span>August 31 2023, 17:59 pm</span>
            </div>
          </div>
          <a href="#">
            {" "}
            <FontAwesomeIcon icon={faEllipsisV} />
          </a>
        </div>
        <p className="post-text">
          Sometimes NeedForSpeed make me watch Fast&Furios Again
        </p>
        <img src={FeedImage1} alt="feedImage" className="post-img" />

        <div className="post-row">
          <div className="activity-icons">
            <div>
              <ThumbUp className="likeButton" /> 120
            </div>
            <div>
              <ForumOutlined className="commentShareBtn" /> 45
            </div>
            <div>
              <ShareOutlined className="commentShareBtn" /> 20
            </div>
          </div>
          <div className="post-profile-icon">
            <img src={ProfileImg} alt="profileImg" />
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
      </div>

    </>
  );
};

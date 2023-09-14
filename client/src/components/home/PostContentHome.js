import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImg from "../../images/profile-pic.png";
import FeedImage1 from "../../images/feed-image-1.png";
import FeedImage2 from "../../images/feed-image-2.png";
import FeedImage3 from "../../images/feed-image-3.png";
import FeedImage4 from "../../images/feed-image-4.png";
import FeedImage5 from "../../images/feed-image-5.png";
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
              <p>John Nicholson</p>
              <span>August 31 2023, 17:59 pm</span>
            </div>
          </div>
          <a href="#">
            {" "}
            <FontAwesomeIcon icon={faEllipsisV} />
          </a>
        </div>
        <p className="post-text">
          Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos on
          website development and Ui design. <a href="#">#Ionutb99Tutorials</a>{" "}
          <a href="#"> #YoutubeChannel</a>
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

      <div className="post-container">
        <div className="post-row">
          <div className="user-profile">
            <img src={ProfileImg} alt="profileImg" />
            <div>
              <p>John Nicholson</p>
              <span>August 31 2023, 17:59 pm</span>
            </div>
          </div>
          <a href="#">
            {" "}
            <FontAwesomeIcon icon={faEllipsisV} />
          </a>
        </div>
        <p className="post-text">
          Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos on
          website development and Ui design. <a href="#">#Ionutb99Tutorials</a>{" "}
          <a href="#"> #YoutubeChannel</a>
        </p>
        <img src={FeedImage2} alt="feedImage2" className="post-img" />

        <div className="post-row">
          <div className="activity-icons">
            <div>
              <ThumbUp className="likeButton" /> 157
            </div>
            <div>
              <ForumOutlined className="commentShareBtn" /> 40
            </div>
            <div>
              <ShareOutlined className="commentShareBtn" /> 12
            </div>
          </div>
          <div className="post-profile-icon">
            <img src={ProfileImg} alt="profileImg" />
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
      </div>

      <div className="post-container">
        <div className="post-row">
          <div className="user-profile">
            <img src={ProfileImg} alt="profileImg" />
            <div>
              <p>John Nicholson</p>
              <span>August 31 2023, 17:59 pm</span>
            </div>
          </div>
          <a href="#">
            {" "}
            <FontAwesomeIcon icon={faEllipsisV} />
          </a>
        </div>
        <p className="post-text">
          Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos on
          website development and Ui design. <a href="#">#Ionutb99Tutorials</a>{" "}
          <a href="#"> #YoutubeChannel</a>
        </p>
        <img src={FeedImage3} alt="feedImage3" className="post-img" />

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

      <div className="post-container">
        <div className="post-row">
          <div className="user-profile">
            <img src={ProfileImg} alt="profileImg" />
            <div>
              <p>John Nicholson</p>
              <span>August 31 2023, 17:59 pm</span>
            </div>
          </div>
          <a href="#">
            {" "}
            <FontAwesomeIcon icon={faEllipsisV} />
          </a>
        </div>
        <p className="post-text">
          Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos on
          website development and Ui design. <a href="#">#Ionutb99Tutorials</a>{" "}
          <a href="#"> #YoutubeChannel</a>
        </p>
        <img src={FeedImage4} alt="feedImage4" className="post-img" />

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

      <div className="post-container">
        <div className="post-row">
          <div className="user-profile">
            <img src={ProfileImg} alt="profileImg" />
            <div>
              <p>John Nicholson</p>
              <span>August 31 2023, 17:59 pm</span>
            </div>
          </div>
          <a href="#">
            {" "}
            <FontAwesomeIcon icon={faEllipsisV} />
          </a>
        </div>
        <p className="post-text">
          Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos on
          website development and Ui design. <a href="#">#Ionutb99Tutorials</a>{" "}
          <a href="#"> #YoutubeChannel</a>
        </p>
        <img src={FeedImage5} alt="feedImage5" className="post-img" />

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

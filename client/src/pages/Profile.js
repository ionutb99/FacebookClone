import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import CoverImg from "../images/cover.png";
import ProfileImg from "../images/profile.png";
import Member1 from "../images/member-1.png";
import Member2 from "../images/member-2.png";
import Member3 from "../images/member-3.png";
import Member4 from "../images/member-4.png";
import Member5 from "../images/member-5.png";
import Member6 from "../images/member-6.png";
import Member7 from "../images/member-7.png";
import Member8 from "../images/member-8.png";
import Member9 from "../images/member-9.png";
import AddFriends from "../images/add-friends.png";
import Message from "../images/message.png";
import MoreIcon from "../images/more.png";
import FeedImage1 from "../images/feed-image-1.png";
import FeedImage2 from "../images/feed-image-2.png";
import FeedImage3 from "../images/feed-image-3.png";
import FeedImage4 from "../images/feed-image-4.png";
import FeedImage5 from "../images/feed-image-5.png";
import LikeWhiteBtn from "../images/like.png";
import CommentsBtn from "../images/comments.png";
import ShareBtn from "../images/share.png";
import ProfileJob from "../images/profile-job.png";
import ProfileStudy from "../images/profile-study.png";
import ProfileHome from "../images/profile-home.png";
import ProfileLocation from "../images/profile-location.png";
import Photo1 from "../images/photo1.png";
import Photo6 from "../images/photo2.png";
import Photo2 from "../images/photo3.png";
import Photo3 from "../images/photo4.png";
import Photo4 from "../images/photo5.png";
import Photo5 from "../images/photo6.png";
import { ForumOutlined, InsertEmoticonOutlined, MoreHorizOutlined, PhotoCamera, ShareOutlined, ThumbUp, VideoCall } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Profile = ({ currentUser }) => {
  const [isSettingsIntroOpen, setIsSettingsIntroOpen] = useState(false);
  const navigate = useNavigate();

  const settingsMenuToggle = () => {
    setIsSettingsIntroOpen(!isSettingsIntroOpen);
  };

  console.log(currentUser);

  return (
    <div className="profile-container">
      <img src={CoverImg} alt="coverImg" className="cover-img" />
      <div className="profile-details">
        <div className="pd-left">
          <div className="pd-row">
            <img src={ProfileImg} alt="profileImg" className="pd-image" />
            <div>
              <h3>{currentUser?.firstName} {currentUser?.lastName}</h3>
              <p>{currentUser?.friends.length} Friends - 0 mutual</p>
              <img src={Member1} alt="member1" />
              <img src={Member2} alt="member2" />
              <img src={Member3} alt="member3" />
              <img src={Member4} alt="member4" />
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
            <MoreHorizOutlined className="edit-intro" onClick={settingsMenuToggle} />
            <div className={isSettingsIntroOpen ? "intro-settings" : ""} onClick={() => navigate(`/profile/update-info/${currentUser._id}`)} >
              {isSettingsIntroOpen && "Edit"}
            </div>
            <p className="intro-text">
             {currentUser?.intro}{" "}
            </p>
            <hr />
            <ul>
              <li>
                <img src={ProfileJob} alt="profileJob" />
                {currentUser?.profileJob }
              </li>
              <li>
                <img src={ProfileStudy} alt="profileStudy" />
                {currentUser?.profileStudy }
              </li>
              <li>
                <img src={ProfileStudy} alt="profileStudy" />
                {currentUser?.profileStudyGraduate }
              </li>
              <li>
                <img src={ProfileHome} alt="profileHome" />
                {currentUser?.profileHome }
              </li>
              <li>
                <img src={ProfileLocation} alt="profileLocation" />
                {currentUser?.profileLocation }
              </li>
            </ul>
          </div>

          <div className="profile-intro">
            <div className="title-box">
              <h3>Photos</h3>
              <a href="#">All Photos</a>
            </div>

            <div className="photo-box">
              <div>
                <img src={Photo1} alt="photo1" />
              </div>
              <div>
                <img src={Photo2} alt="photo2" />
              </div>
              <div>
                <img src={Photo3} alt="photo3" />
              </div>
              <div>
                <img src={Photo4} alt="photo4" />
              </div>
              <div>
                <img src={Photo5} alt="photo5" />
              </div>
              <div>
                <img src={Photo6} alt="photo6" />
              </div>
            </div>
          </div>

          <div className="profile-intro">
            <div className="title-box">
              <h3>Friends</h3>
              <a href="#">All Friends</a>
            </div>
            <p>114 (10 mutual)</p>

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
              <div>
                <img src={Member4} alt="photo4" />
                 <p>Francis L</p>
              </div>
              <div>
                <img src={Member5} alt="member5" />
                 <p>Anthony E</p>
              </div>
              <div>
                <img src={Member6} alt="member6" />
                 <p>Michael A</p>
              </div>
              <div>
                <img src={Member7} alt="member7" />
                 <p>Edward M</p>
              </div>
              <div>
                <img src={Member8} alt="member8" />
                 <p>Bradon C</p>
              </div>
              <div>
                <img src={Member9} alt="member9" />
                 <p>James Doe</p>
              </div>

            </div>
          </div>





        </div>
        <div className="post-col">
          <div className="write-post-container">
            <div className="user-profile">
              <img src={ProfileImg} alt="profileImg" />
              <div>
                <p>John Nicholson</p>
                <small>
                  Public <FontAwesomeIcon icon={faCaretDown} />
                </small>
              </div>
            </div>

            <div className="post-input-container">
              <textarea
                rows="3"
                placeholder="What's on your mind, John?"
              ></textarea>
              <div className="add-post-links">
              <a href="#">
                <VideoCall className="addPostIconLive" /> Live Video
              </a>
              <a href="#">
                <PhotoCamera className="addPostIconPhoto" /> Photo/Video
              </a>
              <a href="#">
                <InsertEmoticonOutlined className="addPostIconFeeling" /> Feeling/Activity{" "}
              </a>
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
              website development and Ui design.{" "}
              <a href="#">#Ionutb99Tutorials</a>{" "}
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
              website development and Ui design.{" "}
              <a href="#">#Ionutb99Tutorials</a>{" "}
              <a href="#"> #YoutubeChannel</a>
            </p>
            <img src={FeedImage2} alt="feedImage2" className="post-img" />

            <div className="post-row">
              <div className="activity-icons">
                <div>
                  <img src={LikeWhiteBtn} alt="likeWhite" /> 157
                </div>
                <div>
                  <img src={CommentsBtn} alt="likeBlue" /> 40
                </div>
                <div>
                  <img src={ShareBtn} alt="likeBlue" /> 22
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
              website development and Ui design.{" "}
              <a href="#">#Ionutb99Tutorials</a>{" "}
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
              website development and Ui design.{" "}
              <a href="#">#Ionutb99Tutorials</a>{" "}
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
              website development and Ui design.{" "}
              <a href="#">#Ionutb99Tutorials</a>{" "}
              <a href="#"> #YoutubeChannel</a>
            </p>
            <img src={FeedImage5} alt="feedImage5" className="post-img" />

            <div className="post-row">
              <div className="activity-icons">
                <div>
                  <img src={LikeWhiteBtn} alt="likeWhite" /> 157
                </div>
                <div>
                  <img src={CommentsBtn} alt="likeBlue" /> 40
                </div>
                <div>
                  <img src={ShareBtn} alt="likeBlue" /> 22
                </div>
              </div>
              <div className="post-profile-icon">
                <img src={ProfileImg} alt="profileImg" />
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

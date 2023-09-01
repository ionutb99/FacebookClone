import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCaretDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import newsImg from "../images/news.png";
import friendsImg from "../images/friends.png";
import groupImg from "../images/news.png";
import marketplaceImg from "../images/marketplace.png";
import watchImg from "../images/watch.png";
import LiveVideo from "../images/live-video.png";
import Photo from "../images/photo.png";
import Feeling from "../images/feeling.png";
import Shortcut1 from "../images/shortcut-1.png";
import Shortcut2 from "../images/shortcut-2.png";
import Shortcut3 from "../images/shortcut-3.png";
import Shortcut4 from "../images/shortcut-4.png";
import Advertisement from "../images/advertisement.png";
import Member1 from "../images/member-1.png";
import Member2 from "../images/member-2.png";
import Member3 from "../images/member-3.png";
import Member4 from "../images/member-4.png";
import UploadImg1 from "../images/upload.png";
import ProfileImg from "../images/profile-pic.png";
import FeedImage1 from "../images/feed-image-1.png";
import FeedImage2 from "../images/feed-image-2.png";
import FeedImage3 from "../images/feed-image-3.png";
import FeedImage4 from "../images/feed-image-4.png";
import FeedImage5 from "../images/feed-image-5.png";
import LikeBlueBtn from "../images/like-blue.png";
import LikeWhiteBtn from "../images/like.png";
import CommentsBtn from "../images/comments.png";
import ShareBtn from "../images/share.png";

export const Home = () => {
  return (
    <div className="container">
      <div className="left-sidebar">
        <div className="imp-links">
          <a href="#">
            <img src={newsImg} alt="latest" /> Latest News
          </a>
          <a href="#">
            <img src={friendsImg} alt="friends" /> Friends
          </a>
          <a href="#">
            <img src={groupImg} alt="group" /> Group
          </a>
          <a href="#">
            <img src={marketplaceImg} alt="marketplace" /> Marketplace
          </a>
          <a href="#">
            <img src={watchImg} alt="watch" /> Watch
          </a>
          <a href="#"> See More </a>
        </div>
        <div className="shortcut-links">
          <p>Your Shortcuts</p>
          <a href="#">
            <img src={Shortcut1} alt="" /> Web Developers
          </a>
          <a href="#">
            <img src={Shortcut2} alt="" /> Web Design Course
          </a>
          <a href="#">
            <img src={Shortcut3} alt="" /> Full Stack Developer
          </a>
          <a href="#">
            <img src={Shortcut4} alt="" /> Website Experts
          </a>
        </div>
      </div>

      <div className="main-content">
        <div className="story-gallery">
          <div className="story story1">
            <img src={UploadImg1} alt="uploadImg1" />
            <p>Post Story</p>
          </div>
          <div className="story story2">
            <img src={Member1} alt="member1" />
            <p>Alison</p>
          </div>
          <div className="story story3">
            <img src={Member2} alt="member2" />
            <p>Jackson</p>
          </div>
          <div className="story story4">
            <img src={Member3} alt="member3" />
            <p>Samona</p>
          </div>
          <div className="story story5">
            <img src={Member4} alt="member4" />
            <p>John Doe</p>
          </div>
        </div>
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
                <img src={LiveVideo} alt="liveVideo" /> Live Video
              </a>
              <a href="#">
                <img src={Photo} alt="photoVideo" /> Photo/Video
              </a>
              <a href="#">
                <img src={Feeling} alt="feeling" /> Feeling/Activity{" "}
              </a>
            </div>
          </div>
        </div>
    {/* START */}
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
            <a href="#">#Ionutb99Tutorials</a> <a href="#"> #YoutubeChannel</a>
          </p>
          <img src={FeedImage1} alt="feedImage" className="post-img" />

          <div className="post-row">
            <div className="activity-icons">
              <div>
                <img src={LikeBlueBtn} alt="likeBlue" /> 120
              </div>
              <div>
                <img src={CommentsBtn} alt="likeBlue" /> 45
              </div>
              <div>
                <img src={ShareBtn} alt="likeBlue" /> 20
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
            <a href="#">#Ionutb99Tutorials</a> <a href="#"> #YoutubeChannel</a>
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
            <a href="#">#Ionutb99Tutorials</a> <a href="#"> #YoutubeChannel</a>
          </p>
          <img src={FeedImage3} alt="feedImage3" className="post-img" />

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
            <a href="#">#Ionutb99Tutorials</a> <a href="#"> #YoutubeChannel</a>
          </p>
          <img src={FeedImage4} alt="feedImage4" className="post-img" />

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
            <a href="#">#Ionutb99Tutorials</a> <a href="#"> #YoutubeChannel</a>
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
         {/* stop */}

        <button type="button" className="load-more-btn" > Load More</button>




      </div>

      <div className="right-sidebar">
        <div className="sidebar-title">
          <h4> Events</h4>
          <a href="#"> See All</a>
        </div>

        <div className="event">
          <div className="left-event">
            <h3>31</h3>
            <span>August</span>
          </div>
          <div className="right-event">
            <h4>Social Media</h4>
            <p>
              <FontAwesomeIcon icon={faLocationDot} /> Willson Tech Park
            </p>
            <a href="#moreInfo">More Info</a>
          </div>
        </div>
        <div className="event">
          <div className="left-event">
            <h3>22</h3>
            <span>September</span>
          </div>
          <div className="right-event">
            <h4>Mobile Marketing</h4>
            <p>
              <FontAwesomeIcon icon={faLocationDot} /> Willson Tech Park
            </p>
            <a href="#moreInfo">More Info</a>
          </div>
        </div>
        <div className="sidebar-title">
          <h4> Advertisment</h4>
          <a href="#"> Close</a>
        </div>
        <img src={Advertisement} alt="advertisement" className="sidebar-ads" />

        <div className="sidebar-title">
          <h4> Conversation</h4>
          <a href="#"> Hide Chat</a>
        </div>

        <div className="online-list">
          <div className="online">
            <img src={Member1} alt="member1" />
          </div>
          <p> Alison Mina</p>
        </div>
        <div className="online-list">
          <div className="online">
            <img src={Member2} alt="member2" />
          </div>
          <p> Jackson Aston</p>
        </div>
        <div className="online-list">
          <div className="online">
            <img src={Member3} alt="member3" />
          </div>
          <p> Samona Rose</p>
        </div>
        <div className="online-list">
          <div className="online">
            <img src={Member4} alt="member4" />
          </div>
          <p> John Doe</p>
        </div>



      </div>
      
    </div>

  );
};

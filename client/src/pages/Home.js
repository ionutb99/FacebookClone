import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import newsImg from "../images/news.png";
import friendsImg from "../images/friends.png";
import groupImg from "../images/news.png";
import marketplaceImg from "../images/marketplace.png";
import watchImg from "../images/watch.png";
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

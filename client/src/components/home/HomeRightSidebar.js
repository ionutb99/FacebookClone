import Advertisement from "../../images/advertisement.png";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Member1 from "../../images/member-1.png";
import Member2 from "../../images/member-2.png";
import Member3 from "../../images/member-3.png";
import Member4 from "../../images/member-4.png";

import React from "react";

export const RightSidebar = () => {
  return (
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
    </div>
  );
};

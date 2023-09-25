import React from "react";
import notification from "../images/notification.png";
import logo from "../images/logo.png";
import inbox from "../images/inbox.png";
import video from "../images/video.png";
import search from "../images/search.png";
import userIcon from "../images/profile-pic.png";


export const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <ul>
          <li>
            <img src={notification} alt="notification" />
          </li>
          <li>
            <img src={inbox} alt="inbox" />
          </li>
          <li>
            <img src={video} alt="video" />
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <div className="search-box">
          <img src={search} alt="search" />
          <input type="text" name="" id="" placeholder="Search" />
        </div>

        <div className="nav-user-icon online">
          <img src={userIcon} alt="" />
        </div>

      </div>
    </nav>
  );
};

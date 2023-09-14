import Shortcut1 from "../../images/shortcut-1.png";
import Shortcut2 from "../../images/shortcut-2.png";
import Shortcut3 from "../../images/shortcut-3.png";
import Shortcut4 from "../../images/shortcut-4.png";
import {
    LiveTvOutlined,
  LocalGroceryStore,
  Groups,
  Group,
  Newspaper,
} from "@mui/icons-material";

import React from "react";

export const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="imp-links">
        <a href="#">
          <Newspaper className="leftSideIcon" /> Latest News
        </a>
        <a href="#">
          <Group className="leftSideIcon" /> Friends
        </a>
        <a href="#">
          <Groups className="leftSideIcon" /> Group
        </a>
        <a href="#">
          <LocalGroceryStore className="leftSideIcon" /> Marketplace
        </a>
        <a href="#">
          <LiveTvOutlined className="leftSideIcon" /> Watch
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
  );
};

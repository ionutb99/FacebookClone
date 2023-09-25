import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ProfileJob from "../../images/profile-job.png";
import ProfileStudy from "../../images/profile-study.png";
import ProfileHome from "../../images/profile-home.png";
import ProfileLocation from "../../images/profile-location.png";

import {
  EditOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";


export const ProfileIntro = ({ currentUser }) => {
  const [isSettingsIntroOpen, setIsSettingsIntroOpen] = useState(false);

    const navigate = useNavigate();

    const settingsMenuToggle = () => {
        setIsSettingsIntroOpen(!isSettingsIntroOpen);
      };
      
  return (
    <div className="profile-intro">
      <h3>Intro</h3>
      <MoreHorizOutlined className="edit-intro" onClick={settingsMenuToggle} />
      <div
        className={isSettingsIntroOpen ? "intro-settings" : ""}
        onClick={() => navigate(`/profile/update-info/${currentUser._id}`)}
      >
        {isSettingsIntroOpen && (
            <>
              <div>
                <EditOutlined />{" "}
              </div>{" "}
              <div className="profile-settings-div">Edit</div>
            </>
          )}
      </div>
      <p className="intro-text">{currentUser?.intro} </p>
      <hr />
      <ul>
        <li>
          <img src={ProfileJob} alt="profileJob" />
          {currentUser?.profileJob}
        </li>
        <li>
          <img src={ProfileStudy} alt="profileStudy" />
          {currentUser?.profileStudy}
        </li>
        <li>
          <img src={ProfileStudy} alt="profileStudy" />
          {currentUser?.profileStudyGraduate}
        </li>
        <li>
          <img src={ProfileHome} alt="profileHome" />
          {currentUser?.profileHome}
        </li>
        <li>
          <img src={ProfileLocation} alt="profileLocation" />
          {currentUser?.profileLocation}
        </li>
      </ul>
    </div>
  );
};

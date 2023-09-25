import React, { useEffect, useState } from "react";
import { NotificationsNone, MessageOutlined } from "@mui/icons-material";
import logo from "../../images/logo.png";
import search from "../../images/search.png";
import FeedbackImg from "../../images/feedback.png";
import SettingsImg from "../../images/setting.png";
import ArrowImg from "../../images/arrow.png";
import HelpImg from "../../images/help.png";
import DisplayImg from "../../images/display.png";
import LogoutImg from "../../images/logout.png";
import { useNavigate } from "react-router-dom";
import Member1 from "../../images/member-1.png";

export const Navbar = ({
  currentUser,
  setCurrentUser,
  loading,
  setLoading,
}) => {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [darkSite, setDarkSite] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedPreference = localStorage.getItem("darkSitePreference");
    if (savedPreference !== null) {
      setDarkSite(JSON.parse(savedPreference));
    }
  }, []);

  const settingsMenuToggle = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  };

  const handleDarkSideClick = () => {
    const newDarkSite = !darkSite;
    setDarkSite(newDarkSite);
    localStorage.setItem("darkSitePreference", JSON.stringify(newDarkSite));
  };

  const handleLogout = () => {
    localStorage.setItem("user", null);
    setCurrentUser(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    if (darkSite) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkSite]);

  useEffect(() => {
    if (!currentUser) {
      setIsSettingsMenuOpen(false);
    }
  }, [currentUser]);

  return (
    <nav>
      <div className="nav-left">
        <img
          src={logo}
          alt="logo"
          className="logo"
          onClick={() => {
            currentUser && navigate("/");
          }}
        />
        <ul>
          <li onClick={() => setShowNotifications(!showNotifications)}>
            <NotificationsNone />
          </li>
          <li>
            <a href="/message">
              <MessageOutlined />
            </a>
          </li>
        </ul>
        {showNotifications && (
          <div className="notification-popup">
            <h3>Notifications</h3>
            <div className="notifications-chose">
              <p>New</p>
              <p>See All</p>
            </div>
            <div className="notification-content">
              <div className="left-notification">
                <img src={Member1} alt="profilePhoto" />
              </div>
              <div className="right-notification">
                <p>All the notifications text is here</p>
                <small>30 minutes</small>
              </div>
            </div>
            <div className="notification-content">
              <div className="left-notification">
                <img src={Member1} alt="profilePhoto" />
              </div>
              <div className="right-notification">
                <p>All the notifications text is here</p>
                <small>30 minutes ago</small>
              </div>
            </div>
            <div className="notification-content">
              <div className="left-notification">
                <img src={Member1} alt="profilePhoto" />
              </div>
              <div className="right-notification">
                <p>All the notifications text is here</p>
                <small>30 minutes ago</small>
              </div>
            </div>
            <div className="notification-content">
              <div className="left-notification">
                <img src={Member1} alt="profilePhoto" />
              </div>
              <div className="right-notification">
                <p>All the notifications text is here</p>
                <small>30 minutes ago</small>
              </div>
            </div>
            <div className="notification-content">
              <div className="left-notification">
                <img src={Member1} alt="profilePhoto" />
              </div>
              <div className="right-notification">
                <p>All the notifications text is here</p>
                <small>30 minutes ago</small>
              </div>
            </div>
          </div>
        )}
      </div>
      {currentUser ? (
        <div className="nav-right">
          <div className="search-box">
            <img src={search} alt="search" />
            <input type="text" name="" id="" placeholder="Search" />
          </div>

          <div className="nav-user-icon online" onClick={settingsMenuToggle}>
            <img
              src={`../images/${currentUser?.profileImage}`}
              alt=""
              className="profile-photo-nav"
            />
          </div>
        </div>
      ) : (
        <div className="nav-right">
          <div className="nav-user-icon">
            <button
              type="button"
              className="btnNavUser"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              type="button"
              className="btnNavUser"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      )}

      <div
        className={`settings-menu ${
          isSettingsMenuOpen ? "settings-menu-height" : ""
        }`}
      >
        <div
          id="dark-btn"
          className={darkSite ? "dark-btn-on" : ""}
          onClick={handleDarkSideClick}
        >
          <span></span>
        </div>

        <div className="settings-menu-inner">
          <div className="user-profile">
            <img
              src={`../images/${currentUser?.profileImage}`}
              alt="profileImg"
            />
            <div>
              <p>{currentUser?.firstName + " " + currentUser?.lastName}</p>
              <a href="/profile">See your profile</a>
            </div>
          </div>
          <hr />
          <div className="user-profile">
            <img src={FeedbackImg} alt="feedbackImg" />
            <div>
              <p>Give Feedback</p>
              <a href="#">Help us to improve the new design</a>
            </div>
          </div>
          <hr />

          <div className="setting-links">
            <img src={SettingsImg} alt="setingsImg" className="settings-icon" />
            <a href="#">
              Seetings & Privacy <img src={ArrowImg} alt="arrowImg" />
            </a>
          </div>
          <div className="setting-links">
            <img src={HelpImg} alt="helpImg" className="settings-icon" />
            <a href="#">
              Help & Support <img src={ArrowImg} alt="arrowImg" />
            </a>
          </div>
          <div className="setting-links">
            <img src={DisplayImg} alt="displayImg" className="settings-icon" />
            <a href="#">
              Display & Accessibility <img src={ArrowImg} alt="arrowImg" />
            </a>
          </div>
          <div className="setting-links">
            <img src={LogoutImg} alt="logoutImg" className="settings-icon" />
            <a onClick={handleLogout}>
              Logout <img src={ArrowImg} alt="arrowImg" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

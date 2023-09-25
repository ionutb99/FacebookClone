import React, { useState } from "react";
import { Add, EditOutlined, MoreHoriz } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const ProfileDetails = ({ currentUser }) => {
  const [isSettingsProfileOpen, setIsSettingsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const settingsProfileToggle = () => {
    setIsSettingsProfileOpen(!isSettingsProfileOpen);
  };
  return (
    <div className="profile-details">
      <div className="pd-left">
        <div className="pd-row">
          <img
            src={`../images/${currentUser?.profileImage}`}
            alt="profileImage"
            className="pd-image"
          />

          <div>
            <h3>
              {currentUser?.firstName} {currentUser?.lastName}
            </h3>
            <p>
              {
                currentUser?.friends.filter(
                  (friend) => friend.friendship_status == "friends"
                ).length
              }{" "}
              Friends
            </p>
            {/* <img src={} alt="member1" /> */}
          </div>
        </div>
      </div>

      <div className="pd-right">
        <button type="button">
          <Add /> <b>Add to story</b>
        </button>

        <br />
        <MoreHoriz
          className="edit-photo-cover"
          onClick={settingsProfileToggle}
        />
        <div
          className={isSettingsProfileOpen ? "profile-settings" : ""}
          onClick={() => navigate(`/photos/update/${currentUser._id}`)}
        >
          {isSettingsProfileOpen && (
            <>
              <div>
                <EditOutlined />{" "}
              </div>{" "}
              <div className="profile-settings-div">Edit</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

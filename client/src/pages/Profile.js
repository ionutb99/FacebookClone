import React from "react";
import { ProfilePosts } from "../components/profile/ProfilePosts";
import { ProfileDetails } from "../components/profile/ProfileDetails";

export const Profile = ({ currentUser, setCurrentUser, setFriendId }) => {
  console.log(currentUser);

  return (
    <div className="profile-container">
      <img
        src={`../images/${currentUser?.coverPhoto}`}
        alt="coverImg"
        className="cover-img"
      />
      <ProfileDetails currentUser={currentUser} />
      <ProfilePosts
        currentUser={currentUser}
        setFriendId={setFriendId}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

//420

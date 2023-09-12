import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendProfileDetails from "../components/FriendProfileDetails";
import ProfileInfoContent from "../components/FriendProfileInfo";

export const FriendProfile = ({
  friendId,
  setFriendId,
  currentUser,
  users,
  setUsers,
}) => {
  const [user, setUser] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/api/user/${friendId}`);
      const userData = response.data;
      setUser(userData);

      localStorage.setItem("friendUser", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const savedUserData = localStorage.getItem("friendUser");

    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setUser(userData);
    } else {
      fetchUsers();
    }
  }, [friendId]);

  return (
    <div className="profile-container">
      <img
        src={`../images/${user?.coverPhoto}`}
        alt="coverImg"
        className="cover-img"
      />
      <FriendProfileDetails
        user={user}
        currentUser={currentUser}
        setFriendId={setFriendId}
        users={users}
        setUsers={setUsers}
      />
      <ProfileInfoContent user={user } />

    </div>
  );
};

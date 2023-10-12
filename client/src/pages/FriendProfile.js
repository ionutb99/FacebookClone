import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendProfileDetails from "../components/friendProfile/FriendProfileDetails";
import FriendProfileInfo from "../components/friendProfile/FriendProfileInfo";

export const FriendProfile = ({
  friendId,
  setFriendId,
  currentUser,
  setCurrentUser,
  users,
  setUsers,
}) => {
  const [user, setUser] = useState([]);
  
  
  const fetchUsers = async () => {
    const friendID = JSON.parse(localStorage.getItem('friendProfile'));
    try {
      const response = await axios.get(`/api/user/${friendID._id}`);
      const userData = response.data;
      setUser(userData);

      localStorage.setItem("friendProfile", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const savedUserData = localStorage.getItem("friendProfile");

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
      <FriendProfileInfo user={user } currentUser={currentUser} setCurrentUser={setCurrentUser} setFriendId={setFriendId} />

    </div>
  );
};

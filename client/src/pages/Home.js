import React, { useEffect } from "react";
import { fetchUsers } from "../helpers/FetchAllUsers";
import { LeftSidebar } from "../components/home/HomeLeftSidebar";
import { RightSidebar } from "../components/home/HomeRightSidebar";
import { HomeMainContent } from "../components/home/HomeMainContent";

export const Home = ({ currentUser, setFriendId, users, setUsers }) => {
  useEffect(() => {
    localStorage.removeItem("friendUser");
    fetchUsers(setUsers);
  }, []);

  

  return (
    <div className="container">
      {currentUser ? (
        <>
          <LeftSidebar />
          <HomeMainContent
            currentUser={currentUser}
            users={users}
            setFriendId={setFriendId}
            setUsers={setUsers}
          />
          <RightSidebar />
        </>
      ) : (
        <div style={{}}>
          <b>You are not Logged In! </b>
        </div>
      )}
    </div>
  );
};

// 623

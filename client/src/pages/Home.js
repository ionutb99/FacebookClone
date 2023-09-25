import React, { useEffect } from "react";
import { fetchUsers } from "../helpers/FetchAllUsers";
import { LeftSidebar } from "../components/home/HomeLeftSidebar";
import { RightSidebar } from "../components/home/HomeRightSidebar";
import { HomeMainContent } from "../components/home/HomeMainContent";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


export const Home = ({
  currentUser,
  setCurrentUser,
  setFriendId,
  users,
  setUsers,
  loading, 
  setLoading
}) => {
  const navigate = useNavigate();

  const handleNotLogin = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/login");
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    localStorage.removeItem("friendUser");
    fetchUsers(setUsers);
  }, []);


  return (
    <>
      {currentUser ? (
        <div className="container">
          <LeftSidebar />
          <HomeMainContent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            users={users}
            setFriendId={setFriendId}
            setUsers={setUsers}
          />
          <RightSidebar currentUser={currentUser} />
        </div>
      ) : (
        <div className="not-logged-in" onMouseMove={handleNotLogin}>
          <ClipLoader
            color="red"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <b>You are not Logged In! </b>
          <p>
            You will be redirected to <a href="/login">Login</a>
          </p>
        </div>
      )}
    </>
  );
};

// 623

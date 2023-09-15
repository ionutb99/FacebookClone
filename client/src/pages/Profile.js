import React, { CSSProperties } from "react";
import { ProfilePosts } from "../components/profile/ProfilePosts";
import { ProfileDetails } from "../components/profile/ProfileDetails";
import FadeLoader from "react-spinners/FadeLoader";


export const Profile = ({
  currentUser,
  setCurrentUser,
  setFriendId,
  loading,
}) => {
  console.log(currentUser);

  const override: CSSProperties = {
    display: "block",
    margin: "100px auto",
    textAlign: 'center',
  };
  return (
    <>
      {loading ? (
        <FadeLoader
          color="red"
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
      ) : (
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
      )}
    </>
  );
};

//420

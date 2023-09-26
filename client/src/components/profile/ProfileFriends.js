import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFriendData } from "../../helpers/apiServices";

export const ProfileFriends = ({ currentUser, setFriendId }) => {
    const [friendData, setFriendData] = useState([]);

    const navigate = useNavigate();

    const friendsWithStatusFriends = currentUser?.friends.filter(
        (friend) => friend.friendship_status === "friends"
      );
  
      const handleFriendProfile = (friendId) => {
        const friend = friendData.find((friend) => friend._id === friendId);
    
        if (friend) {
          localStorage.setItem("friendProfile", JSON.stringify(friend));
          setFriendId(friendId);
          navigate(`/user/${friendId}`);
        }
      };

    useEffect(() => {
      const fetchData = async () => {
        const friendDataArray = await fetchFriendData(friendsWithStatusFriends);
        setFriendData(friendDataArray);
      };   
  
      fetchData();
    }, []);
    
  return (
    <div className="profile-intro">
      <div className="title-box">
        <h3>Friends</h3>
        <a>All Friends</a>
      </div>
      <p>
        {
          currentUser?.friends.filter(
            (friend) => friend.friendship_status == "friends"
          ).length
        }{" "}
        ( 0 mutual)
      </p>

      <div className="friend-box">
        {friendData.slice(0, 6).map((friend) => (
          <div key={friend._id}>
            <img
              src={`../images/${friend.profileImage}`}
              alt={`profile-${friend._id}`}
              onClick={() => handleFriendProfile(friend._id)}
            />
            <p>
              {friend.firstName} {friend.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

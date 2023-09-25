import Advertisement from "../../images/advertisement.png";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Member1 from "../../images/member-1.png";

import React, { useEffect, useState } from "react";
import { fetchFriendData } from "../../helpers/apiServices";
import { useNavigate } from "react-router-dom";

export const RightSidebar = ({ currentUser }) => {
  const [friendData, setFriendData] = useState([]);

  const navigate = useNavigate();
  
  const friendsWithStatusFriends = currentUser?.friends.filter(
    (friend) => friend.friendship_status === "friends"
  );

  useEffect(() => {
    const fetchData = async () => {

      const friendDataArray = await fetchFriendData(friendsWithStatusFriends);
      setFriendData(friendDataArray.slice(0, 5));
    };   

    fetchData();
  }, []);
  
  console.log(friendData)
  
  return (
    <div className="right-sidebar">
      <div className="sidebar-title">
        <h4> Events</h4>
        <a href="#"> See All</a> 
      </div>

      <div className="event">
        <div className="left-event">
          <h3>31</h3>
          <span>August</span>
        </div>
        <div className="right-event">
          <h4>Social Media</h4>
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> Willson Tech Park
          </p>
          <a href="#moreInfo">More Info</a>
        </div>
      </div>
      <div className="event">
        <div className="left-event">
          <h3>22</h3>
          <span>September</span>
        </div>
        <div className="right-event">
          <h4>Mobile Marketing</h4>
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> Willson Tech Park
          </p>
          <a href="#moreInfo">More Info</a>
        </div>
      </div>
      <div className="sidebar-title">
        <h4> Advertisment</h4>
        <a href="#"> Close</a>
      </div>
      <img src={Advertisement} alt="advertisement" className="sidebar-ads" />

      <div className="sidebar-title">
        <h4> Conversation</h4>
        <a href="#"> Hide Chat</a>
      </div>

      <div className="online-list">
        {friendData && friendData
          .map((user, idx) => (
            <div key={idx} className="online-content-list" onClick={() => navigate('/message')} >
              <div className="online">
                <img src={Member1} alt="userFriend" />
              </div>
              <p>{user.firstName}{" "}{user.lastName}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

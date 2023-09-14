import ProfileJob from "../../images/profile-job.png";
import ProfileStudy from "../../images/profile-study.png";
import ProfileHome from "../../images/profile-home.png";
import ProfileLocation from "../../images/profile-location.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ForumOutlined, ShareOutlined, ThumbUp } from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFriendData } from "../../helpers/apiServices";

const FriendProfileInfo = ({ user , currentUser, setFriendId}) => {
  const [friendData, setFriendData] = useState([]);

  const navigate = useNavigate();

  const friendsWithStatusFriends = currentUser?.friends.filter(
      (friend) => friend.friendship_status === "friends"
    );

  const handleFriendProfile = (personIds) => {
    setFriendId(personIds);
    navigate(`/user/${personIds}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const friendDataArray = await fetchFriendData(friendsWithStatusFriends);
      setFriendData(friendDataArray);
    };   

    fetchData();
  }, []);

  console.log(user)
  return (
    <div className="profile-info">
      <div className="info-col">
        <div className="profile-intro">
          <h3>Intro</h3>
          <p className="intro-text">{user?.intro} </p>
          <hr />
          <ul>
            <li>
              <img src={ProfileJob} alt="profileJob" />
              {user?.profileJob}
            </li>
            <li>
              <img src={ProfileStudy} alt="profileStudy" />
              {user?.profileStudy}
            </li>
            <li>
              <img src={ProfileStudy} alt="profileStudy" />
              {user?.profileStudyGraduate}
            </li>
            <li>
              <img src={ProfileHome} alt="profileHome" />
              {user?.profileHome}
            </li>
            <li>
              <img src={ProfileLocation} alt="profileLocation" />
              {user?.profileLocation}
            </li>
          </ul>
        </div>

        <div className="profile-intro">
          <div className="title-box">
            <h3>Photos</h3>
            <a href="#">All Photos</a>
          </div>

          <div className="photo-box">
            {user?.posts?.map((post, idx) => (
              <div key={idx}>
                <img
                  src={`../images/${post?.postContent}`}
                  alt="photoContent"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="profile-intro">
          <div className="title-box">
            <h3>Friends</h3>
            <a href="#">All Friends</a>
          </div>
          <p>{user?.friends?.length} ( 0 mutual)</p>

          <div className="friend-box">
            {friendData?.map((friend) => (
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

          <div className="friend-box"></div>
        </div>
      </div>
      <div className="post-col">
        {user?.posts?.map((post, idx) => (
          <div className="post-container" key={idx}>
            <div className="post-row">
              <div className="user-profile">
                <img src={`../images/${user?.profileImage}`} alt="profileImg" />
                <div>
                  <p>{user?.firstName + " " + user?.lastName}</p>
                  <span>{post?.timestamp}</span>
                </div>
              </div>
            </div>
            <p className="post-text">{post?.text}</p>
            <img
              src={`../images/${post?.postContent}`}
              alt="feedImage"
              className="post-img"
            />

            <div className="post-row">
              <div className="activity-icons">
                <div>
                  <ThumbUp className="likeButton" /> {post?.likes?.length}
                </div>
                <div>
                  <ForumOutlined className="commentShareBtn" />{" "}
                  {post?.comments?.length}
                </div>
                <div>
                  <ShareOutlined className="commentShareBtn" />{" "}
                  {post?.shares?.length}
                </div>
              </div>
              <div className="post-profile-icon">
                <img src={`../images/${user?.profileImage}`} alt="profileImg" />
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendProfileInfo;

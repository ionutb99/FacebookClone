import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Add,
  ForumOutlined,
  MoreHoriz,
  ShareOutlined,
  ThumbUp,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Member1 from "../images/member-1.png";
import Member2 from "../images/member-2.png";
import Member3 from "../images/member-3.png";
import ProfileJob from "../images/profile-job.png";
import ProfileStudy from "../images/profile-study.png";
import ProfileHome from "../images/profile-home.png";
import ProfileLocation from "../images/profile-location.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { addFriendHandle } from "../helpers/AddFriendHandle";

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

  console.log(user);

  return (
    <div className="profile-container">
      <img
        src={`../images/${user?.coverPhoto}`}
        alt="coverImg"
        className="cover-img"
      />
      <div className="profile-details">
        <div className="pd-left">
          <div className="pd-row">
            <img
              src={`../images/${user?.profileImage}`}
              alt="profileImage"
              className="pd-image"
            />

            <div>
              <h3>
                {user?.firstName} {user?.lastName}
              </h3>
              <p>{user?.friends?.length} Friends</p>
              {/* <img src={Member1} alt="member1" /> */}
            </div>
          </div>
        </div>

        <div className="pd-right">
          {user?.friends &&
          user.friends.some((friend) => friend.user_id === currentUser._id) ? (
            <div className="friends-status">
              <h4>
                {" "}
                {
                  user.friends.find(
                    (friend) => friend.user_id === currentUser._id
                  )?.friendship_status
                }
              </h4>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                addFriendHandle(
                  user?._id,
                  currentUser,
                  setFriendId,
                  users,
                  setUsers
                )
              }
            >
              <Add /> <b>Add Friend</b>
            </button>
          )}

          <br />
          <MoreHoriz className="edit-photo-cover" />
        </div>
      </div>

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
              <div>
                <img src={Member1} alt="member1" />
                <p>Joseph N</p>
              </div>
              <div>
                <img src={Member2} alt="member2" />
                <p>Nathan N</p>
              </div>
              <div>
                <img src={Member3} alt="member3" />
                <p>George D</p>
              </div>
            </div>
          </div>
        </div>
        <div className="post-col">
          {user?.posts?.map((post, idx) => (
            <div className="post-container" key={idx}>
              <div className="post-row">
                <div className="user-profile">
                  <img
                    src={`../images/${user?.profileImage}`}
                    alt="profileImg"
                  />
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
                  <img
                    src={`../images/${user?.profileImage}`}
                    alt="profileImg"
                  />
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

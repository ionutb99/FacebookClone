import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCaretDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

import Member1 from "../images/member-1.png";
import Member2 from "../images/member-2.png";
import Member3 from "../images/member-3.png";
import Member4 from "../images/member-4.png";
import UploadImg1 from "../images/upload.png";
import ProfileImg from "../images/profile-pic.png";
import FeedImage1 from "../images/feed-image-1.png";
import FeedImage2 from "../images/feed-image-2.png";
import FeedImage3 from "../images/feed-image-3.png";
import FeedImage4 from "../images/feed-image-4.png";
import FeedImage5 from "../images/feed-image-5.png";
import {
  ForumOutlined,
  ShareOutlined,
  ThumbUp,
  VideoCall,
  PhotoCamera,
  InsertEmoticonOutlined,
  PersonAdd,
  ArrowCircleRightOutlined,
  ArrowCircleLeftOutlined,
  Close,
  DoneOutline,
} from "@mui/icons-material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addFriendHandle } from "../helpers/AddFriendHandle";
import { fetchUsers } from "../helpers/FetchAllUsers";
import {
  scrollToPreviousPerson,
  scrollToNextPerson,
} from "../helpers/scrollUtils";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";

export const Home = ({ currentUser, setFriendId, users, setUsers }) => {
  useEffect(() => {
    localStorage.removeItem("friendUser");
    fetchUsers(setUsers);
  }, []);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleScrollToPreviousPerson = () => {
    scrollToPreviousPerson(containerRef);
  };

  const handleScrollToNextPerson = () => {
    scrollToNextPerson(containerRef);
  };

  const profileImageClicked = (personId) => {
    setFriendId(personId);
    if (currentUser._id === personId) {
      navigate(`/profile`);
    } else {
      navigate(`/user/${personId}`);
    }
  };

  const handleFriendRequest = async (personId, acceptRequest) => {
    try {
      setFriendId(personId);

      const updatedCurrentUser = {
        ...currentUser,
        friends: currentUser.friends.map((friend) => {
          if (friend.user_id === personId) {
            return {
              ...friend,
              friendship_status: acceptRequest ? "friends" : "declined",
            };
          }
          return friend;
        }),
      };

      localStorage.setItem("user", JSON.stringify(updatedCurrentUser));

      const updatedUsers = users.map((person) => {
        if (person._id === personId) {
          return {
            ...person,
            friendship_status: acceptRequest ? "friends" : "declined",
          };
        } else if (person._id === currentUser._id) {
          return {
            ...person,
            friends: [
              ...person.friends,
              {
                user_id: personId,
                friendship_status: acceptRequest ? "friends" : "declined",
              },
            ],
          };
        }
        return person;
      });

      setUsers(updatedUsers);

      if (acceptRequest) {
        await axios.post(
          `/api/accept-friend-request/${currentUser._id}/${personId}`
        );
      } else {
        await axios.post(
          `/api/decline-friend-request/${currentUser._id}/${personId}`
        );
      }
    } catch (error) {
      console.error("Error handling friend request: ", error);
    }
  };

  const acceptFriendRequest = async (personId) => {
    handleFriendRequest(personId, true);
    window.location.reload();
  };

  const declineFriendRequest = async (personId) => {
    handleFriendRequest(personId, false);
    window.location.reload();
  };

  return (
    <div className="container">
      {currentUser ? (
        <>
          <LeftSidebar />
          <div className="main-content">
            <div className="story-gallery">
              <div
                className="story story1"
                style={{
                  backgroundImage: `url(../images/${currentUser?.profileImage})`,
                }}
              >
                <img src={UploadImg1} alt="uploadImg1" />
                <p>Post Story</p>
              </div>
              <div className="story story2">
                <img src={Member1} alt="member1" />
                <p>Alison</p>
              </div>
              <div className="story story3">
                <img src={Member2} alt="member2" />
                <p>Jackson</p>
              </div>
              <div className="story story4">
                <img src={Member3} alt="member3" />
                <p>Samona</p>
              </div>
              <div className="story story5">
                <img src={Member4} alt="member4" />
                <p>John Doe</p>
              </div>
            </div>
            <div className="write-post-container">
              <div className="user-profile">
                <img
                  src={`../images/${currentUser?.profileImage}`}
                  alt="profileImg"
                />
                <div>
                  <p>{currentUser?.firstName + " " + currentUser?.lastName}</p>
                  <small>
                    Public <FontAwesomeIcon icon={faCaretDown} />
                  </small>
                </div>
              </div>

              <div className="post-input-container">
                <div className="input-row">
                  <textarea
                    rows="3"
                    placeholder="What's on your mind, John?"
                  ></textarea>
                </div>
                <div className="add-post-links">
                  <a>
                    <VideoCall className="addPostIconLive" /> Live Video
                  </a>
                  <a>
                    <PhotoCamera className="addPostIconPhoto" /> Photo/Video
                  </a>
                  <a>
                    <InsertEmoticonOutlined className="addPostIconFeeling" />{" "}
                    Feeling/Activity{" "}
                  </a>
                </div>
              </div>
            </div>

            <br />

            <div className="people-you-might-know">
              <ArrowCircleLeftOutlined
                onClick={handleScrollToPreviousPerson}
                className="arrow-left-friends "
              />
              <h2>People You Might Know</h2>
              <div className="people-cards-container" ref={containerRef}>
                <div className="people-cards">
                  {users
                    .filter((person) => person._id !== currentUser._id)
                    .filter((person) => {
                      const friendStatus = currentUser.friends?.find(
                        (friend) => friend.user_id === person._id
                      )?.friendship_status;

                      return friendStatus !== "friends";
                    })
                    .map((person) => (
                      <div key={person._id} className="person-card">
                        <img
                          src={`../images/${person.profileImage}`}
                          alt={person.name}
                          onClick={() => profileImageClicked(person._id)}
                        />
                        <h3>
                          {person.firstName} {person.lastName}
                        </h3>

                        {currentUser.friends?.find(
                          (friend) => friend.user_id === person._id
                        ) ? (
                          currentUser.friends?.find(
                            (friend) => friend.user_id === person._id
                          ).friendship_status === "request" ? (
                            <div className="request-buttons">
                              <DoneOutline
                                style={{ cursor: "pointer" }}
                                onClick={() => acceptFriendRequest(person._id)}
                              />
                              <Close
                                style={{ cursor: "pointer" }}
                                onClick={() => declineFriendRequest(person._id)}
                              />
                            </div>
                          ) : (
                            <div className="add-friend-btn">
                              <span>
                                {
                                  currentUser.friends?.find(
                                    (friend) => friend.user_id === person._id
                                  ).friendship_status
                                }
                              </span>
                            </div>
                          )
                        ) : (
                          <div className="add-friend-btn">
                            <div
                              onClick={() =>
                                addFriendHandle(
                                  person._id,
                                  currentUser,
                                  setFriendId,
                                  users,
                                  setUsers
                                )
                              }
                            >
                              <PersonAdd />
                              <span> Add </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <ArrowCircleRightOutlined
                onClick={handleScrollToNextPerson}
                className="arrow-right-friends"
              />
            </div>

            <br />

            {/* START */}
            <div className="post-container">
              <div className="post-row">
                <div className="user-profile">
                  <img src={ProfileImg} alt="profileImg" />
                  <div>
                    <p>John Nicholson</p>
                    <span>August 31 2023, 17:59 pm</span>
                  </div>
                </div>
                <a href="#">
                  {" "}
                  <FontAwesomeIcon icon={faEllipsisV} />
                </a>
              </div>
              <p className="post-text">
                Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos
                on website development and Ui design.{" "}
                <a href="#">#Ionutb99Tutorials</a>{" "}
                <a href="#"> #YoutubeChannel</a>
              </p>
              <img src={FeedImage1} alt="feedImage" className="post-img" />

              <div className="post-row">
                <div className="activity-icons">
                  <div>
                    <ThumbUp className="likeButton" /> 120
                  </div>
                  <div>
                    <ForumOutlined className="commentShareBtn" /> 45
                  </div>
                  <div>
                    <ShareOutlined className="commentShareBtn" /> 20
                  </div>
                </div>
                <div className="post-profile-icon">
                  <img src={ProfileImg} alt="profileImg" />
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>

            <div className="post-container">
              <div className="post-row">
                <div className="user-profile">
                  <img src={ProfileImg} alt="profileImg" />
                  <div>
                    <p>John Nicholson</p>
                    <span>August 31 2023, 17:59 pm</span>
                  </div>
                </div>
                <a href="#">
                  {" "}
                  <FontAwesomeIcon icon={faEllipsisV} />
                </a>
              </div>
              <p className="post-text">
                Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos
                on website development and Ui design.{" "}
                <a href="#">#Ionutb99Tutorials</a>{" "}
                <a href="#"> #YoutubeChannel</a>
              </p>
              <img src={FeedImage2} alt="feedImage2" className="post-img" />

              <div className="post-row">
                <div className="activity-icons">
                  <div>
                    <ThumbUp className="likeButton" /> 157
                  </div>
                  <div>
                    <ForumOutlined className="commentShareBtn" /> 40
                  </div>
                  <div>
                    <ShareOutlined className="commentShareBtn" /> 12
                  </div>
                </div>
                <div className="post-profile-icon">
                  <img src={ProfileImg} alt="profileImg" />
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>

            <div className="post-container">
              <div className="post-row">
                <div className="user-profile">
                  <img src={ProfileImg} alt="profileImg" />
                  <div>
                    <p>John Nicholson</p>
                    <span>August 31 2023, 17:59 pm</span>
                  </div>
                </div>
                <a href="#">
                  {" "}
                  <FontAwesomeIcon icon={faEllipsisV} />
                </a>
              </div>
              <p className="post-text">
                Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos
                on website development and Ui design.{" "}
                <a href="#">#Ionutb99Tutorials</a>{" "}
                <a href="#"> #YoutubeChannel</a>
              </p>
              <img src={FeedImage3} alt="feedImage3" className="post-img" />

              <div className="post-row">
                <div className="activity-icons">
                  <div>
                    <ThumbUp className="likeButton" /> 120
                  </div>
                  <div>
                    <ForumOutlined className="commentShareBtn" /> 45
                  </div>
                  <div>
                    <ShareOutlined className="commentShareBtn" /> 20
                  </div>
                </div>
                <div className="post-profile-icon">
                  <img src={ProfileImg} alt="profileImg" />
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>
            <div className="post-container">
              <div className="post-row">
                <div className="user-profile">
                  <img src={ProfileImg} alt="profileImg" />
                  <div>
                    <p>John Nicholson</p>
                    <span>August 31 2023, 17:59 pm</span>
                  </div>
                </div>
                <a href="#">
                  {" "}
                  <FontAwesomeIcon icon={faEllipsisV} />
                </a>
              </div>
              <p className="post-text">
                Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos
                on website development and Ui design.{" "}
                <a href="#">#Ionutb99Tutorials</a>{" "}
                <a href="#"> #YoutubeChannel</a>
              </p>
              <img src={FeedImage4} alt="feedImage4" className="post-img" />

              <div className="post-row">
                <div className="activity-icons">
                  <div>
                    <ThumbUp className="likeButton" /> 120
                  </div>
                  <div>
                    <ForumOutlined className="commentShareBtn" /> 45
                  </div>
                  <div>
                    <ShareOutlined className="commentShareBtn" /> 20
                  </div>
                </div>
                <div className="post-profile-icon">
                  <img src={ProfileImg} alt="profileImg" />
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>
            <div className="post-container">
              <div className="post-row">
                <div className="user-profile">
                  <img src={ProfileImg} alt="profileImg" />
                  <div>
                    <p>John Nicholson</p>
                    <span>August 31 2023, 17:59 pm</span>
                  </div>
                </div>
                <a href="#">
                  {" "}
                  <FontAwesomeIcon icon={faEllipsisV} />
                </a>
              </div>
              <p className="post-text">
                Subscribe <span>@Ionutb99 Tutorials</span> to watch more videos
                on website development and Ui design.{" "}
                <a href="#">#Ionutb99Tutorials</a>{" "}
                <a href="#"> #YoutubeChannel</a>
              </p>
              <img src={FeedImage5} alt="feedImage5" className="post-img" />

              <div className="post-row">
                <div className="activity-icons">
                  <div>
                    <ThumbUp className="likeButton" /> 120
                  </div>
                  <div>
                    <ForumOutlined className="commentShareBtn" /> 45
                  </div>
                  <div>
                    <ShareOutlined className="commentShareBtn" /> 20
                  </div>
                </div>
                <div className="post-profile-icon">
                  <img src={ProfileImg} alt="profileImg" />
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>
            {/* stop */}

            <button type="button" className="load-more-btn">
              {" "}
              Load More
            </button>
          </div>
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

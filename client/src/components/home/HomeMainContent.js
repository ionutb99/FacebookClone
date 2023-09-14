import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import Member1 from "../../images/member-1.png";
import Member2 from "../../images/member-2.png";
import Member3 from "../../images/member-3.png";
import Member4 from "../../images/member-4.png";
import UploadImg1 from "../../images/upload.png";
import {
  VideoCall,
  PhotoCamera,
  InsertEmoticonOutlined,
  PersonAdd,
  ArrowCircleRightOutlined,
  ArrowCircleLeftOutlined,
  Close,
  DoneOutline,
} from "@mui/icons-material";
import { addFriendHandle } from "../../helpers/AddFriendHandle";
import { PostContentHome } from "./PostContentHome";
import { useRef } from "react";
import {
  scrollToNextPerson,
  scrollToPreviousPerson,
} from "../../helpers/scrollUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const HomeMainContent = ({
  currentUser,
  users,
  setFriendId,
  setUsers,
}) => {
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
      <PostContentHome />
      <button type="button" className="load-more-btn">
        {" "}
        Load More
      </button>
    </div>
  );
};

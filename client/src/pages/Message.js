import React, { useEffect, useRef, useState } from "react";
import Member1 from "../images/member-1.png";
import { Search, Send } from "@mui/icons-material";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

// Sample data for people and conversations

export const Message = ({ currentUser }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [friends, setFriends] = useState([]);
  const [messageWrite, setMessageWrite] = useState([]);
  const [messages, setMessages] = useState([]);

  const topMainRef = useRef(null);

  const scrollToBottom = () => {
    if (topMainRef.current) {
      topMainRef.current.scrollTop = topMainRef.current.scrollHeight;
    }
  };

  const handleConversationClick = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  const filteredPeople = friends.filter((friend) => {
    const firstNameMatch = friend.firstName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const lastNameMatch = friend.lastName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return firstNameMatch || lastNameMatch;
  });

  const selectedFriend = friends.find(
    (friend) => friend._id === selectedConversation
  );

  const currentTime = new Date();

  const messageTimestamp = (message) => {
    if (message) {
      const messageTime = new Date(message.timestamp);
      const timeDifferenceMs = currentTime - messageTime;
      const seconds = Math.floor(timeDifferenceMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      let result;
      if (days > 0) {
        result = `${days} day${days > 1 ? "s ago" : ""}`;
      } else if (hours > 0) {
        result = `${hours} h${hours > 1 ? "s ago" : ""}`;
      } else if (minutes > 0) {
        result = `${minutes} min${minutes > 1 ? "s ago" : ""}`;
      } else {
        result = `${seconds} sec${seconds > 1 ? " ago" : ""}`;
      }
      
      return result;
    }
    return null;
  }

  
  const filteredMessagesForUser = selectedFriend?.messages.filter((message) => {
    return (
      (message.sender_id === selectedFriend._id &&
        message.recipient_id === currentUser._id) ||
        (message.sender_id === currentUser._id &&
          message.recipient_id === selectedFriend._id)
          );
        });
        
  useEffect(() => {
    async function getFriendsForMessages() {
      try {
        const allFriendsWithDetails = [];

        for (const friend of currentUser.friends) {
          const response = await axios.get(`/api/user/${friend.user_id}`);
          if (response.status === 200) {
            const friendData = response.data;
            allFriendsWithDetails.push(friendData);
          }
        }

        setFriends(allFriendsWithDetails);
      } catch (error) {
        console.log("Error finding frineds:", error);
      }
    }
    getFriendsForMessages();
  }, [currentUser]);

  const sendMessage = async () => {
    try {
      const text = messageWrite;

      const messageData = {
        sender_id: currentUser._id,
        recipient_id: selectedFriend._id,
        text,
      };

      await axios.post("/api/send-message", messageData);
      setMessageWrite("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [sendMessage]);

  const override: CSSProperties = {
    position: "absolute",
    top: "20%",
    right: "0%",
    margin: "200px auto",
    textAlign: "center",
  };

  // console.log(filteredMessagesForUser)
  // console.log(messageTimestamp( selectedFriend?.messages[0]))


  return (
    <div className="message-app">
      {friends.length < 1 ? (
        <FadeLoader
          color="red"
          loading={friends.length < 1}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="people-sidebar">
          <h2>Friends</h2>
          <div>
            {filteredPeople.map((person, idx) => (
              <div
                className="people-name"
                key={idx}
                onClick={() => handleConversationClick(person._id)}
              >
                <div className="online">
                  <img src={`../images/${person.profileImage}`} alt="" />
                </div>
                <p>
                  {person.firstName} {person.lastName}
                </p>
              </div>
            ))}
          </div>
          <div className="search-friend-message">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Search />
          </div>
        </div>
      )}
      {friends.length > 0 && (
        <div className="conversation-main">
          {selectedConversation ? (
            <div>
              <h2>
                Conversation with{" "}
                <b>
                  {selectedFriend.firstName} {selectedFriend.lastName}
                </b>
              </h2>
              <div className="conversation-section">
                <div className="top-main" ref={topMainRef}>
                  {filteredMessagesForUser.map((message, index) => (
                    <p
                      key={index}
                      className={
                        message.recipient_id === currentUser._id
                          ? "connected-user-messages"
                          : "recevieved-messages"
                      }
                    >
                      {message.text}
                        <small>{messageTimestamp(message)} </small>
                    </p>
                  ))}
                </div>
                <div className="bottom-main">
                  <textarea
                    onChange={(e) => setMessageWrite(e.target.value)}
                    className="write-messge"
                    name="write-messge"
                    id=""
                    rows="4"
                    value={messageWrite}
                  ></textarea>
                  <button type="second" onClick={sendMessage}>
                    <Send />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Select a conversation to start chatting</p>
          )}
        </div>
      )}
    </div>
  );
};

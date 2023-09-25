import React, { useState } from "react";
import Member1 from "../images/member-1.png";
import { Search, Send } from "@mui/icons-material";

// Sample data for people and conversations
const people = [
  { id: 1, name: "Vlad Anderi" },
  { id: 2, name: "Marius Adrian Szecheli" },
  { id: 3, name: "Simona Halep" },
];

const conversations = [
  { id: 1, withPerson: "Person 1", messages: ["Hi", "Hello!"] },
  { id: 2, withPerson: "Person 2", messages: ["How are you?", "I am good."] },
  { id: 3, withPerson: "Person 3", messages: ["Hey", "Nice to meet you."] },
];

export const Message = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleConversationClick = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  const filteredPeople = people.filter((person) =>
  person.name.toLowerCase().includes(searchInput.toLowerCase())
);

  return (
    <div className="message-app">
      <div className="people-sidebar">
        <h2>Friends</h2>
        <div>
        {filteredPeople.map((person) => (
            <div
              className="people-name"
              key={person.id}
              onClick={() => handleConversationClick(person.id)}
            >
              <div className="online">
                <img src={Member1} alt="" />
              </div>
              <p>{person.name}</p>
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
      <div className="conversation-main">
        {selectedConversation ? (
          <div>
            <h2>
              Conversation with{" "}
              {conversations[selectedConversation - 1].withPerson}
            </h2>
            <div className="conversation-section">
              <div className="top-main">
                {conversations[selectedConversation - 1].messages.map(
                  (message, index) => (
                    <p key={index}>{message}</p>
                  )
                )}
              </div>
              <div className="bottom-main">
                <textarea
                  className="write-messge"
                  name="write-messge"
                  id=""
                  rows="4"
                ></textarea>
                <button type="second">
                  <Send />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
};

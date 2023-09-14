import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { PostCreationContent } from "./postCreationContent";

const PostInput = ({
  currentUser,
  setCurrentUser
}) => {

  return (
    <div className="write-post-container">
      <div className="user-profile">
        <img src={`../images/${currentUser?.profileImage}`} alt="profileImg" />
        <div>
          <p>{currentUser?.firstName + " " + currentUser?.lastName}</p>
          <small>
            Public <FontAwesomeIcon icon={faCaretDown} />
          </small>
        </div>
      </div>
      <PostCreationContent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    </div>
  );
};

export default PostInput;

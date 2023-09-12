import React from "react";
import { Add, MoreHoriz} from "@mui/icons-material";
import { addFriendHandle } from "../helpers/AddFriendHandle";

const FriendProfileDetails = ({
  user,
  currentUser,
  setFriendId,
  users,
  setUsers,
}) => {
  return (
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
  );
};

export default FriendProfileDetails;

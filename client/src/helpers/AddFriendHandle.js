import axios from "axios";


export const addFriendHandle = async (personId,currentUser, setFriendId, users, setUsers ) => {
    try {
      setFriendId(personId);

      const updatedCurrentUser = {
        ...currentUser,
        friends: [
          ...currentUser.friends,
          {
            user_id: personId,
            friendship_status: "pending",
          },
        ],
      };

      localStorage.setItem("user", JSON.stringify(updatedCurrentUser));

      const updatedUsers = users.map((person) => {
        if (person._id === personId) {
          return {
            ...person,
            friendship_status: "pending",
          };
        } else if (person._id === currentUser._id) {
          return {
            ...person,
            friends: [
              ...person.friends,
              {
                user_id: personId,
                friendship_status: "pending",
              },
            ],
          };
        }
        return person;
      });

      setUsers(updatedUsers);
      window.location.reload();

      await axios.post(`/api/add-friend/${currentUser._id}/${personId}`);
    } catch (error) {
      console.error("Error adding friend: ", error);
    }
  };
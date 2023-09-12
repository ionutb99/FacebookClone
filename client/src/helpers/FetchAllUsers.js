import axios from "axios";

export const fetchUsers = async (setUsers) => {
  await axios
    .get("/api")
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
};

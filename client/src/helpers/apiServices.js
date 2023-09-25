import axios from "axios";

export const deletePost = async (postId, setCurrentUser) => {
  console.log(postId);
  try {
    await axios.delete(`/api/posts/delete/${postId}`);

    const userDataString = localStorage.getItem("user");

    const currentUser = JSON.parse(userDataString);

    const updatedPosts = currentUser.posts.filter(
      (post) => post._id !== postId
    );

    setCurrentUser({
      ...currentUser,
      posts: updatedPosts,
    });

    const updatedUser = {
      ...currentUser,
      posts: updatedPosts,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error deleting post: ", error);
  }
};

export const addPost = async (
  currentUser,
  setCurrentUser,
  setPostText,
  setPhotoVideoContent,
  postText,
  photoVideoContent
) => {
  try {
    if (!postText || !photoVideoContent) {
      console.error("Post text and photo/video content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("text", postText);
    formData.append("postContent", photoVideoContent);

    const response = await axios.post(
      `/api/posts/create/${currentUser?._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const newPost = response.data.posts[response.data.posts.length - 1];
    const updatedPosts = [...currentUser.posts, newPost];

    setCurrentUser({
      ...currentUser,
      posts: updatedPosts,
    });

    const updatedUser = {
      ...currentUser,
      posts: updatedPosts,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setPostText("");
    setPhotoVideoContent(null);
  } catch (error) {
    console.error(
      "Error creating post: ",
      error.response?.data || error.message
    );
  }
};

export const fetchFriendDataById = async (friendId) => {
  try {
    const response = await axios.get(`/api/user/${friendId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching friend data: ", error);
    return null;
  }
};


export const fetchFriendData = async (friendsWithStatusFriends) => {
  const friendIds = friendsWithStatusFriends?.map((friend) => friend.user_id);
  if (friendIds) {
    const friendPromises = friendIds?.map(async (friendId) => {
      try {
        const response = await axios.get(`/api/user/${friendId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching friend data: ", error);
        return null;
      }
    });

    localStorage.removeItem("friendUser");
    const friendDataArray = await Promise.all(friendPromises);

    return friendDataArray.filter(Boolean);
  }
};

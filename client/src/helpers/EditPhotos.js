import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditPhotos = ({ currentUser, setCurrentUser }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const navigate = useNavigate();

  const handleProfileImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleCoverPhotoChange = (event) => {
    setCoverPhoto(event.target.files[0]);
  };

  const handleUpdatePhotos = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("coverPhoto", coverPhoto);

      const response = await axios.put(`/api/photos/update/${currentUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Photos updated:", response.data);

      const updatedUser = {
        ...currentUser,
        profileImage: response.data.profileImage,
        coverPhoto: response.data.coverPhoto,
      };

      setCurrentUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/profile");
    } catch (error) {
      console.error("Error updating photos:", error);
    }
  };

  return (
    <div className="edit-photos-container">
      <h2>Edit Photos</h2>
      <div>
        <label htmlFor="profileImage">Profile Image:</label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleProfileImageChange}
        />
      </div>
      <div>
        <label htmlFor="coverPhoto">Cover Photo:</label>
        <input
          type="file"
          id="coverPhoto"
          accept="image/*"
          onChange={handleCoverPhotoChange}
        />
      </div>
      <button className="upload-button" onClick={handleUpdatePhotos}>
        Update Photos
      </button>
    </div>
  );
};

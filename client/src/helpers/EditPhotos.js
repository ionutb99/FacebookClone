import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditPhotos = ({ currentUser, setCurrentUser }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [firstName, setFirstName] = useState(currentUser.firstName || "");
  const [lastName, setLastName] = useState(currentUser.lastName || "");

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
      formData.append("firstName", firstName); // Add firstName
      formData.append("lastName", lastName);   // Add lastName

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
        firstName,
        lastName,
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
      <h2>Edit Name and Photos</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
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

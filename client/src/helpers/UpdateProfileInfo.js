import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateProfileInfo = ({ currentUser, setCurrentUser }) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    intro: currentUser.intro || "",
    profileJob: currentUser.profileJob || "",
    profileStudy: currentUser.profileStudy || "",
    profileStudyGraduate: currentUser.profileStudyGraduate || "",
    profileHome: currentUser.profileHome || "",
    profileLocation: currentUser.profileLocation || "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfile({
      ...updatedProfile,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const userId = currentUser._id;

      const response = await axios.put(`/api/profile/update-about/${userId}`, {
        intro: updatedProfile.intro,
        profileJob: updatedProfile.profileJob,
        profileStudy: updatedProfile.profileStudy,
        profileStudyGraduate: updatedProfile.profileStudyGraduate,
        profileHome: updatedProfile.profileHome,
        profileLocation: updatedProfile.profileLocation,
      });

      console.log("Profile updated:", response.data);

      setCurrentUser({
        ...currentUser,
        intro: updatedProfile.intro,
        profileJob: updatedProfile.profileJob,
        profileStudy: updatedProfile.profileStudy,
        profileStudyGraduate: updatedProfile.profileStudyGraduate,
        profileHome: updatedProfile.profileHome,
        profileLocation: updatedProfile.profileLocation,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          intro: updatedProfile.intro,
          profileJob: updatedProfile.profileJob,
          profileStudy: updatedProfile.profileStudy,
          profileStudyGraduate: updatedProfile.profileStudyGraduate,
          profileHome: updatedProfile.profileHome,
          profileLocation: updatedProfile.profileLocation,
        })
      );

      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="update-profile-info-div">
      <h2>Profile Update</h2>
      <input
        type="text"
        placeholder="Intro"
        name="intro"
        value={updatedProfile.intro}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Job"
        name="profileJob"
        value={updatedProfile.profileJob}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Study"
        name="profileStudy"
        value={updatedProfile.profileStudy}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Graduate"
        name="profileStudyGraduate"
        value={updatedProfile.profileStudyGraduate}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Home"
        name="profileHome"
        value={updatedProfile.profileHome}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Location"
        name="profileLocation"
        value={updatedProfile.profileLocation}
        onChange={handleChange}
      />
      <button
        className="registerButton"
        type="button"
        onClick={handleUpdateProfile}
      >
        Update Profile
      </button>
    </div>
  );
};





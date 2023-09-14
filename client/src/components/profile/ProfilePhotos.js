import React from "react";

export const ProfilePhotos = ({ currentUser }) => {
  return (
    <div className="profile-intro">
    <div className="title-box">
      <h3>Photos</h3>
      <a href="#">All Photos</a>
    </div>

    <div className="photo-box">
      {currentUser?.posts.map((post, idx) => (
        <div key={idx}>
          <img
            src={`../images/${post?.postContent}`}
            alt="photoContent"
          />
        </div>
      ))}
    </div>
  </div>
  )
}

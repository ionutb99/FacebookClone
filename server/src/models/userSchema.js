const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "profile-default.jpg",
  },
  coverPhoto: {
    type: String,
    default: "cover-default.jpg",
  },
  intro: {
    type: String,
  },
  profileJob: {
    type: String,
  },
  profileStudy: {
    type: String,
  },
  profileStudyGraduate: {
    type: String,
  },
  profileHome: {
    type: String,
  },
  profileLocation: {
    type: String,
  },
  friends: [
    {
      user_id: {
        type: String,
      },
      friendship_status: {
        type: String,
      },
    },
  ],
  posts: [
    {
      post_id: { type: String },
      text: { type: String },
      postContent: { type: String },
      timestamp: { type: Date, default: Date.now },
      likes: [
        {
          user_id: { type: String },
        },
      ],
      comments: [
        {
          comment_id: { type: String },
          user_id: { type: String },
          text: { type: String },
          timestamp: { type: Date, default: Date.now },
        },
      ],
      shares: [
        {
          user_id: { type: String },
        },
      ],
    },
  ],
  notifications: [
    {
      notification_id: { type: String },
      text: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  messages: [
    {
      message_id: { type: String },
      sender_id: { type: String },
      recipient_id: { type: String },
      text: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  story: [
    {
      story_id: { type: String },
      story_Content: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

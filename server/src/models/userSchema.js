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
    default:
      "https://previews.123rf.com/images/urfandadashov/urfandadashov1809/urfandadashov180902667/109317646-profile-pic-vector-icon-isolated-on-transparent-background-profile-pic-logo-concept.jpg",
  },
  coverPphoto: {
    type: String,
    default: "",
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

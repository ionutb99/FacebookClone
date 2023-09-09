const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

router.use(express.json());

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ error: "Invalid password" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/posts/create/:userId", upload.single("postContent"), async (req, res) => {
  try {
    const { userId } = req.params;
    const { text } = req.body;
    const postContentPath = req.file.path; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const postContentFileName = path.basename(postContentPath);

    const newPost = {
      text,
      postContent: postContentFileName, 
    };

    user.posts.push(newPost);

    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-friend/:currentUserId/:friendId", async (req, res) => {
  try {
    const { friendId, currentUserId } = req.params;

    const currentUser = await User.findById(currentUserId);
    const friend = await User.findById(friendId);

    if (!currentUser || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingFriend = friend.friends.find((f) => f.user_id === currentUserId);

    if (existingFriend) {
      return res.status(400).json({ error: "Friend already added" });
    }

  friend.friends.push({ user_id: currentUserId, friendship_status: "request" });
  currentUser.friends.push({ user_id: friendId, friendship_status: "pending" });

  const updatedFriend = await friend.save();
  const updatedCurrentUser = await currentUser.save();


  res.status(200).json({ updatedFriend, updatedCurrentUser });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Accept friend request
router.post("/accept-friend-request/:currentUserId/:friendId", async (req, res) => {
  try {
    const { friendId, currentUserId } = req.params;

    const currentUser = await User.findById(currentUserId);
    const friend = await User.findById(friendId);

    if (!currentUser || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    friend.friends.find((f) => f.user_id === currentUserId).friendship_status = "friends";
    currentUser.friends.find((f) => f.user_id === friendId).friendship_status = "friends";

    const updatedFriend = await friend.save();
    const updatedCurrentUser = await currentUser.save();

    res.status(200).json({ updatedFriend, updatedCurrentUser });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Decline friend request
router.post("/decline-friend-request/:currentUserId/:friendId", async (req, res) => {
  try {
    const { friendId, currentUserId } = req.params;

    const currentUser = await User.findById(currentUserId);
    const friend = await User.findById(friendId);

    if (!currentUser || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    friend.friends = friend.friends.filter((f) => f.user_id !== currentUserId);
    currentUser.friends = currentUser.friends.filter((f) => f.user_id !== friendId);

    const updatedFriend = await friend.save();
    const updatedCurrentUser = await currentUser.save();

    res.status(200).json({ updatedFriend, updatedCurrentUser });
  } catch (error) {
    console.error("Error declining friend request:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/profile/update-about/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const {
      intro,
      profileJob,
      profileStudy,
      profileStudyGraduate,
      profileHome,
      profileLocation,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        intro,
        profileJob,
        profileStudy,
        profileStudyGraduate,
        profileHome,
        profileLocation,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Server error: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put(
  "/photos/update/:userId",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (req.files["profileImage"]) {
        user.profileImage = `${req.files["profileImage"][0].filename}`;
      }
      if (req.files["coverPhoto"]) {
        user.coverPhoto = `${req.files["coverPhoto"][0].filename}`;
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;

      const updatedUser = await user.save();

      res.status(200).json({
        profileImage: updatedUser.profileImage,
        coverPhoto: updatedUser.coverPhoto,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.delete("/posts/delete/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const user = await User.findOneAndUpdate(
      { "posts._id": postId },
      { $pull: { posts: { _id: postId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

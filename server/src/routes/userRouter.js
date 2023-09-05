const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

router.post("/posts/create/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { text, postContent } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPost = {
      text,
      postContent,
    };


    user.posts.push(newPost);

    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/profile/update-about/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
   
    const {
      firstName,
      lastName,
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
        firstName,
        lastName,
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

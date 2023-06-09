const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


//upload a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//comment a post

router.post("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = {
      post: post,
      userId: comments.length + 1,
      body: req.body.comments,
    };
    comments.push(comment);
    res.status(200).json("The post has been commented");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const Post = require("../models/Post");
const User = require("../models/User");
const createPost = async function (req, res) {
  //checking title
  const titleExist = await Post.findOne({ title: req.body.title });
  if (titleExist) return res.status(400).send("Title already exist");

  //create new Post
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: {
      id: req.users._id,
      name: req.users.name
    }
  });
  try {
    const savePost = await post.save();
    res.send({ savePost });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getPost = async function (req, res) {
  try {
    const post = await Post.find();
    if (!post) throw Error("No items!");
    {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const editPost = async function (req, res) {

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content
    });
    if (!post) throw Error("Something went wrong while updating!");
    {
      res.status(200).json({ success: true, post });
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
const deletePost = async function (req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) throw Error("Not post found!");
    {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getDetailPost = async function (req, res) {
  try {
    const post = await Post.findById(req.body.id);
    if (!post) throw Error("No items!");
    {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  createPost,
  getPost,
  editPost,
  deletePost,
  getDetailPost
};

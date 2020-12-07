const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const verify = require('../authenticate/verifiedToken');



// Add post
router.post("/add",postController.createPost);
router.get("/", postController.getPost);
router.put("/edit/:id", postController.editPost);
router.delete("/delete/:id", postController.deletePost);
router.get("/detail/:id", postController.getDetailPost);
module.exports = router;

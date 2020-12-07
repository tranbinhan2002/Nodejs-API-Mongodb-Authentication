const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verify = require('../authenticate/verifiedToken');


//Register
router.post("/register",userController.register);
//Login
router.post("/login", userController.login);
//Get user
router.get("/", verify, userController.indexUser);
//Delete user
router.delete('/:id', verify, userController.deleteUser);
//Edit user
router.put('/:id', verify,userController.editUser);


module.exports = router;

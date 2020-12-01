const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verify = require('../verifytoken/verifiedToken');


//register
router.post("/register", userController.register);
//loginnpm 
router.post("/login", userController.login);
//Select user
router.get("/", verify, userController.indexUser);
//delete user
router.delete('/:id', verify, userController.deleteUser);
//edit user
router.put('/:id', verify, userController.editUser);


module.exports = router;

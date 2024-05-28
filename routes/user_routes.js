const router = require('express').Router();
const userService = require("../services/user_service")
const validator = require("../utils/user_validator")

router.post("/register", validator.validateCreateUser, userService.createUser)
router.post("/login", userService.signIn)
router.put("/users/:id", validator.validateCreateUser, userService.updateUser)
router.delete("/users/:id", userService.deleteUserById)
module.exports = router
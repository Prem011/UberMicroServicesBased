const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const { registerUser, loginUser, getUserProfile, logoutUser } = require("../controllers/user.controllers")
const authMiddleware = require("../middlewares/auth.middleware")

router.post(
    "/register",
    [
        body("fullName.firstName")
            .isLength({ min: 3 })
            .withMessage("First name must be at least 3 characters long."),
        body("fullName.lastName")
            .isLength({ min: 3 })
            .withMessage("Last name must be at least 3 characters long."),
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long.")
    ],
    registerUser
);

router.post(
    "/login", [
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long.")
    ],
    loginUser
)

router.get("/profile", authMiddleware, getUserProfile)

router.post("/logout", authMiddleware, logoutUser)


module.exports = router
const express = require('express')
const router = express.Router()
const { registerCaptain } = require("../controllers/captain.controllers")
const { body } = require('express-validator')

router.post("/register", [

        body("fullName.firstName").isString().isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
        body("fullName.lastName").isString().isLength({min: 3}).withMessage("Last name must be at least 3 characters long"),
        body("email").isEmail().withMessage("Email is invalid"),
        body("password").isString().isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
        body("vehicle.color").isString().isLength({min: 3}).withMessage("Color must be at least 3 characters long"),
        body("vehicle.plate").isString().isLength({min: 3}).withMessage("Plate must be at least 3 characters long"),
        body("vehicle.capacity").isNumeric().isLength({min: 1}).withMessage("Capacity must be at least 1"),
        body("vehicle.vehicleType").isString().isIn(["car", "motorcycle", "auto"]).withMessage("Vehicle type must be car, motorcycle or auto")
    ], 
    registerCaptain
)

module.exports = router
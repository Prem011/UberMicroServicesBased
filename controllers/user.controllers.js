const {validationResult} = require("express-validator")
const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const blackListTokenModel = require("../models/blackListToken.model");

const registerUser = async(req, res, next) => {
    
    try{
        // console.log("req.body : ", req.body)
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;

        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstName : fullName.firstName,
            lastName : fullName.lastName,
            email,
            password: hashPassword
        });

        // console.log("user : ", user)

        const token = user.generateAuthToken();

        res.status(201).json({ message: "User created successfully", token, user });
    }
    catch(err){
        res.status(500).json({message: "Error in controller, registering the user ,", error : err.message})
    }
};


const loginUser = async(req, res, next) => {
    try{
        const  errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        const user = await userModel.findOne({ email }).select("+password");

        if(!user){
            return res.status(401).json({message: "Invalid email or password"})
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"})
        }

        const token = user.generateAuthToken();

        res.cookie('token', token,
            // {
                // httpOnly: true,
                // secure : process.env.NODE_ENV === "production",
                // maxAge : 360000
            // }
        )

        res.status(200).json({message: "User logged in successfully", token, user})

    }
    catch(err){
        res.status(500).json({message: "Error in controller, logging in the user ", error : err.message})
    }
}

const getUserProfile = async(req, res, next) => {
    try{
        const user = req.user;
        res.status(200).json({user})
    }
    catch(err){
        res.status(500).json({message: "Error in getting user profile ", error : err.message})
    }
}

const logoutUser = async(req, res, next) => {
    try{
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        await blackListTokenModel.create({token})

        res.status(200).json({message: "User logged out successfully"})
    }
    catch(err){
        res.status(500).json({message: "Error in logging out the user ", error : err.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser

}
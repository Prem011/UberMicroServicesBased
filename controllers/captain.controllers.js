const CaptainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const createCaptain = require("../services/captain.service");

const registerCaptain = async (req, res) => {
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {fullName, email, password, vehicle} = req.body;

        const isCaptainAlreadyExist = await CaptainModel.findOne({email})
        if(isCaptainAlreadyExist){
            return res.status(400).json({message: "Captain already exist with this email"})
        } 

        const hashPassword = await CaptainModel.hashPassword(password);

        const captain = await createCaptain({
            fullName,
            email,
            password : hashPassword,
            vehicle
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ message: "Captain created successfully", token, captain });

    }
    catch(err){
        res.status(500).json({message: "Error in controller, registering the captain ,", error : err.message})
    }
}

module.exports = { 
    registerCaptain

}
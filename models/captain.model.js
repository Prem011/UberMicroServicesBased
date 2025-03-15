const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const captianSchema = new mongoose.Schema({
    fullName : {
        firstName : {
            type : String,
            required : true,
            minlength : [3, "First name must be at least 3 characters long"]
        },
        lastName : {
            type : String,
            required : true,
            minlength : [3, "Last name must be at least 3 characters long"]
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        // match : [/\S+@\S+\.\S+/, "Email is invalid"]
    },
    password : {
        type : String,
        required : true,
        minlength : [6, "Password must be at least 6 characters long"]
    },
    socketId : {
        tyqe : String,

    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "inactive"
    },
    vehicle : {
        color : {
            type : String, 
            required : true,
            minlength : [3, "Color must be at least 3 characters long"]
        },
        plate : {
            type : String,
            required : true,
            minlength : [3, "Plate must be at least 3 characters long"]
        },
        capacity : {
            type : Number,
            required : true,
            min : [1, "Capacity must be at least 1"]
        },
        vehicleType : {
            type : String,
            enum : ["car", "motorcycle", "auto"],
            required : true                         
        }
        
    },
    location : {
        lat : {
            type : Number,
        },
        lng : {
            type : Number,
        }
    }
})

captianSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : "24h"})
    return token
}

captianSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword, this.password)
}

captianSchema.statics.hashPassword = async function(plainPassword){
    return await bcrypt.hash(plainPassword, 10)
}

const captainModel = mongoose.model("Captain", captianSchema)

module.exports = captainModel
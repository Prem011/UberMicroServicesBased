const mongoose = require("mongoose")

const blackListTokenSchema = mongoose.Schema({
    token : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 60*60*24 //86400 seconds = 24 hours
    }
    
})

const blackListTokenModel = mongoose.model("BlackListToken", blackListTokenSchema)

module.exports = blackListTokenModel

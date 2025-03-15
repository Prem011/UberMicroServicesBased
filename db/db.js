const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.DB).then(() => {
        console.log(`Db connected successfully`);
    }).catch((err)=> {
        console.log(`error connecting db ${err.message}`);
        
    })
}

module.exports = {connectToDb}


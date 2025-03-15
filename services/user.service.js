const userModel = require("../models/user.model");

const createUser = async ({ firstName, lastName, email, password }) => {
   try{
        if(!firstName || !email || !password){
            throw new Error("All fields are required.");
        }
        console.log("All data :", firstName, lastName, email, password)
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password,
        });

        return user;
   }
   catch(err){
        throw new Error(`Error creating user service ${err.message}`)
   }
};

module.exports = { createUser };

const mongoose = require("mongoose")
const env = require('./env')

// Function to Connect to the Mongo DB
const connectToDB = async ()=>{
    try{
        await mongoose.connect(env.MONGO_URI);
        console.log("Database connected successfuuly");
    }catch(err){
        console.log("Error occured while connecting to DB", err);
        process.exit(1);
    }
}

module.exports = connectToDB;
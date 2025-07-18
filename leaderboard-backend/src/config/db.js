const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async()=>{
    try {
        const connectionInstance = mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected!! DB_HOST: ${(await connectionInstance).connection.host}`);
        
    } catch (error) {
        console.error("Error while connecting to database: ",error)
        throw new Error
    }
}

module.exports = connectDB;
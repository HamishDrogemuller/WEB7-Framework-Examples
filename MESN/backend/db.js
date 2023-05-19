//Utilise .env to secure our sensitive connection data
require("dotenv").config();
//Using mongoose
const mongoose = require("mongoose");

//Function utilising a try catch to connect to database
const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        });
        console.log("MongoDB connect SUCCESS");
    } catch (error) {
        console.log("MongoDB connect FAIL");
        process.exit();
    }
};
//Export connect function
module.exports = connectDB;
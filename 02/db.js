const mongoose = require("mongoose");


async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/my_server", {});
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error Connecting Databse ", error.message);
        process.exit(1);
    }
}

module.exports = connectDB; 
const mongoose = require("mongoose");

async function dbConnection() {
    try {
        await mongoose.connect(
            process.env.MONGODB_CONNECTION_STRING
            // "mongodb://127.0.0.1:27017/StudentEnroll"
        );
        console.log("DB Connected Succefully");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = dbConnection;

const mongoose = require('mongoose');

const dbConnection = async () => {
try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connection successful");
} catch (error) {
    console.log(error);
    throw new Error("Error connecting to the MongoDB database");
}
}

module.exports = {
    dbConnection
};
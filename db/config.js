const mongoose = require("mongoose");



const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_CNN);

        console.log ("DB is online");

    } catch (err) {
        console.log(err);
        throw new Error("It has been an error during the DB initialization");
    }
}

module.exports = {
    dbConnection
}
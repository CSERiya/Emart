const app=require('./app')
const mongoose = require("mongoose");
const dotenv=require("dotenv");

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    // Close server and exit process
    server.close(() => {
        process.exit(1);
    });
});

// Config
dotenv.config({path:"backend/config/config.env"});

// connecting to database- 
mongoose.connect("mongodb+srv://root:Root_3043@emart.rt2yxmf.mongodb.net/");

// Connection events
mongoose.Promise = global.Promise;

// Connection events
const db = mongoose.connection;

// Connection successful
db.once('open', function () {
    console.log('MongoDB connected successfully!');
});

// Start the Express server
const PORT = process.env.PORT || 4000;
const server= app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Uncaught exception
// console.log(youtube);

// Event listener for Unhandled Promise Rejections..
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    // Close server and exit process
    server.close(() => {
        process.exit(1);
    });
});
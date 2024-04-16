const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorMiddleware = require('./middleware/error');

// Middleware
app.use(express.json());
app.use(cookieParser());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Route for root URL
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Middleware for Errors
app.use(errorMiddleware);

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connect to database
mongoose.connect("mongodb+srv://root:Root_3043@emart.rt2yxmf.mongodb.net/");

// Connection events
const db = mongoose.connection;

// Connection successful
db.once('open', function () {
    console.log('MongoDB connected successfully!');
});

// Start the Express server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    // Close server and exit process
    server.close(() => {
        process.exit(1);
    });
});

// Event listener for Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    // Close server and exit process
    server.close(() => {
        process.exit(1);
    });   
});

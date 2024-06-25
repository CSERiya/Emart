// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const bodyParser= require("body-parser");
// const fileUpload = require("express-fileupload")
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const errorMiddleware = require('./middleware/error');
// const cloudinary = require("cloudinary")

// // Middleware

// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(fileUpload());

// // Route Imports
// const product = require("./routes/productRoute");
// const user = require("./routes/userRoute");
// const order = require("./routes/orderRoute");
// const payment= require('./routes/paymentRoute');

// app.use("/api/v1", product);
// app.use("/api/v1", user);
// app.use("/api/v1", order);
// app.use('/api/v1', payment);

// // Route for root URL
// app.get("/", (req, res) => {
//     res.send("Express App is Running");
// });

// // Middleware for Errors
// app.use(errorMiddleware);

// // Config
// dotenv.config({ path: "backend/config/config.env" });

// // Connect to database
// mongoose.connect("mongodb+srv://root:Root_3043@emart.rt2yxmf.mongodb.net/");

// // Connection events
// const db = mongoose.connection;

// // Connection successful
// db.once('open', function () {
//     console.log('MongoDB connected successfully!');
// });

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// // Start the Express server
// const PORT = process.env.PORT || 4000;
// const server = app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to Uncaught Exception`);

//     // Close server and exit process
//     server.close(() => {
//         process.exit(1);
//     });
// });

// // Event listener for Unhandled Promise Rejections
// process.on("unhandledRejection", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//     // Close server and exit process
//     server.close(() => {
//         process.exit(1);
//     });   
// });
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorMiddleware = require('./middleware/error');
const cloudinary = require("cloudinary").v2;
const stripe = require('stripe');
const cors = require('cors');

// Load environment variables
dotenv.config({ path: "backend/config/config.env" });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require('./routes/paymentRoute');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use('/api/v1', payment);

// Route for root URL
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Middleware for Errors
app.use(errorMiddleware);

// Connect to database
mongoose.connect(process.env.DB_URI).then(() => {
    console.log('MongoDB connected successfully!');
}).catch((err) => {
    console.log('MongoDB connection error:', err.message);
});

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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
    server.close(() => {
        process.exit(1);
    });
});

// Event listener for Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});

module.exports = stripe;

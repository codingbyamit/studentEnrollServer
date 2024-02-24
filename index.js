const express = require("express");
const dbConnection = require("./db/dbConnect");
const app = express();
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan");
const User = require("./models/User"); // Import your User model
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const port = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

app.get("/", (req, res) => {
    res.send(`Server is Running on ${port} `);
});

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(morgan("combined"));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN,
    })
);
// Routes
app.use("/", authRouter);
app.use("/", userRouter);

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
    dbConnection();
});

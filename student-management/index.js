const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

const studentRouter = require("./routes/StudentRoutes");
app.use("/", studentRouter);

// Connect to MongoDB
dotenv.config();
const queryString = process.env.MONGODB_URI || "mongodb+srv://vuducluong12a:Luong88888@cluster0.kznsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(queryString, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB connection error:', err.message));

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

module.exports = app;

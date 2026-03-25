require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

// middleware
app.use(cors({
  origin: "https://rajdoot-polymers-frontend.vercel.app/",
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
  res.send("Backend is running 🚀")
})

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});

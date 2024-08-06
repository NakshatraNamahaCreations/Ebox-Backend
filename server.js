const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected!!!", err));

const userauthRoutes = require("./routes/user/users");
const product = require("./routes/vendor/product");

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

// Routes
app.use("/api/user", userauthRoutes);
app.use("/api/product", product);

// app.use("/api/users", require("./routes/users"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/", (req, res) => {
  res.send("Hey, Jimmy!...This is Event Box backend 🐶🤗");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>
  console.log(`Server running on port at http://localhost:${PORT}`)
);

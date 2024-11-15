const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/authRoutes"));
app.use('/api',require('./routes/dashboard/productRoutes'));
app.use('/api', require('./routes/dashboard/categoryRoutes'));
app.use('/api',require('./routes/dashboard/sellerRoutes'))

app.get("/", (req, res) => res.send("Hello Server"));

dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

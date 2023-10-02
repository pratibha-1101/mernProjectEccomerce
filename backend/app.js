const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
  

app.use(cookieParser())
app.use (express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//IMPORTING routes
const order = require("./routes/orderRoute");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname, "../frontend/build")));


//middleware for error
app.use(errorMiddleware);

module.exports = app;

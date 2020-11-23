const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const routes = require("./routes");
const HttpError = require("./http-error");

const port = 5000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api", routes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://portfolioUser:OFydkHqeF9uxT4ap@cluster0.fpul6.mongodb.net/Portfolio?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || port);
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

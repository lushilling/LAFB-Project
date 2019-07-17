const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const account = require("./routes/account");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use("/account", account);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));

const express = require("express");
const bodyParser = require("body-parser");

const account = require("./routes/account");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/account", account);

const port = process.env.PORT || 9003;

app.listen(port, () => console.log(`server running on port ${port}`));

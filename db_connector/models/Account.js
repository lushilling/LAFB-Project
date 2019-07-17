const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  accountnumber: {
    type: String,
    required: true
  },
  prize: {
    type: String,
    required: true
  }
});

module.exports = Account = mongoose.model("accounts", AccountSchema);

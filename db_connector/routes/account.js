const express = require("express");
const router = express.Router();

const Account = require("../models/Account");

// @route   GET account/all
// @desc    Get all accounts
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Account.find()
    .then(accounts => {
      if (!accounts) {
        errors.noAccounts = "There are no Accounts";
        res.status(404).json(errors);
      }

      res.json(accounts);
    })
    .catch(err => res.status(404).json({ noAccounts: "There are no Accounts" }));
});

// @route   POST Account/createAccount
// @desc    Create an Account
// @access  Public
router.post("/createAccount", (req, res) => {

console.log(req.body);

    const newAccount = new Account({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      accountnumber: req.body.accountnumber,
      prize: req.body.prize
    });

    newAccount.save().then(Account => res.json(Account))
    .catch(err => console.log(err));

});

module.exports = router;

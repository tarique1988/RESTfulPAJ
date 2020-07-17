const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/AdminModel");

router.post("/signup", (req, res) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then((admins) => {
      if (admins.length === 0) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) res.status(500).json({ error: "Unable to create admin!" });
          else {
            const admin = new Admin({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            admin
              .save()
              .then((result) => {
                res.status(201).json("Admin added!");
              })
              .catch((err) => {
                res.status(500).json({ error: err.message });
              });
          }
        });
      } else {
        res.status(500).json({ err: "User exists!" });
      }
    });
});

router.post("/login", (req, res) => {
  Admin.find({ email: req.body.email })
    .select("-__v")
    .exec()
    .then((admin) => {
      bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { name: admin[0].name, email: admin[0].email },
            process.env.JWT_TOKEN_KEY,
            { expiresIn: "10m" }
          );
          res.status(200).json({
            name: admin[0].name,
            email: admin[0].email,
            authToken: token,
          });
        } else res.status(500).json({ error: "Auth Failed!" });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Auth Failed!" });
    });
});

module.exports = router;

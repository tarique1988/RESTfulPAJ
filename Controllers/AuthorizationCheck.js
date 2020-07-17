const jwt = require("jsonwebtoken");
const e = require("express");

module.exports = AuthorizationCheck = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Unauthorized Access!" });
    } else {
      req.body.currentUser = user;
      next();
    }
  });
};

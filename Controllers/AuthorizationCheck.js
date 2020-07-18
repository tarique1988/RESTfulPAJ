const jwt = require("jsonwebtoken");
const e = require("express");

module.exports = AuthorizationCheck = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
      if (err) {
        res
          .status(401)
          .json({ error: "You're not authorized to view this content!" });
      } else {
        req.body.currentUser = {
          name: user.name,
          email: user.email,
        };
        next();
      }
    });
  } else {
    res
      .status(500)
      .json({ error: "You're not authorized to view this content!" });
  }
};

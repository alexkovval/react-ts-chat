const jwt = require("jsonwebtoken");

const key = require('../config/db')

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
      console.log(token)
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, key.jwt);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
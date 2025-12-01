const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies) {
    return res.sendStatus(401);
  }

  const token = cookies.web3Token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.userId = payload.sub;
    next();
  });

  // if (!isAuthenticated) {
  //   return res.sendStatus(401);
  // }

  // req.myUserId = "TOKEN USER ID";

  // next();
};

module.exports = authMiddleware;

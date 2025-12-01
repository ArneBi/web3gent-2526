const adminMiddleware = (req, res, next) => {
  const isAdmin = true;

  if (!isAdmin) {
    return res.sendStatus(403);
  }

  next();
};

module.exports = adminMiddleware;

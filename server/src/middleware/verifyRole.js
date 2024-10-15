const jwt = require('jsonwebtoken');

const verifyRole = (roles) => {
  return (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;

      if (!roles.includes(req.user.role)) {
        return res.status(403).send('Permission Denied');
      }
      
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  };
};

module.exports = verifyRole;

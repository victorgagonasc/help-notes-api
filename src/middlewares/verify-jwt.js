const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

module.exports = verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(HttpStatus.UNAUTHORIZED).send('NO_TOKEN_PROVIDED')

    const decoded = await jwt.verify(token, process.env.SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
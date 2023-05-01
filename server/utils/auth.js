const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'topSecret'; 
const expiresIn = process.env.JWT_EXPIRES_IN || '2h'; 

const signToken = (user) => {
  const payload = {
    email: user.email,
  };

  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = {
  signToken,
};
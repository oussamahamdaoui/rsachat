const { sign, verify } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ERROR = {
  error: true,
};

const SUCCESS = {
  error: false,
};

const JWT_SECRET = 'fvNzXhr7lzKtfT5qru4GI0a2QsrJmlZuHdNsiSpg' || process.env.JWT_SECRET;
const SALT_WORK_FACTOR = 10;

const createJWToken = (details) => {
  let { sessionData, maxAge, secret } = details;

  if (!sessionData || typeof sessionData !== 'object') {
    sessionData = {};
  }
  if (!maxAge || typeof maxAge !== 'number') {
    maxAge = '1 days';
  }

  if (!secret || typeof secret !== 'string') {
    secret = JWT_SECRET;
  }
  const token = sign({
    data: sessionData,
  }, secret, {
    expiresIn: maxAge,
    algorithm: 'HS256',
  });

  return token;
};


const verifyJWTToken = (token, secret = JWT_SECRET) => {
  try {
    return verify(token, secret);
  } catch (e) {
    return false;
  }
};

const verifyJWTMiddleware = (req, res, next) => {
  const token = (req.method === 'POST' ? req.body.token : req.query.token) || req.headers.token;
  const decodedToken = verifyJWTToken(token);
  if (decodedToken) {
    req.user = decodedToken.data;
    next();
  } else {
    res.status(401).json({
      ...ERROR,
      message: 'invalid token',
    });
  }
};

const comparePassword = async (candidatePassword, password) => new Promise((resolve) => {
  bcrypt.compare(candidatePassword, password, (err, isMatch) => {
    if (err) {
      resolve(false);
    }
    return resolve(isMatch);
  });
});

const hashPassword = async (password) => new Promise((resolve) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) resolve(false);
    bcrypt.hash(password, salt, (er, hash) => {
      if (er) resolve(false);
      resolve(hash);
    });
  });
});

module.exports = {
  SUCCESS,
  ERROR,
  verifyJWTToken,
  verifyJWTMiddleware,
  createJWToken,
  comparePassword,
  hashPassword,
};

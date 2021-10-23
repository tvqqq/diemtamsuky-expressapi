const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const auth0 = {};

const ERROR_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  EXCEPTION: -2,
  INVALID_PARAM: -3,
  INVALID_DATA: -4,
  UNKNOWN_EXCEPTION: -5,
  NOT_EXIST: -9,
  ALREADY_EXIST: -10,
  INVALID_SESSION: -11,
  INVALID_REQUEST: -12,
};

auth0.verify = async (req, res, next) => {
  try {
    let header = req.headers["authorization"];
    if (!header || !header.startsWith("Bearer ")) {
      return res.send({
        error: ERROR_CODE.INVALID_SESSION,
        message: "User session invalid.",
      });
    }

    const client = jwksClient({
      jwksUri: process.env.AUTH0_ISSUER_BASE_URL + "/.well-known/jwks.json",
      // requestHeaders: {}, // Optional
      // timeout: 30000, // Defaults to 30s
      // cache: true, // Default Value
      // cacheMaxEntries: 5, // Default value
      // cacheMaxAge: 600000, // Defaults to 10m
    });
    const getKey = (header, callback) => {
      client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
    };
    const options = {};
    const token = header.substring(7);
    jwt.verify(token, getKey, options, (err, decoded) => {
      if (decoded) {
        req.sub = decoded.sub;
        next();
      } else {
        throw err;
      }
    });
  } catch (exception) {
    res.send({
      error: ERROR_CODE.INVALID_SESSION,
      message: "User session invalid.",
    });
    console.error("API-Exception:", exception);
  }
};

module.exports = auth0;

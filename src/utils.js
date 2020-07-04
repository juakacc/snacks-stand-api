const jwt = require("jsonwebtoken");

function getUserId(context) {
  const { authorization } = context.req.headers;

  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.APP_SECRET);
    const { userId } = decode;
    return userId;
  }
  throw new Error("Not authenticated");
}

module.exports = { getUserId };

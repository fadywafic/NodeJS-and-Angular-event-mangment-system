const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  let token;
  let decodedToken;

  try {
    token = request.get("authorization").split(" ")[1];
    //console.log(token);
    decodedToken = jwt.verify(token, "studentAccount");
    //console.log(decodedToken)
  } catch (err) {
    //console.log("request", request.get("authorization"));
    let error = new Error("not Authorized");
    error.status = 404;
    next(error);
  }

  if (decodedToken != undefined) {
    request.id = decodedToken.id;
    request.role = decodedToken.role;
    request.email = decodedToken.email;
    //console.log(decodedToken);
  }
  next();
};

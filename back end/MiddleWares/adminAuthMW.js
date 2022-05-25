const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  let token;
  let decodedToken;

  try {
    token = request.get("authorization").split(" ")[1];
    decodedToken = jwt.verify(token, "adminAccount");
  } catch (err) {
    //console.log("request2")
    let error = new Error("not Authorized");
    error.status = 404;
    next(error);
  }
  //console.log(request);
  //console.log(decodedToken);
  if (decodedToken != undefined) request.role = decodedToken.role;
  next();
};

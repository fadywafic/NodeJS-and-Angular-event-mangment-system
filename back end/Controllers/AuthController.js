const studentModel = require("./../Models/studentModel");
const speakerModel = require("./../Models/speakerModel");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config({
  path: "./../config.env",
});

const saltRounds = 10;

const JwtExpiresIn = process.env.JWT_expires_in || { expiresIn: "1h" };
//const secretKey = process.env.secretKey || "mySecretKey";

module.exports.signUp = (request, response, next) => {
  let results = validationResult(request);
  if (!results.isEmpty()) {
    let message = results
      .array()
      .reduce((current, error) => current + error.msg + ", ", " ");

    let error = new Error(message);
    error.status = 422;
    throw error;
  }

  let body = request.body;
  if (body.role == "student") {
    studentModel
      .findOne({ email: body.email })
      .then((data) => {
        if (data) throw new Error("E-mail already in use");

        let hashedPass = bcrypt.hashSync(body.password, saltRounds);

        let student = new studentModel({
          email: body.email,
          password: hashedPass,
          userName: body.userName,
        });
        return student.save();
      })
      .then((data) => {
        response.status(200).json({ message: "student added to DB ", data });
      })
      .catch((error) => next(error));
  } else {
    speakerModel
      .findOne({ email: body.email })
      .then((data) => {
        if (data) throw new Error("E-mail already in use");

        let hashedPass = bcrypt.hashSync(body.password, saltRounds);

        let speaker = new speakerModel();
        speaker.email = body.email;
        speaker.password = hashedPass;
        speaker.userName = body.userName;
        speaker.address.city = body.city;
        speaker.address.street = body.street;
        speaker.address.building = body.building;
        return speaker.save();
      })
      .then((data) => {
        response.status(200).json({ message: "speaker added to DB ", data });
      })
      .catch((error) => next(error));
  }
};

module.exports.login = (request, response, next) => {
  let results = validationResult(request);
  if (!results.isEmpty()) {
    let message = results
      .array()
      .reduce((current, error) => current + error.msg + ", ", " ");

    let error = new Error(message);
    error.status = 422;
    throw error;
  }

  let body = request.body;
  let token;
  let error;
  let errorMessage;

  if (body.email == "admin@gmail.com" && body.password == "0000") {
    token = jwt.sign(
      {
        role: "admin",
      },
      "adminAccount",
      JwtExpiresIn
    );
    response.status(200).json({ message: "Admin login successfully", token });
  } else {
    if (body.role == "student") {
      studentModel
        .findOne({ email: body.email })
        .then((data) => {
          if (!data || !bcrypt.compareSync(body.password, data.password)) {
            errorMessage = "incorrect email or password, check with your Admin";
            error = new Error(errorMessage);
            error.status = 500;
            throw error;
          }

          token = jwt.sign(
            {
              id: data._id,
              email: data.email,
              role: "student",
            },
            "studentAccount",
            JwtExpiresIn
          );
          response
            .status(200)
            .json({ message: "Student login successfully", token });
        })
        .catch((error) => next(error));
    } else if (body.role == "speaker") {
      speakerModel
        .findOne({ email: body.email })
        .then((data) => {
          if (
            data == null ||
            !bcrypt.compareSync(body.password, data.password)
          ) {
            errorMessage = "incorrect email or password, check the Admin";
            error = new Error(errorMessage);
            error.status = 500;
            throw error;
          }

          token = jwt.sign(
            {
              id: data._id,
              email: data.email,
              role: "speaker",
            },
            "speakerAccount",
            JwtExpiresIn
          );
          response
            .status(200)
            .json({ message: "Speaker login successfully", token });
        })
        .catch((error) => next(error));
    } else {
      throw new Error("you must select a role");
    }
  }
};

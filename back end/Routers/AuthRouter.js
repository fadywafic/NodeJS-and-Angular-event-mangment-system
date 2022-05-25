const e = require("cors");
const express = require("express");
const router = express.Router();
const { body, param, query, validationResult } = require("express-validator");

const authController = require("./../Controllers/AuthController");
const studentModel = require("./../Models/studentModel");
const speakerModel = require("./../Models/speakerModel");

// signup not working .. problemaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
router.post(
  "/signUp",
  [
    body("email").isEmail().withMessage("invalid email"),
    // .custom(value => {
    //     let User;
    //     // problemaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa .. how to get body("role").value or param("role").value
    //     // in order to enter if condn in validator
    //     console.log(param("role").value) // undefiended
    //     if (param("role").value == "student"){
    //         console.log("here");
    //         User = studentModel.findOne({ email: value});
    //     }else if (param("role").equals("speaker") == 0) {
    //         console.log("here22222");
    //         User = speakerModel.findOne({ email: value });
    //     }else{
    //              console.log("here333333");
    //     }
    //     return User
    //     .then(data => {
    //          if (data) {
    //         return Promise.reject('E-mail already in use');
    //         }
    //     });
    // }),
    body("userName").isString().withMessage("invalid userName"),
    body("role").isIn(["student", "speaker"]).withMessage("role is invalid"),
    body("password").isAlphanumeric().withMessage("invalid password"),
  ],
  authController.signUp
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isAlphanumeric().withMessage("invalid password"),
  ],
  authController.login
);

module.exports = router;

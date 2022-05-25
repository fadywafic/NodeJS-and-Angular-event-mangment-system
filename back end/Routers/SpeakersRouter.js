const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");

const speakersController = require("./../Controllers/SpeakersController");
const adminAuth = require("../MiddleWares/adminAuthMW");
const speakerAuth = require("./../MiddleWares/speakerAuthMW");
const speakerModel = require("../Models/speakerModel");

router
  .route("/speaker")
  // show data in speaker profile
  .get(speakerAuth, speakersController.showProfileData);

// edit data in speaker profile
router.route("/speaker/edit").put(
  speakerAuth,
  [
    body("email").isEmail().withMessage("invalid email"),
    // .custom((value) => {
    //   let User;
    //   User = speakerModel.findOne({
    //     email: value,
    //     _id: { $ne: body("id").value }, // problemaaaaaaaaaaaaa /* how to get value of id here in validator */
    //   });
    //   return User.then((data) => {
    //     if (data) {
    //       return Promise.reject("E-mail already in use");
    //     }
    //   });
    // }),
    body("userName").isString().withMessage("invalid userName"),
    body("password").isAlphanumeric().withMessage("invalid password"),
  ],
  speakersController.editSpeakerProfile
);

// admin role
// get all speakers
router.route("/speakers").get(adminAuth, speakersController.getSpeakers);

// get Speaker by id
router.route("/speakers/:id").get(adminAuth, speakersController.getSpeakerById);

//edit Speaker profile data except id,userName and password
router.route("/speakers/:id/editSpeaker").put(
  adminAuth,
  [
    body("email").isEmail().withMessage("invalid email"),
    // .custom((value) => {
    //   let User;
    //   User = speakerModel.findOne({
    //     email: value,
    //     _id: { $ne: body("id").value }, // problemaaaaaaaaaaaaa /* how to get value of id here in validator */
    //   });
    //   return User.then((data) => {
    //     if (data) {
    //       return Promise.reject("E-mail already in use");
    //     }
    //   });
    // }),
    body("userName").isString().withMessage("invalid userName"),
  ],
  speakersController.editSpeakerProfileByAdmin
);

//delete Speaker from database
router
  .route("/speakers/:id/deleteSpeaker")
  .delete(adminAuth, speakersController.deleteSpeaker);

module.exports = router;

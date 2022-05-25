const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");

const studentsController = require("./../Controllers/StudentsController");
const adminAuth = require("../MiddleWares/adminAuthMW");
const studentAuth = require("./../MiddleWares/studentAuthMW");
const studentModel = require("../Models/studentModel");

// student role
router
  .route("/student")
  // show data in student profile
  .get(studentAuth, studentsController.showProfileData);

// edit data in student profile
router.route("/student/edit").put(
  studentAuth,
  [
    body("email").isEmail().withMessage("invalid email"),
    // .custom((value) => {
    //   let User;
    //   User = studentModel.findOne({
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
  studentsController.editStudentProfile
);

// admin role
// get all students
router.route("/students").get(adminAuth, studentsController.getStudents);

// get student by id
router.route("/students/:id").get(adminAuth, studentsController.getStudentById);

//edit student profile data except id,userName and password
router.route("/students/:id/editStudent").put(
  adminAuth,
  [
    body("email").isEmail().withMessage("invalid email"),
    // .custom((value) => {
    //   let User;
    //   User = studentModel.findOne({
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
  studentsController.editStudentProfileByAdmin
);

//delete student from database
router
  .route("/students/:id/deleteStudent")
  .delete(adminAuth, studentsController.deleteStudent);

module.exports = router;

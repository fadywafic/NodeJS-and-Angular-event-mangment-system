const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const studentModel = require("./../Models/studentModel");
const eventModel = require("../Models/eventModel");

const saltRounds = 10;

//student roles
module.exports.showProfileData = (request, response, next) => {
  if (request.role == "student") {
    studentModel
      .findOne({ email: request.email })
      .populate({
        path: "events",
        // populate: { path: "MainSpeaker" },
        // options: { strictPopulate: false },
      })
      // .populate({ path: "mainSpeaker"})
      .then((data1) => {
        eventModel
          .find({
            students: { $elemMatch: { $eq: request.id } },
          })
          .populate({ path: "mainSpeaker" })
          .populate({ path: "otherSpeakers" })
          .then((data2) => {
            response
              .status(200)
              .json({ message: "student data", data1, data2 });
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
};

module.exports.editStudentProfile = (request, response, next) => {
  studentModel
    .findOne({ email: request.email, _id: { $ne: request.id } })
    .then((data) => {
      if (data) throw new Error("This Email used by another student");
    });

  let results = validationResult(request);
  if (!results.isEmpty()) {
    //console.log(results)
    let message = results
      .array()
      .reduce((current, error) => current + error.msg + ", ", " ");
    let error = new Error(message);
    error.status = 422;
    throw error;
  }
  if (request.role == "student") {
    let hashedPass = bcrypt.hashSync(request.body.password, saltRounds);
    studentModel
      .findByIdAndUpdate(request.id, {
        $set: {
          email: request.body.email,
          password: hashedPass,
          userName: request.body.userName,
        },
      })
      .then((data) => {
        if (!data) {
          let error = new Error("student not found");
          error.status = 422;
          throw error;
        }

        response.status(200).json({ message: "updated", data });
      })
      .catch((error) => next(error));
  }
};

//admin roles
module.exports.getStudents = (request, response, next) => {
  if (request.role == "admin") {
    studentModel
      .find({})
      .populate({ path: "events" }) //.projection() //projection all student data except password and email
      .then((data) => {
        //console.log(data);
        response.status(200).json({ message: "students data", data });
      })
      .catch((error) => next(error));
  }
};

module.exports.getStudentById = (request, response, next) => {
  if (request.role == "admin") {
    studentModel
      .findOne({ _id: request.params.id })
      .populate({ path: "events" }) //findOne({})
      .then((data) => {
        if (data == null) throw new Error("student not exist");

        return response
          .status(200)
          .json({ message: `student with id ${request.params.id}`, data });
      })
      .catch((error) => next(error));
  }
};

module.exports.editStudentProfileByAdmin = (request, response, next) => {
  studentModel
    .findOne({ email: request.email, _id: { $ne: request.id } })
    .then((data) => {
      if (data) throw new Error("This Email used by another student");
    });

  let results = validationResult(request);
  if (!results.isEmpty()) {
    //console.log(results);
    let message = results
      .array()
      .reduce((current, error) => current + error.msg + ", ", " ");
    let error = new Error(message);
    error.status = 422;
    throw error;
  }

  if (request.role == "admin") {
    studentModel
      .findByIdAndUpdate(request.params.id, {
        $set: {
          userName: request.body.userName,
        },
      })
      .then((data) => {
        if (!data) {
          let error = new Error("student not found");
          error.status = 422;
          throw error;
        }

        response
          .status(200)
          .json({
            message: `student with id ${request.params.id} has updated`,
          });
      })
      .catch((error) => next(error));
  }
};

module.exports.deleteStudent = (request, response, next) => {
  if (request.role == "admin") {
    studentModel
      .findByIdAndDelete(request.params.id) //findOne({})
      .then((data) => {
        if (data == null) throw new Error("student not exist");

        if (data.events.Length != 0) {
          data.events.forEach((event) => {
            eventModel
              .findByIdAndUpdate(event._id, { $pull: { events: data._id } })
              .catch((error) => {
                next(error);
              });
          });
        }

        return response
          .status(200)
          .json({
            message: `student with id ${request.params.id} has deleted`,
          });
      })
      .catch((error) => next(error));
  }
};

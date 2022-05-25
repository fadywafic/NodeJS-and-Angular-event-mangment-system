const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const speakerModel = require("./../Models/speakerModel");
const eventModel = require("../Models/eventModel");

const saltRounds = 10;

//speaker roles
module.exports.showProfileData = (request, response, next) => {
  if (request.role == "speaker") {
    speakerModel
      .findOne({ email: request.email })
      .populate({ path: "events" })
      .then((data1) => {
        eventModel
          .find({
            $or: [
              { otherSpeakers: { $elemMatch: { $eq: request.id } } },
              { mainSpeaker: request.id },
            ],
          })
          .populate({ path: "mainSpeaker" })
          .populate({ path: "otherSpeakers" })
          .populate({ path: "students" })
          .then((data2) => {
            response
              .status(200)
              .json({ message: "speaker data", data1, data2 });
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
};

module.exports.editSpeakerProfile = (request, response, next) => {
  speakerModel
    .findOne({ email: request.email, _id: { $ne: request.id } })
    .then((data) => {
      if (data) throw new Error("This Email used by another speaker");
    });

  let results = validationResult(request);
  if (!results.isEmpty()) {
    console.log(results);
    let message = results
      .array()
      .reduce((current, error) => current + error.msg + ", ", " ");
    let error = new Error(message);
    error.status = 422;
    throw error;
  }

  if (request.role == "speaker") {
    let hashedPass = bcrypt.hashSync(request.body.password, saltRounds);
    speakerModel
      .findByIdAndUpdate(request.id, {
        $set: {
          userName: request.body.userName,
          "address.city": request.body.city,
          "address.street": request.body.street,
          "address.building": request.body.building,
        },
      })
      .then((data) => {
        if (!data) throw new Error("speaker not found");

        response.status(200).json({ message: "updated", data });
      })
      .catch((error) => next(error));
  }
};

// admin roles
module.exports.getSpeakers = (request, response, next) => {
  if (request.role == "admin") {
    speakerModel
      .find({})
      .populate({ path: "events" }) //.projection() //projection all Speaker data except password and email
      .then((data) => {
        //console.log(data);
        response.status(200).json({ message: "speakers data", data });
      })
      .catch((error) => next(error));
  }
};

module.exports.getSpeakerById = (request, response, next) => {
  if (request.role == "admin") {
    speakerModel
      .findOne({ _id: request.params.id })
      .populate({ path: "events" }) //findOne({})
      .then((data) => {
        if (data == null) throw new Error("Speaker not exist");

        return response
          .status(200)
          .json({ message: `Speaker with id ${request.params.id}`, data });
      })
      .catch((error) => next(error));
  }
};

module.exports.editSpeakerProfileByAdmin = (request, response, next) => {
  speakerModel
    .findOne({ email: request.email, _id: { $ne: request.id } })
    .then((data) => {
      if (data) throw new Error("This Email used by another speaker");
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
    speakerModel
      .findByIdAndUpdate(request.params.id, {
        $set: {
          userName: request.body.userName,
          "address.city": request.body.city,
          "address.street": request.body.street,
          "address.building": request.body.building,
        },
      })
      .then((data) => {
        if (!data) throw new Error("Speaker not found");

        response
          .status(200)
          .json({
            message: `Speaker with id ${request.params.id} has updated`,
          });
      })
      .catch((error) => next(error));
  }
};

module.exports.deleteSpeaker = (request, response, next) => {
  if (request.role == "admin") {
    speakerModel
      .findByIdAndDelete(request.params.id) //findOne({})
      .then((data) => {
        if (data == null) throw new Error("Speaker not exist");

        if (data.events.Length != 0) {
          data.events.forEach((event) => {
            eventModel
              .findByIdAndUpdate(event._id, { $pull: { events: data._id } })
              .catch((error) => {
                next(error);
              });
          });
        }

        return response.status(200).json({
          message: `Speaker with id ${request.params.id} has deleted`,
        });
      })
      .catch((error) => next(error));
  }
};

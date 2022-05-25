const { validationResult } = require("express-validator");

const studentModel = require("../Models/studentModel");
const eventModel = require("./../Models/eventModel");
const speakerModel = require("./../Models/speakerModel");

module.exports.getAllEvents = (request, response, next) => {
  if (request.role == "admin") {
    eventModel
      .find({}) //.projection() //projection all Event data except password and email
      .populate({ path: "mainSpeaker" })
      .populate({ path: "students" })
      .populate({ path: "otherSpeakers" })
      .then((data) => {
        //console.log(data);
        response.status(200).json({ message: "Events data", data });
      })
      .catch((error) => next(error));
  }
};

module.exports.getEventById = (request, response, next) => {
  if (request.role == "admin") {
    eventModel
      .findOne({ _id: request.params.id }) //findOne({})
      .populate({ path: "mainSpeaker" })
      .populate({ path: "otherSpeakers" })
      .populate({ path: "students" })
      .then((data) => {
        if (data == null) throw new Error("Event not exist");

        return response
          .status(200)
          .json({ message: `Event with id ${request.params.id}`, data });
      })
      .catch((error) => next(error));
  }
};

module.exports.addEvent = (request, response, next) => {
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

  if (request.role == "admin") {
    let body = request.body;
    let event = new eventModel();
    event.title = body.title;
    event.eventDate = body.date;
    event.mainSpeaker = body.mainSpeaker;

    event
      .save()
      .then((data) => {
        speakerModel
          .findByIdAndUpdate(body.mainSpeaker, { $push: { events: data._id } })
          .then(() => {
            response.status(200).json({ message: "Event added to DB ", data });
          })
          .catch((error) => {
            eventModel
              .findByIdAndDelete(data._id)
              .then(() => {
                throw new Error(
                  "cant add this event due to main speaker problem"
                );
              })
              .catch((error) => next(error));
            next(error);
          });
      })
      .catch((error) => next(error));
  }
};

module.exports.editEvent = (request, response, next) => {
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
    eventModel
      .findByIdAndUpdate(request.params.id, {
        $set: {
          title: request.body.title,
          eventDate: request.body.date,
          mainSpeaker: request.body.mainSpeaker,
        },
      })
      .then((data) => {
        if (!data) throw new Error("Event not found");

        speakerModel
          .findByIdAndUpdate(request.body.mainSpeaker, {
            $push: { events: data._id },
          })
          .then(() => {
            speakerModel
              .findByIdAndUpdate(data.mainSpeaker, {
                $pull: { events: data._id },
              })
              .then(() => {
                response
                  .status(200)
                  .json({
                    message: `Event with id ${request.params.id} has updated`,
                  });
              })
              .catch((error) => {
                next(error);
              });
          })
          .catch((error) => {
            next(error);
          });
      })
      .catch((error) => next(error));
  }
};

module.exports.deleteEvent = (request, response, next) => {
  if (request.role == "admin") {
    eventModel
      .findByIdAndDelete(request.params.id) //findOne({})
      .then((data) => {
        if (data == null) throw new Error("Event not exist");

        speakerModel
          .findByIdAndUpdate(data.mainSpeaker, { $pull: { events: data._id } })
          .catch((error) => {
            next(error);
          });

        if (data.students.Length != 0) {
          data.students.forEach((std) => {
            studentModel
              .findByIdAndUpdate(std._id, { $pull: { events: data._id } })
              .catch((error) => {
                next(error);
              });
          });
        }

        if (data.otherSpeakers.Length != 0) {
          data.otherSpeakers.forEach((speaker) => {
            speakerModel
              .findByIdAndUpdate(speaker._id, { $pull: { events: data._id } })
              .catch((error) => {
                next(error);
              });
          });
        }

        return response
          .status(200)
          .json({ message: `Event with id ${request.params.id} has deleted` });
      })
      .catch((error) => next(error));
  }
};
/*****************************************************************************************************/
// // will be done from frontend
// module.exports.getFilteredStudent = (request, response, next) =>{
//    if (request.role == "admin") {
//      let studentsInEvent
//      let studentsOutEvent

//     eventModel
//       .find({

//       }) //get students in that event
//       .populate({ path: "mainSpeaker" })
//       .populate({ path: "students" })
//       .populate({ path: "otherSpeakers" })
//       .then((data) => {
//         studentsInEvent = data
//         //console.log(data);
//       })
//       .catch((error) => next(error));

//     eventModel
//       .find({}) //get students out of that event
//       .populate({ path: "mainSpeaker" })
//       .populate({ path: "students" })
//       .populate({ path: "otherSpeakers" })
//       .then((data) => {
//         studentsOutEvent = data;
//         //console.log(data);
//       })
//       .catch((error) => next(error));

//         Promise.all([findStudent, findEvent])
//           .then(()=>{
//             response.status(200).json({ message: "Events data", studentsInEvent, studentsOutEvent });
//           })
//           .catch((error) => next(error));
//   }
// }

// module.exports.getFilteredSpeakers = (request, response, next) => {

// };

/*****************************************************************************************************/
/*
module.exports.addStudentToEvent = (request, response, next) => {
  if (request.role == "admin") {

    let student;
    let event;

    let findStudent = studentModel
      .findById(request.params.id)
      .then(data=>{
        if(data==null)
        throw new Error("student not exists");

        student = data
        return data
      })

    let findEvent = eventModel
      .findById(request.body.id)
      .then(data=>{
        if(data==null)
        throw new Error("event not exists");

        event = data
        return data
      })

    Promise.all([findStudent, findEvent])
      .then((data) => {
        if (
          student.events.includes(data[1].id) ||
          event.students.includes(data[0].id)
        ) {
          throw new Error(
            `student ${data[0].id} added to event ${data[1].id} before`
          );
        }

        event.students.push(request.params.id);
        student.events.push(request.body.id);

        student.save();
        event.save();
        response.status(200).json({
          message: `student ${data[0].id} added to event ${data[1].id}`,
          data,
        });
      })
      .catch((error) => next(error));
  }
};

module.exports.addSpeakerToEvent = (request, response, next) => {
  if (request.role == "admin") {
    let speaker;
    let event;

    let findSpeaker = speakerModel.findById(request.params.id).then((data) => {
      if (data == null) throw new Error("speaker not exists");

      speaker = data;
      return data;
    });

    let findEvent = eventModel.findById(request.body.id).then((data) => {
      if (data == null) throw new Error("event not exists");

      event = data;
      return data;
    });

    Promise.all([findSpeaker, findEvent])
      .then((data) => {
        if (
          speaker.events.includes(data[1].id) ||
          event.otherSpeakers.includes(data[0].id)
        ) {
          console.log(data);
          throw new Error(
            `speaker ${data[0].id} added to event ${data[1].id} before`
          );
        }

        event.otherSpeakers.push(request.params.id);
        speaker.events.push(request.body.id);

        speaker.save();
        event.save();
        response.status(200).json({
          message: `speaker ${data[0].id} added to event ${data[1].id}`,
          data,
        });
      })
      .catch((error) => next(error));
  }
};

module.exports.removeStudentFromEvent = (request, response, next) => {
  if (request.role == "admin") {
    let student;
    let event;

    let findStudent = studentModel.findById(request.params.id).then((data) => {
      if (data == null) throw new Error("student not exists");

      student = data;
      return data;
    });

    let findEvent = eventModel.findById(request.body.id).then((data) => {
      if (data == null) throw new Error("event not exists");

      event = data;
      return data;
    });

    Promise.all([findStudent, findEvent])
      .then((data) => {
        if (
          !student.events.includes(data[1].id) ||
          !event.students.includes(data[0].id)
        ) {
          throw new Error(
            `student ${data[0].id} already not in event ${data[1].id} `
          );
        }


        let studentIndexInEventModel = event.students.indexOf(request.params.id);
        let eventIndexInStudentModel = student.events.indexOf(request.body.id);

        event.students.splice(studentIndexInEventModel, 1);
        student.events.splice(eventIndexInStudentModel, 1);

        student.save();
        event.save();

        response.status(200).json({
          message: `student ${data[0].id} deleted from event ${data[1].id}`,
          data,
        });
      })
      .catch((error) => next(error));
  }
};

module.exports.removeSpeakerFromEvent = (request, response, next) => {
  if (request.role == "admin") {
    let speaker;
    let event;

    let findSpeaker = speakerModel.findById(request.params.id).then((data) => {
      if (data == null) throw new Error("speaker not exists");

      speaker = data;
      return data;
    });

    let findEvent = eventModel.findById(request.body.id).then((data) => {
      if (data == null) throw new Error("event not exists");

      event = data;
      return data;
    });

    Promise.all([findSpeaker, findEvent])
      .then((data) => {
        if (
          !speaker.events.includes(data[1].id) ||
          !event.otherSpeakers.includes(data[0].id)
        ) {
          throw new Error(
            `speaker ${data[0].id} already not in event ${data[1].id} `
          );
        }

        let speakerIndexInEventModel = event.otherSpeakers.indexOf(request.params.id);
        let eventIndexInSpeakerModel = speaker.events.indexOf(request.body.id);

        event.otherSpeakers.splice(speakerIndexInEventModel, 1);
        speaker.events.splice(eventIndexInSpeakerModel, 1);

        speaker.save();
        event.save();

        response.status(200).json({
          message: `speaker ${data[0].id} deleted from event ${data[1].id}`,
          data,
        });
      })
      .catch((error) => next(error));
  }
};
*/

module.exports.eventStudents = (request, response, next) => {
  if (request.role == "admin") {
    console.log(request.params.id);

    eventModel
      .findByIdAndUpdate(request.params.id, {
        $set: {
          students: request.body.students,
        },
      })
      .then((data) => {
        console.log(data);
        if (!data) throw new Error("event not found");

        if (data.students.Length != 0) {
          data.students.forEach((std) => {
            studentModel
              .findByIdAndUpdate(std._id, { $pull: { events: data._id } })
              .catch((error) => next(error));
          });
        }

        if (request.body.students.Length != 0) {
          request.body.students.forEach((std) => {
            studentModel
              .findByIdAndUpdate(std._id, { $push: { events: data._id } })
              .catch((error) => next(error));
          });
        }

        response.status(200).json({
          message: `event ${data._id} updated`,
        });
      })
      .catch((error) => next(error));
  }
};

module.exports.eventSpeakers = (request, response, next) => {
  if (request.role == "admin") {
    eventModel
      .findByIdAndUpdate(request.params.id, {
        $set: {
          otherSpeakers: request.body.speakers,
        },
      })
      .then((data) => {
        if (!data) throw new Error("event not found");

        if (data.otherSpeakers.Length != 0) {
          data.otherSpeakers.forEach((speaker) => {
            speakerModel
              .findByIdAndUpdate(speaker._id, { $pull: { events: data._id } })
              .catch((error) => next(error));
          });
        }

        if (request.body.speakers.Length != 0) {
          request.body.speakers.forEach((speaker) => {
            speakerModel
              .findByIdAndUpdate(speaker._id, { $push: { events: data._id } })
              .catch((error) => next(error));
          });
        }

        response.status(200).json({ message: `event ${data._id} updated` });
      })
      .catch((error) => next(error));
  }
};

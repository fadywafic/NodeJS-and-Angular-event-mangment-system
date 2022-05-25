const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");

const eventsController = require("../Controllers/EventsController");
const adminAuth = require("./../MiddleWares/adminAuthMW");

router.use(adminAuth);

router.route("/events").get(eventsController.getAllEvents); //show all events

router.route("/events/:id").get(eventsController.getEventById); // get event by id

router.route("/events/addEvent").post(
  [
    body("title")
      .isAlphanumeric()
      .withMessage("title can't contain any special characters"),
    body("date").isISO8601().withMessage("date format must be (yyyy-mm-dd) "), // problemaaaaaaaaaaaaaaaaaaaaaaaaaaa /* want to change date formaaaaaaaaaaaaaat
    body("mainSpeaker").isMongoId().withMessage("not an Object ID"),
  ],
  eventsController.addEvent
); // add event

router
  .route("/events/editEvent/:id")
  .put(
    [
      body("title")
        .isAlphanumeric()
        .withMessage("title can't contain any special characters"),
      body("date")
        .isISO8601("dd-mm-yyyy")
        .withMessage("date format must be (yyyy-mm-dd) "),
      body("mainSpeaker")
        .isMongoId()
        .withMessage(" mainSpeaker ID must be sent"),
    ],
    eventsController.editEvent
  ); // edit event

router.route("/events/deleteEvent/:id").delete(eventsController.deleteEvent); // delete event

/****************************************************************************/

// router.route("/events/eventStudents/:id").get(eventsController.getFilteredStudent)

// router.route("/events/eventSpeakers/:id").get(eventsController.getFilteredSpeakers);

/*****************************************************************************/
/**note id in params is std/spkr id while id in body is event id */
/** note when you add or remove std from event you do that in both studentModel and eventModel .. the same happens with speakers */

router.put("/events/:id/students", eventsController.eventStudents); // add student to event
// router.put("/events/removeStudent/:id", eventsController.removeStudentFromEvent); // remove student from event

router.put("/events/:id/speakers", eventsController.eventSpeakers); // add other speakers to event
// router.put("/events/removeSpeaker/:id",  eventsController.removeSpeakerFromEvent); // remove other speakers from event

module.exports = router;

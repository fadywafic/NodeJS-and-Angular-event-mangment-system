const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let eventSchema = new mongoose.Schema(
  {
    _id: Number,
    title: { type: String, required: true },
    eventDate: { type: Date }, //problemaaaaaaaaaaaaaaaaa /* how to change a date format in model
    mainSpeaker: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "speakers",
    },
    otherSpeakers: [{ type: mongoose.Types.ObjectId, ref: "speakers" }],
    students: [{ type: Number, ref: "students" }],
  },
  { _id: false }
);
eventSchema.plugin(AutoIncrement, { id: "eventID", inc_field: "_id" });

module.exports = mongoose.model("events", eventSchema);

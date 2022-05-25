const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let studentSchema = new mongoose.Schema(
  {
    _id: Number,
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: { type: Array, ref: "events" },
  },
  { _id: false }
);
studentSchema.plugin(AutoIncrement);

module.exports = mongoose.model("students", studentSchema);

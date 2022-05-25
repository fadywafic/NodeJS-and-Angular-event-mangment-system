const mongoose = require("mongoose");

let speakerSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, //bcrypt
  address: {
    city: String,
    street: String,
    building: String,
  },
  events: { type: Array, ref: "events" },
});

module.exports = mongoose.model("speakers", speakerSchema);

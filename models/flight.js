const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let flightSchema = new Schema({
  startDate: {
    type: Date,
    required: [true, "StartDate is a required field"],
  },
  endDate: { type: Date },
  type: {
    type: Number,
    required: [true, "Flight Type is a required field"],
  },
});

module.exports = mongoose.model("Flight", flightSchema);

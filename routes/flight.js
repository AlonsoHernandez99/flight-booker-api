const express = require("express");
const app = express();

const Flight = require("../models/flight");

//Routes
app.get("/", (request, response) => {
  Flight.find({}).exec((err, flights) => {
    if (err) {
      return response.status(500).json({
        ok: false,
        message: "Internal Server Error",
        errors: err,
      });
    }

    Flight.count({}, (err, count) => {
      response.status(200).json({
        ok: true,
        flights: flights,
        total: count,
        message: "OK",
      });
    });
  });
});

app.post("/", (request, response) => {
  var body = request.body;

  var flight = new Flight({
    startDate: body.startDate,
    endDate: body.endDate,
    type: parseInt(body.type),
  });

  flight.save((err, newFlight) => {
    if (err) {
      return response.status(500).json({
        ok: false,
        message: "Internal Server Error",
        errors: err,
      });
    }

    response.status(201).json({
      ok: true,
      body: newFlight,
      message: "OK",
    });
  });
});

app.put("/:id", (request, response) => {
  var id = request.params.id;

  Flight.findById(id, (err, flight) => {
    var body = request.body;

    if (err) {
      return response.status(500).json({
        ok: false,
        message: "Error in search Flight",
        errors: err,
      });
    }

    if (!flight) {
      return response.status(400).json({
        ok: false,
        message: `Flight ${id}, not found!`,
        errors: { message: "Flight not found" },
      });
    }

    flight.startDate = body.startDate;
    flight.endDate = body.endDate;
    flight.type = body.type;

    flight.save((err, flightUpd) => {
      if (err) {
        return response.status(500).json({
          ok: false,
          message: "Error in update Flight",
          errors: err,
        });
      }

      response.status(200).json({
        ok: true,
        body: flightUpd,
        message: "OK",
      });
    });
  });
});

module.exports = app;

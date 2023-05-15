var express = require("express");
var router = express.Router();
const Sensor = require("../models/sensor");

router.get("/", function (req, res, next) {
  res.send("Welcome to iot-dashboard-service");
});

router.post("/send", async (req, res) => {
  const sensorData = new Sensor(req.body);
  try {
    await sensorData.save();
    res.status(201).send({ status: "success", message: sensorData._id });
  } catch (err) {
    res.status(500).send({ status: "error", error: err });
  }
});

module.exports = router;

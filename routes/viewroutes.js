const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensor");

router.get("/read", async (req, res) => {
  const sensor_name = req.query.sensor_name;
  const count = req.query.count;
  let values = [];
  let device_id = "";
  try {
    const data = await Sensor.find({ sensor_type: sensor_name })
      .sort({ timestamp: -1 })
      .limit(count);
    data.map((e) => {
      values.push({ sensor_value: e.sensor_value, timestamp: e.timestamp });
      device_id = e.device_id;
    });
    return res.send({
      status: "success",
      device_id,
      data: {
        sensor_name,
        values,
      },
    });
  } catch (err) {
    return res.send({ status: "error", error: err });
  }
});

router.get("/readfromrange", async (req, res) => {
  const sensor_name = req.query.sensor_name;

  const startDate = req.body.start_date;
  const endDate = req.body.end_date;

  let values = [];
  let device_id = "";

  if (
    new Date(startDate).toString() === "Invalid Date" ||
    new Date(endDate).toString() === "Invalid Date"
  ) {
    return res.send({
      status: "error",
      error: "Invalid Date. Please send date in yyyy-mm-dd format",
    });
  }

  try {
    const data = await Sensor.find({
      sensor_type: sensor_name,
      timestamp: {
        $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
        $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
      },
    }).sort({ timestamp: -1 });

    data.map((e) => {
      values.push({ sensor_value: e.sensor_value, timestamp: e.timestamp });
      device_id = e.device_id;
    });
    res.send({
      status: "success",
      device_id,
      data: {
        sensor_name,
        values,
      },
    });
  } catch (err) {
    res.send({ status: "error", error: err.toString() });
  }
});

module.exports = router;

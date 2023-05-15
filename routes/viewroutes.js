const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensor");

router.get('/read', (req, res) => {
    const sensor_name = req.query.sensor_name
    const count = req.query.count

    res.send({sensor_name, count})
})

module.exports = router;

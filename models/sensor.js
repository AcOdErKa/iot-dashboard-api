const mongoose = require("mongoose");
const {Schema} = mongoose;

const sensorSchema = new Schema({
    sensor_type: String,
    sensor_value: Number,
    timestamp: {
        type: Date,
        default: Date.now
    },
    device_id: String
})

module.exports = mongoose.model('sensor', sensorSchema);
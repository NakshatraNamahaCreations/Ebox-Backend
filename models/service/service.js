const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service_name: String,
  requirement_fields: Array,
});
const serivces = mongoose.model("service", serviceSchema);

module.exports = serivces;

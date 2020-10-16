const mongo = require("mongoose");
const Schema = mongo.Schema;

const chanchildSchema = new Schema({
  no: String,
  now: String,
  name: String,
  com: String,
  time: String,
  resto: String,
  trip: String,
});

module.exports = mongo.model("Chanchild", chanchildSchema);

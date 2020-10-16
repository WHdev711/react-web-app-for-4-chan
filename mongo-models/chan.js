const mongo = require("mongoose");
const Schema = mongo.Schema;

const chanSchema = new Schema({
  chanId: String,
  link: String,
  img: String,
  replies: String,
  imgReplies: String,
  title: String,
  op: String,
  unique_ips:String,
});

module.exports = mongo.model("Chan", chanSchema);

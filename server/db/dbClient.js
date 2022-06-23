const mongoose = require("mongoose");

const userName = process.env.DBNAME || "admin";
const password = process.env.DBPASS || "c8vpVxprXexziNVG";
const uri = `mongodb+srv://${userName}:${password}@cluster0.2bhgs.mongodb.net/main`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
  if (err) return console.log(err);
  console.log("we connected to DB");
  return result;
})

module.exports = { mongoose }
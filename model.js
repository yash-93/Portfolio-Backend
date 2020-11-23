const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const project = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techstack: [{ type: String, required: true }],
  demo: { type: String, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Project", project);

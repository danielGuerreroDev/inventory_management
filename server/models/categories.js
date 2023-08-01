const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const categoriesSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
});

module.exports = mongoose.model('categories', categoriesSchema);

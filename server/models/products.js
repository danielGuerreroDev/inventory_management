const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ProductsSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  brand: { type: String },
  category: { type: String },
  thumbnail: { type: String },
  images: [],
});

module.exports = mongoose.model('products', ProductsSchema);

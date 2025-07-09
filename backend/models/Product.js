const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  price: Number,
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);

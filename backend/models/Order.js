// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: { type: Array, required: true },
//   totalPrice: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Order', orderSchema);




const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // 🔍 Keep userId if needed later
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // ✅ Add username field to store the name as well
  username: { type: String, required: true },

  items: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);

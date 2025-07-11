// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const { authenticateToken } = require('../middlewares/authMiddleware');  // ✅ Correct import

// // ✅ Place Order
// router.post('/', authenticateToken, async (req, res) => {
//   try {
//     const { items, totalPrice } = req.body;

//     const newOrder = new Order({
//       userId: req.user.userId,  // ✅ Save userId from token
//       items,
//       totalPrice,
//       created: new Date(),
//     });

//     await newOrder.save();

//     res.status(201).json({ message: 'Order placed successfully' });
//   } catch (err) {
//     console.error('Error placing order:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Get Orders for this user
// router.get('/', authenticateToken, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user.userId });
//     res.json(orders);
//   } catch (err) {
//     console.error('Error fetching orders:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authenticateToken } = require('../middlewares/authMiddleware');  // ✅ Correct import

// ✅ Place Order
router.post('/', authenticateToken, async (req, res) => {  // ✅ Correct middleware name
  const { items, totalPrice } = req.body;

  const newOrder = new Order({
    userId: req.user._id,           // ✅ Save userId
    username: req.user.username,    // ✅ Save username
    items,
    totalPrice,
  });

  await newOrder.save();
  res.status(201).json(newOrder);
});

// ✅ Get Orders for this user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });  // ✅ Correct field
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

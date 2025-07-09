const express = require('express');
const Product = require('../models/Product');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// ✅ Add a product (Admin only)
router.post('/add', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, description, category, price, imageUrl } = req.body;

    const product = new Product({ name, description, category, price, imageUrl });
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Get all products (Public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Delete a product (Admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

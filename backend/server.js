const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');
require("dotenv").config();

dotenv.config(); // ✅ Load environment variables from .env file

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));



const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use('/api/auth', require('./routes/auth')); // ✅ Import auth routes
app.use('/api/user', require('./routes/user'));
app.use('/api/orders', require('./routes/orders')); //orders route
app.use('/api/payment', paymentRoutes);


// ✅ Sample route
app.get('/', (req, res) => {
  res.send('Afford Medical Backend is Running ✅');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

//auth-route

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//products-route 
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

//orders-route
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);



const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual Stripe Secret Key

// ✅ Create Stripe Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // amount in ₹

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in paise
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

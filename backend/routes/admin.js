const express = require('express');
const router = express.Router();

// Simple in-memory stores for demo (replace with DB in production)
const users = [
  { _id: 'u1', name: 'Admin User', email: 'admin@example.com', role: 'admin', createdAt: new Date().toISOString() },
  { _id: 'u2', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'user', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: 'u3', name: 'Priya Verma', email: 'priya@example.com', role: 'user', createdAt: new Date(Date.now() - 2*86400000).toISOString() }
];

const orders = [
  { _id: 'o1', userId: 'u2', total: 28999, currency: 'INR', status: 'Processing', items: 1, placedAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: 'o2', userId: 'u3', total: 12499, currency: 'INR', status: 'Shipped', items: 2, placedAt: new Date(Date.now() - 3*3600000).toISOString() }
];

// Stats endpoint
router.get('/stats', (req, res) => {
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStock = 5; // placeholder
  res.json({ totalUsers, totalOrders, totalRevenue, lowStock });
});

// Users list
router.get('/users', (req, res) => {
  res.json(users);
});

// Orders list
router.get('/orders', (req, res) => {
  // Include user info
  const enriched = orders.map(o => ({
    ...o,
    user: users.find(u => u._id === o.userId) || null,
  }));
  res.json(enriched);
});

// Update order status
router.patch('/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const idx = orders.findIndex(o => o._id === id);
  if (idx === -1) return res.status(404).json({ message: 'Order not found' });
  orders[idx].status = status || orders[idx].status;
  res.json(orders[idx]);
});

module.exports = router;

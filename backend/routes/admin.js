const express = require('express');
const router = express.Router();
const dataManager = require('../services/dataManager');

// Stats endpoint
router.get('/stats', async (req, res) => {
  try {
    const stats = await dataManager.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ message: 'Failed to get stats' });
  }
});

// Users list
router.get('/users', async (req, res) => {
  try {
    const users = await dataManager.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Failed to get users' });
  }
});

// Orders list
router.get('/orders', async (req, res) => {
  try {
    const orders = await dataManager.getOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ message: 'Failed to get orders' });
  }
});

// Update order status
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedOrder = await dataManager.updateOrderStatus(id, status);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

// Add new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await dataManager.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Failed to add user' });
  }
});

// Update user
router.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await dataManager.updateUser(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await dataManager.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// Add new order
router.post('/orders', async (req, res) => {
  try {
    const newOrder = await dataManager.addOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Failed to add order' });
  }
});

// Backup data
router.post('/backup', async (req, res) => {
  try {
    const success = await dataManager.backupData();
    if (success) {
      res.json({ message: 'Data backup created successfully' });
    } else {
      res.status(500).json({ message: 'Failed to create backup' });
    }
  } catch (error) {
    console.error('Error creating backup:', error);
    res.status(500).json({ message: 'Failed to create backup' });
  }
});

module.exports = router;

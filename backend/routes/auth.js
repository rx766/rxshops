const express = require('express');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes (require authentication)
router.use(protect); // All routes after this middleware are protected

router.get('/me', authController.getMe);
router.patch('/update-password', authController.updatePassword);
router.patch('/update-profile', authController.updateProfile);
router.post('/logout', authController.logout);

// Admin only routes
router.use(restrictTo('admin'));

router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUser);
router.patch('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
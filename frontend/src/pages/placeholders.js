import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ShoppingCartCheckout as CheckoutIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Receipt as ReceiptIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { selectCartItems, selectCartTotal, clearCart } from '../store/slices/cartSlice';
import { selectFilteredProducts } from '../store/slices/productSlice';
import { loginSuccess } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { formatINRSimple } from '../utils/currency';

// Checkout Page
export const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handlePlaceOrder = async () => {
    setLoading(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    dispatch(clearCart());
    toast.success('Order placed successfully!');
    navigate('/');
    setLoading(false);
  };
  
  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              {cartItems.map((item, index) => (
                <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                  <Typography>{item.product.name} x {item.quantity}</Typography>
                    <Typography>{formatINRSimple(item.price * item.quantity)}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary.main">
                    {formatINRSimple(cartTotal)}
                  </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<CheckoutIcon />}
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

// Login Page
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login
    const mockUser = {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      role: email === 'admin@rxshops.com' ? 'admin' : 'user'
    };
    dispatch(loginSuccess({ user: mockUser, token: 'mock-token' }));
    toast.success('Login successful!');
    navigate('/');
  };
  
  return (
    <Container maxWidth="sm">
      <Box py={4}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Login to RXshops
            </Typography>
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                Login
              </Button>
              <Box textAlign="center">
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Button component={RouterLink} to="/register">
                    Sign Up
                  </Button>
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                  Demo: admin@rxshops.com / any password for admin access
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

// Register Page
export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Registration successful! Please login.');
  };
  
  return (
    <Container maxWidth="sm">
      <Box py={4}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Create Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                Create Account
              </Button>
              <Box textAlign="center">
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Button component={RouterLink} to="/login">
                    Login
                  </Button>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

// Simple placeholder components for the rest
const createPlaceholder = (title, icon) => () => (
  <Container maxWidth="lg">
    <Box py={4} textAlign="center">
      <Box mb={3}>
        {icon}
      </Box>
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        This feature is coming soon! We're working hard to bring you the best experience.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/" size="large">
        Go Home
      </Button>
    </Box>
  </Container>
);

export const OrderTracking = createPlaceholder('Order Tracking', <ReceiptIcon sx={{ fontSize: 60 }} />);
export const UserProfile = createPlaceholder('User Profile', <PersonIcon sx={{ fontSize: 60 }} />);
// User Orders - Order History
export const UserOrders = () => {
  const [orders] = useState([
    {
      _id: 'order1',
      orderNumber: 'RX1234567',
      createdAt: '2024-10-15T10:30:00Z',
      status: 'delivered',
      totalAmount: 27399,
      items: [
        {
          product: { _id: '1', name: 'Sony WH-1000XM4 Wireless Headphones', images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' }] },
          quantity: 1,
          price: 24999
        },
        {
          product: { _id: '2', name: 'Premium Cotton T-Shirt', images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' }] },
          quantity: 1,
          price: 2099
        }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001'
      }
    },
    {
      _id: 'order2',
      orderNumber: 'RX1234568',
      createdAt: '2024-10-10T14:20:00Z',
      status: 'shipped',
      totalAmount: 9199,
      items: [
        {
          product: { _id: '4', name: 'Nike Air Zoom Pegasus 40', images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' }] },
          quantity: 1,
          price: 9199
        }
      ],
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90210'
      }
    },
    {
      _id: 'order3',
      orderNumber: 'RX1234569',
      createdAt: '2024-10-05T16:45:00Z',
      status: 'processing',
      totalAmount: 82999,
      items: [
        {
          product: { _id: '5', name: 'MacBook Air M2 Laptop', images: [{ url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop' }] },
          quantity: 1,
          price: 82999
        }
      ],
      shippingAddress: {
        street: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601'
      }
    }
  ]);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            Order #{order.orderNumber}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Placed on {formatDate(order.createdAt)}
                          </Typography>
                        </Box>
                        <Chip 
                          label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          color={getStatusColor(order.status)}
                        />
                      </Box>
                      
                      {/* Order Items */}
                      <Box>
                        {order.items.map((item, index) => (
                          <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
                            <Avatar
                              src={item.product.images[0]?.url}
                              sx={{ width: 60, height: 60 }}
                              variant="rounded"
                            />
                            <Box flex={1}>
                              <Typography variant="body1" fontWeight="medium">
                                {item.product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Quantity: {item.quantity} × {formatINRSimple(item.price)}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      {/* Shipping Address */}
                      <Typography variant="body2" color="text.secondary">
                        <strong>Shipping Address:</strong><br />
                        {order.shippingAddress.street}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="h6" gutterBottom>
                          Order Total
                        </Typography>
                        <Typography variant="h5" color="primary.main" fontWeight="bold">
                          {formatINRSimple(order.totalAmount)}
                        </Typography>
                        
                        <Box mt={2} display="flex" flexDirection="column" gap={1}>
                          <Button 
                            variant="outlined" 
                            size="small"
                            component={RouterLink}
                            to={`/orders/track/${order.orderNumber}`}
                          >
                            Track Order
                          </Button>
                          {order.status === 'delivered' && (
                            <Button 
                              variant="text" 
                              size="small"
                              color="secondary"
                            >
                              Leave Review
                            </Button>
                          )}
                          {(order.status === 'processing' || order.status === 'confirmed') && (
                            <Button 
                              variant="text" 
                              size="small"
                              color="error"
                            >
                              Cancel Order
                            </Button>
                          )}
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {orders.length === 0 && (
          <Box textAlign="center" py={8}>
            <ReceiptIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No orders yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              When you place your first order, it will appear here.
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/products"
              size="large"
            >
              Start Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};
// Admin Dashboard
export const AdminDashboard = () => {
  const products = useSelector(selectFilteredProducts);
  const cartItems = useSelector(selectCartItems);
  
  const stats = {
    totalProducts: products.length,
    totalOrders: 127,
    totalRevenue: 3789540,
    totalUsers: 892,
    lowStockProducts: products.filter(p => p.stock <= 10).length
  };
  
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <StoreIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Products
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalProducts}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ReceiptIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Orders
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalOrders}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Typography variant="h3" color="success.main" sx={{ mr: 2 }}>₹</Typography>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Revenue
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalRevenue.toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PeopleIcon color="info" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Users
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalUsers}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<StoreIcon />}
                  component={RouterLink}
                  to="/admin/products"
                >
                  Manage Products
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ReceiptIcon />}
                  component={RouterLink}
                  to="/admin/orders"
                >
                  View Orders
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PeopleIcon />}
                  component={RouterLink}
                  to="/admin/users"
                >
                  Manage Users
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Low Stock Alert
              </Typography>
              {stats.lowStockProducts > 0 ? (
                <Box>
                  <Typography color="warning.main" gutterBottom>
                    {stats.lowStockProducts} products are running low on stock!
                  </Typography>
                  {products.filter(p => p.stock <= 10).slice(0, 3).map(product => (
                    <Box key={product._id} display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">{product.name}</Typography>
                      <Chip 
                        size="small" 
                        label={`${product.stock} left`} 
                        color="warning" 
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="success.main">
                  All products are well stocked!
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
        
        {/* Recent Activity */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Activity</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>New Order</TableCell>
                  <TableCell>Order #RX789 - {formatINRSimple(24999)}</TableCell>
                  <TableCell>2 minutes ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product Updated</TableCell>
                  <TableCell>Sony Headphones - Stock updated</TableCell>
                  <TableCell>15 minutes ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>New User</TableCell>
                  <TableCell>john.doe@email.com registered</TableCell>
                  <TableCell>1 hour ago</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};
export const AdminProducts = createPlaceholder('Admin Products', <StoreIcon sx={{ fontSize: 60 }} />);
export const AdminOrders = createPlaceholder('Admin Orders', <ReceiptIcon sx={{ fontSize: 60 }} />);
export const AdminUsers = createPlaceholder('Admin Users', <PeopleIcon sx={{ fontSize: 60 }} />);

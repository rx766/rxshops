import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Button,
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
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Receipt as ReceiptIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { selectFilteredProducts } from '../../store/slices/productSlice';
import toast from 'react-hot-toast';

// Helper function to format currency in INR
const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const AdminDashboard = () => {
  const products = useSelector(selectFilteredProducts);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsResponse = await fetch('http://localhost:5000/api/v1/admin/stats');
      const statsData = await statsResponse.json();
      
      // Fetch users
      const usersResponse = await fetch('http://localhost:5000/api/v1/admin/users');
      const usersData = await usersResponse.json();
      
      // Fetch orders
      const ordersResponse = await fetch('http://localhost:5000/api/v1/admin/orders');
      const ordersData = await ordersResponse.json();
      
      setStats(statsData);
      setUsers(usersData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        toast.success('Order status updated');
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const lowStockProducts = products.filter(p => p.stock <= 10);

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchDashboardData}
          >
            Refresh
          </Button>
        </Box>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <StoreIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Products
                    </Typography>
                    <Typography variant="h4">
                      {products.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ReceiptIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Orders
                    </Typography>
                    <Typography variant="h4">
                      {stats?.totalOrders || 0}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <TrendingUpIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Revenue
                    </Typography>
                    <Typography variant="h4">
                      {stats?.totalRevenue ? formatINR(stats.totalRevenue) : formatINR(0)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PeopleIcon color="info" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Users
                    </Typography>
                    <Typography variant="h4">
                      {stats?.totalUsers || 0}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* User Management */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Registered Users
              </Typography>
              <TableContainer sx={{ maxHeight: 300 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            size="small" 
                            label={user.role} 
                            color={user.role === 'admin' ? 'primary' : 'default'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Low Stock Alert */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
                Low Stock Alert
              </Typography>
              {lowStockProducts.length > 0 ? (
                <Box>
                  <Typography color="warning.main" gutterBottom>
                    {lowStockProducts.length} products are running low on stock!
                  </Typography>
                  {lowStockProducts.slice(0, 5).map(product => (
                    <Box key={product._id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {product.name.substring(0, 30)}...
                      </Typography>
                      <Chip 
                        size="small" 
                        label={`${product.stock} left`} 
                        color="warning" 
                        variant="outlined"
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
        
        {/* Recent Orders Management */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Recent Orders
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        #{order._id.slice(-6).toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.user?.name || 'Unknown'}</TableCell>
                    <TableCell>{formatINR(order.total)}</TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={order.status}
                          onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                        >
                          <MenuItem value="Processing">Processing</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {new Date(order.placedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Quick Actions */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              startIcon={<StoreIcon />}
              component={RouterLink}
              to="/admin/products"
            >
              Manage Products
            </Button>
            <Button
              variant="contained"
              startIcon={<PeopleIcon />}
              component={RouterLink}
              to="/admin/users"
            >
              Manage Users
            </Button>
            <Button
              variant="contained"
              startIcon={<ReceiptIcon />}
              component={RouterLink}
              to="/admin/orders"
            >
              View All Orders
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
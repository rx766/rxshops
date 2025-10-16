import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
  TextField,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartCheckout as CheckoutIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import {
  selectCartItems,
  selectCartTotal,
  selectCartQuantity,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const totalQuantity = useSelector(selectCartQuantity);
  
  const handleQuantityChange = (productId, size, color, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart({ productId, size, color }));
      toast.success('Item removed from cart');
    } else {
      dispatch(updateQuantity({ productId, size, color, quantity: newQuantity }));
    }
  };
  
  const handleRemoveItem = (productId, size, color, productName) => {
    dispatch(removeFromCart({ productId, size, color }));
    toast.success(`${productName} removed from cart`);
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const shippingCost = cartTotal > 50 ? 0 : 10;
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + shippingCost + tax;
  
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box py={4} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Shopping Cart
          </Typography>
          <Box py={8}>
            <Typography variant="h6" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Looks like you haven't added anything to your cart yet.
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
        </Box>
      </Container>
    );
  }
  
  const CartItemRow = ({ item }) => (
    <TableRow>
      <TableCell>
        <Box display="flex" alignItems="center" gap={2}>
          <CardMedia
            component="img"
            sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
            image={item.product.images?.[0]?.url || 'https://via.placeholder.com/80x80/f5f5f5/666?text=No+Image'}
            alt={item.product.name}
          />
          <Box>
            <Typography
              variant="subtitle1"
              component={RouterLink}
              to={`/products/${item.product._id}`}
              sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}
            >
              {item.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.product.brand}
            </Typography>
            {item.size && item.size !== 'One Size' && (
              <Typography variant="body2">Size: {item.size}</Typography>
            )}
            {item.color && item.color !== 'Default' && (
              <Typography variant="body2">Color: {item.color}</Typography>
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography variant="h6" color="primary.main">
          ${item.price.toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <IconButton
            size="small"
            onClick={() => handleQuantityChange(item.product._id, item.size, item.color, item.quantity - 1)}
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            value={item.quantity}
            onChange={(e) => {
              const newQty = parseInt(e.target.value) || 0;
              if (newQty >= 0) {
                handleQuantityChange(item.product._id, item.size, item.color, newQty);
              }
            }}
            size="small"
            sx={{ width: 80 }}
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
          />
          <IconButton
            size="small"
            onClick={() => handleQuantityChange(item.product._id, item.size, item.color, item.quantity + 1)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography variant="h6">
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton
          color="error"
          onClick={() => handleRemoveItem(item.product._id, item.size, item.color, item.product.name)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
  
  const CartItemCard = ({ item }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 1 }}
              image={item.product.images?.[0]?.url || 'https://via.placeholder.com/300x150/f5f5f5/666?text=No+Image'}
              alt={item.product.name}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box>
              <Typography
                variant="h6"
                component={RouterLink}
                to={`/products/${item.product._id}`}
                sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}
              >
                {item.product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {item.product.brand}
              </Typography>
              {item.size && item.size !== 'One Size' && (
                <Typography variant="body2">Size: {item.size}</Typography>
              )}
              {item.color && item.color !== 'Default' && (
                <Typography variant="body2">Color: {item.color}</Typography>
              )}
              
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography variant="h6" color="primary.main">
                  ${item.price.toFixed(2)}
                </Typography>
                
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(item.product._id, item.size, item.color, item.quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ minWidth: 40, textAlign: 'center' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(item.product._id, item.size, item.color, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                
                <Typography variant="h6">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(item.product._id, item.size, item.color, item.product.name)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
          <Typography variant="h4" component="h1">
            Shopping Cart ({totalQuantity} items)
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {isMobile ? (
              // Mobile view - cards
              <Box>
                {cartItems.map((item, index) => (
                  <CartItemCard key={`${item.product._id}-${item.size}-${item.color}`} item={item} />
                ))}
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearCart}
                    fullWidth
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            ) : (
              // Desktop view - table
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item, index) => (
                      <CartItemRow key={`${item.product._id}-${item.size}-${item.color}`} item={item} />
                    ))}
                  </TableBody>
                </Table>
                <Box p={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </TableContainer>
            )}
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal ({totalQuantity} items)</Typography>
                  <Typography>${cartTotal.toFixed(2)}</Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Shipping</Typography>
                  <Typography color={shippingCost === 0 ? 'success.main' : 'inherit'}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Tax</Typography>
                  <Typography>${tax.toFixed(2)}</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary.main">
                    ${finalTotal.toFixed(2)}
                  </Typography>
                </Box>
                
                {cartTotal < 50 && (
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                  </Typography>
                )}
                
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CheckoutIcon />}
                  onClick={handleCheckout}
                  fullWidth
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="text"
                  component={RouterLink}
                  to="/products"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Cart;

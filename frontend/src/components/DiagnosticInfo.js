import React from 'react';
import { useSelector } from 'react-redux';
import { selectCart, selectCartItems, selectCartQuantity } from '../store/slices/cartSlice';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

const DiagnosticInfo = () => {
  const cart = useSelector(selectCart);
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectCartQuantity);
  
  const diagnostics = {
    host: window.location.hostname,
    port: window.location.port,
    protocol: window.location.protocol,
    userAgent: navigator.userAgent,
    localStorage: {
      available: typeof Storage !== 'undefined',
      rxshopsData: localStorage.getItem('persist:rxshops-root'),
    },
    redux: {
      cartItemsCount: cartItems.length,
      cartQuantity: cartQuantity,
      cartState: cart
    },
    environment: process.env.NODE_ENV,
    reactVersion: React.version,
  };

  return (
    <Card sx={{ m: 2, position: 'fixed', top: 10, right: 10, maxWidth: 400, zIndex: 9999 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🔍 Localhost vs Network Debug
        </Typography>
        
        <Box mb={2}>
          <Typography variant="subtitle2">Connection:</Typography>
          <Chip 
            label={`${diagnostics.protocol}//${diagnostics.host}:${diagnostics.port}`}
            color={diagnostics.host === 'localhost' ? 'error' : 'success'}
            size="small"
          />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2">Cart Status:</Typography>
          <Typography variant="body2">
            Items: {diagnostics.redux.cartItemsCount} | 
            Quantity: {diagnostics.redux.cartQuantity}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2">Storage:</Typography>
          <Chip 
            label={diagnostics.localStorage.available ? 'Available' : 'Not Available'}
            color={diagnostics.localStorage.available ? 'success' : 'error'}
            size="small"
          />
        </Box>

        <Typography variant="caption" display="block">
          {diagnostics.host === 'localhost' ? 
            '⚠️ Localhost detected - potential issue' : 
            '✅ Network connection - working normally'
          }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DiagnosticInfo;
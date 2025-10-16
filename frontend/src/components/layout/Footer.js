import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        mt: 'auto',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              RXshops
            </Typography>
            <Typography variant="body2" color="inherit">
              Your one-stop e-commerce destination for quality products at great prices.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link component={RouterLink} to="/" color="inherit" display="block" mb={1}>
                Home
              </Link>
              <Link component={RouterLink} to="/products" color="inherit" display="block" mb={1}>
                Products
              </Link>
              <Link component={RouterLink} to="/cart" color="inherit" display="block" mb={1}>
                Cart
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Box>
              <Link href="#" color="inherit" display="block" mb={1}>
                Contact Us
              </Link>
              <Link href="#" color="inherit" display="block" mb={1}>
                FAQ
              </Link>
              <Link href="#" color="inherit" display="block" mb={1}>
                Shipping Info
              </Link>
              <Link href="#" color="inherit" display="block" mb={1}>
                Returns
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Connect
            </Typography>
            <Box>
              <Link href="#" color="inherit" display="block" mb={1}>
                Facebook
              </Link>
              <Link href="#" color="inherit" display="block" mb={1}>
                Twitter
              </Link>
              <Link href="#" color="inherit" display="block" mb={1}>
                Instagram
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box mt={4} pt={4} borderTop={1} borderColor="rgba(255, 255, 255, 0.2)">
          <Typography variant="body2" align="center" color="inherit">
            © 2024 RXshops. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
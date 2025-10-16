import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Button, Grid, Card, CardContent, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Store as StoreIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from '@mui/icons-material';
import { selectFilteredProducts } from '../store/slices/productSlice';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
  const products = useSelector(selectFilteredProducts);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const categories = ['electronics', 'clothing', 'sports', 'beauty'];

  const features = [
    {
      icon: <StoreIcon sx={{ fontSize: 40 }} />,
      title: 'Wide Selection',
      description: 'Thousands of products across multiple categories'
    },
    {
      icon: <ShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Shopping',
      description: 'Your payment information is safe and secure'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Customer service available around the clock'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              Welcome to RXshops
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ opacity: 0.9 }}>
              Your one-stop e-commerce destination
            </Typography>
            <Typography variant="body1" paragraph sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto', mb: 4 }}>
              Discover amazing products, great deals, and exceptional shopping experience.
              Browse through our vast collection of products across multiple categories.
            </Typography>
            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/products"
                sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
              >
                Shop Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/login"
                sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box py={6}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box color="primary.main" mb={2}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <Box bgcolor="grey.50" py={6}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
              Featured Products
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" paragraph>
              Check out our handpicked selection of popular items
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {featuredProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            <Box textAlign="center" mt={4}>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/products"
              >
                View All Products
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* Categories Section */}
      <Container maxWidth="lg">
        <Box py={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Shop by Category
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {categories.map((category, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Paper
                  component={RouterLink}
                  to={`/products?category=${category}`}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                  elevation={2}
                >
                  <Typography variant="h6" gutterBottom>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore our {category} collection
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
